const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const sh = require('shelljs');

/** @typedef {Omit<import('inquirer').CheckboxQuestion<Answers>, 'name'>} CheckboxQuestion */
/** @typedef {Omit<import('inquirer').ListQuestion<Answers>, 'name'>} ListQuestion */
/** @typedef {Omit<import('inquirer').InputQuestion<Answers>, 'name'>} InputQuestion */

/** @typedef {{ releaseType: ListQuestion; customRelease: InputQuestion; isPrerelease: ListQuestion; prereleaseType: ListQuestion; autoPush: ListQuestion }} Questions */
/** @typedef {Record<keyof Questions, string>} Answers */
/** @typedef {import('inquirer').Question<Answers>[]} QuestionList */

/**
 * @param {Questions} questions
 * @returns {QuestionList}
 */
const defineQuestions = questions => {
  return Object.entries(questions).map(([key, value]) => ({
    name: key,
    ...value,
  }));
};

const repositories = fs.readdirSync(path.resolve(__dirname, '../packages')).filter(d => !d.startsWith('.'));
const boolChoices = ['No', 'Yes'];

const questions = defineQuestions({
  releaseType: {
    type: 'list',
    message: 'Please select a release type:',
    choices: [
      {
        name: 'patch (0.0.1)',
        value: 'patch',
      },
      {
        name: 'minor (0.1.0)',
        value: 'minor',
      },
      {
        name: 'major (1.0.0)',
        value: 'major',
      },
      'current',
      'custom',
    ],
  },
  customRelease: {
    type: 'input',
    message: 'Please enter a version number (e.g. 0.0.1, 0.0.1-alpha.0):',
    validate: input => /^[0-9]+\.[0-9]+\.[0-9]+(((-alpha)|(-beta)|(-rc))\.[0-9]+)?$/.test(input),
    when: ({ releaseType }) => releaseType === 'custom',
  },
  isPrerelease: {
    type: 'list',
    message: 'Is is a prerelease?',
    choices: boolChoices,
    when: ({ releaseType }) => !['custom', 'current'].includes(releaseType),
  },
  prereleaseType: {
    type: 'list',
    message: 'Please select a prerelease type:',
    choices: ['alpha', 'beta', 'rc'],
    when: ({ isPrerelease }) => isPrerelease === 'Yes',
  },
  autoPush: {
    type: 'list',
    message: 'Do you want to push commits and tag automatically after the task over?',
    choices: boolChoices,
  },
});

inquirer
  .prompt(questions)
  .then(({ releaseType, customRelease, isPrerelease, prereleaseType, autoPush }) => {
    /** @type {{ repo: string; cmd: string }[]} */
    const commands = [];
    repositories.forEach(repo => {
      let cmd = `npx standard-version`;

      /*---------- releaseType ----------*/
      // current
      if (releaseType === 'current') {
        cmd = `${cmd} --first-release`;
      }
      // custom
      else if (releaseType === 'custom') {
        cmd = `${cmd} --release-as ${customRelease}`;
      }
      // major/minor/patch
      else {
        cmd = `${cmd} --release-as ${releaseType}`;
      }

      /*---------- isPrerelease ----------*/
      if (isPrerelease === 'Yes') {
        cmd = `${cmd} --prerelease ${prereleaseType}`;
      }

      commands.push({ repo, cmd });
    });

    return { commands, autoPush };
  })
  .then(({ commands, autoPush }) => {
    const rootPath = path.resolve(__dirname, '..');
    const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

    commands.forEach(({ repo, cmd }, index) => {
      console.log('\n* ============================= *');
      console.log(`* Command: ${cmd}`);
      console.log('* ============================= *\n');

      if (index < commands.length - 1) {
        cmd += ' --skip.changelog true --skip.commit true --skip.tag true --scripts.postbump "git add ."';
      } else {
        cmd += ` --infile ${changelogPath} --commit-all --scripts.postchangelog "prettier -w ${changelogPath}"`;
      }

      const workPath = path.resolve(__dirname, `../packages/${repo}`);
      const result = sh.exec(`cd ${workPath} && ${cmd}`);
      if (result.code !== 0) {
        return Promise.reject(result.stderr);
      }
    });

    if (autoPush === 'Yes') {
      const result = sh.exec(`cd ${rootPath} && git push && git push origin --tags`);
      if (result.code !== 0) {
        return Promise.reject(result.stderr);
      }
    }
  })
  .catch(console.error);
