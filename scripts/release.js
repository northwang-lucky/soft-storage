const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const sh = require('shelljs');

/** @typedef {Omit<import('inquirer').CheckboxQuestion<Answers>, 'name'>} CheckboxQuestion */
/** @typedef {Omit<import('inquirer').ListQuestion<Answers>, 'name'>} ListQuestion */
/** @typedef {Omit<import('inquirer').InputQuestion<Answers>, 'name'>} InputQuestion */

/** @typedef {{ targetRepos: CheckboxQuestion; releaseType: ListQuestion; customRelease: InputQuestion; isPrerelease: ListQuestion; prereleaseType: ListQuestion; skipChangelog: ListQuestion; autoPush: ListQuestion }} Questions */
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
  targetRepos: {
    type: 'checkbox',
    message: 'Please select repositories that are going to release:',
    choices: repositories,
  },
  releaseType: {
    type: 'list',
    message: 'Please select a release type:',
    choices: [
      'current',
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
    when: ({ releaseType }) => releaseType !== 'custom',
  },
  prereleaseType: {
    type: 'list',
    message: 'Please select a prerelease type:',
    choices: ['alpha', 'beta', 'rc'],
    when: ({ isPrerelease }) => isPrerelease === 'Yes',
  },
  skipChangelog: {
    type: 'list',
    message: 'Do you want to skip generate the changelog?',
    choices: boolChoices,
  },
  autoPush: {
    type: 'list',
    message: 'Do you want to push commit and tag automatically after the task over?',
    choices: boolChoices,
  },
});

inquirer
  .prompt(questions)
  .then(({ targetRepos, releaseType, customRelease, isPrerelease, prereleaseType, skipChangelog, autoPush }) => {
    const commands = [];
    for (const targetRepo of targetRepos) {
      let cmd = `pnpx standard-version`;

      /*---------- releaseType ----------*/
      // current
      if (releaseType === 'current') {
        // Get the current version from package.json
        const packageJson = fs.readFileSync(path.resolve(__dirname, `../packages/${targetRepo}/package.json`));
        const packageInfo = JSON.parse(packageJson);
        let currentVersion = packageInfo.version;

        // Precess isPrerelease
        if (isPrerelease === 'Yes') {
          if (/^[0-9]+\.[0-9]+\.[0-9]+$/.test(currentVersion)) {
            currentVersion = `${currentVersion}-${prereleaseType}.0`;
          } else if (currentVersion.includes(prereleaseType)) {
            const versionArr = currentVersion.split('.');
            const prevPreVersionNum = versionArr.pop();
            versionArr.push(Number(prevPreVersionNum) + 1);
            currentVersion = versionArr.join('.');
          } else {
            const versionArr = currentVersion.split('-');
            versionArr.pop();
            versionArr.push(`${prereleaseType}.0`);
            currentVersion = versionArr.join('-');
          }
        }

        cmd = `${cmd} --release-as ${currentVersion}`;
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
      if (isPrerelease === 'Yes' && releaseType !== 'current' && releaseType !== 'custom') {
        cmd = `${cmd} --prerelease ${prereleaseType}`;
      }

      /*---------- skipChangelog ----------*/
      if (skipChangelog === 'Yes') {
        cmd = `${cmd} --skip.changelog true`;
      }

      commands.push({ targetRepo, cmd });
    }

    return { commands, autoPush };
  })
  .then(({ commands, autoPush }) => {
    for (const command of commands) {
      const cmd = `${command.cmd} --releaseCommitMessageFormat "chore(${command.targetRepo}-release): {{currentTag}}"`;
      console.log('\n* ============================= *');
      console.log(`* Command: ${cmd} *`);
      console.log('* ============================= *\n');

      const workPath = path.resolve(__dirname, `../packages/${command.targetRepo}`);
      const result = sh.exec(`cd ${workPath} && ${cmd}`);
      if (result.code !== 0) {
        return Promise.reject(result.stderr);
      }
    }

    if (autoPush === 'Yes') {
      const rootPath = path.resolve(__dirname, '..');
      const result = sh.exec(`cd ${rootPath} && git push origin --tags && git push`);
      if (result.code !== 0) {
        return Promise.reject(result.stderr);
      }
    }
  })
  .catch(console.error);
