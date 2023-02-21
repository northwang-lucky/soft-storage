# Developer Guide

This article aims to help you understand the overall Smart Storage development workflow so that you can better participate in the construction.

## Directory Structure

The basic directory structure of your project looks like this:

```toml
.
├── .github        # Store the GitHub workflow profile
├── .husky         # Storing git hooks
├── ...
├── config         # Store the project base configuration file (all configurations are inherited here)
├── docs           # Markdown documentation powered by VuePress
├── packages       # The main source package of the project will be published to npm
├── playground     # Example Demo source code package
├── scripts        # Scripts to be called during build/test
├── ...
├── package.json
├── ...
```

## Contribution Prerequisites

- Node LTS
- PNPM >= 7.1.0

## Optional Suggestions

Use [Visual Studio Code](https://code.visualstudio.com/) as a code editor for Smart Storage, and install the following extension:

- Code Spell Checker
- ESLint
- markdownlint
- Prettier

## Branch Naming Conventions

> We recommend naming your branches this way, but feel free to ignore our advice

You can choose a branch namespace from the following words:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

Then, using no more than three words that explicitly express the meaning of the code in the branch, combined with the namespace selected in the previous step, as in `kebab-case` :

```text
feat/open-api
```
