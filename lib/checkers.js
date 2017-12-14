const fs = require('fs');
const chalk = require('chalk');
const readJson = require('read-package-json')
const endOfLine = require('os').EOL;

module.exports = {
  checkFileExists: ({humanName, fileName, checker}) => {
    return new Promise(function(resolve, reject) {

      const checkFile = (fileName) =>
         (fs.existsSync(fileName)) ? chalk.green(`Yes, ${fileName} exists`) : chalk.red(`No, ${fileName} doesn't exist`);

      (typeof fileName === 'string') ? resolve(checkFile(fileName)) : resolve(fileName.map(checkFile).join(endOfLine));

    });
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
