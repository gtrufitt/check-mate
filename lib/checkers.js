const fs = require('fs');
const fsFind = require('fs-find');
const cwd = process.cwd();
const path = require('path');
const chalk = require('chalk');
const readJson = require('read-package-json')
const endOfLine = require('os').EOL;

const buildStringForFileName = fileName => {
  let resultCount = 0
  return (currentString, result) => {
    if (result.matcher === fileName) {
      resultCount++;
      return `${currentString}` +
        `${(resultCount > 1) ? endOfLine : ''}` +
        `Yes, ${fileName} exists in ${result.folder}`
    }
    return currentString;
  }
}


const folderFilter = ['node_modules', '.idea', '.git'];
const folderFilterFunc = path => !folderFilter.some(_ => path.indexOf(_) > 0);

module.exports = {
  checkFileExists: ({humanName, fileName, checker}, opts) => {

    const checkFile = (fileName) => {
      return new Promise((resolve, reject) => {
        const findOpts = {
          depth: opts.depth,
          folder: folderFilterFunc
        }
        fsFind(cwd, findOpts, (err, results) => {
          if (results.some(result => result.matcher === fileName)) {
            const resultsString = results.reduce(buildStringForFileName(fileName, 0), '');
            return resolve(chalk.green(resultsString));
          }

          return resolve(chalk.red(`No, ${fileName} doesn't exist`));
        });
      });
    }

    if (typeof fileName === 'string') {
      return checkFile(fileName);
    } else {
      return Promise.all(fileName.map(checkFile)).then(results => results.reduce((prev, next) => `${prev} ${endOfLine}${next}`));
    }
  },

  packageJsonVersion: function({moduleName}) {

    return new Promise(function(resolve, reject) {
      readJson('package.json', console.error, false, (err, data) => {
        if (err) { return resolve(err) }

        const checkVersion = (moduleName) => {
          const pretext  = `Package version for ${moduleName} is `;

          const version = (data.dependencies && data.dependencies[moduleName]) || (data.devDependencies && data.devDependencies[moduleName]);
          return version ? chalk.green(pretext, version) : chalk.red(pretext, 'not in package.json');
        }

        (typeof moduleName === 'string') ? resolve(checkVersion(moduleName)) : resolve(moduleName.map(checkVersion).join(endOfLine));
      })
    });

  },

  echoFileContents: function({prefix}) {
    return ({filePath, fileName}) => {
      return new Promise(function(resolve, reject) {
        const path = filePath ? `${filePath}/${fileName}` : fileName;
        try {
          const response = fs.readFileSync(path);
          resolve(chalk.green(`${prefix} ${response}`));
        } catch (err) {
          resolve(chalk.red(`Cannot read ${path}`));
        }
      });
    }
  }
};
