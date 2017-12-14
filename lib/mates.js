const {packageJsonVersion, checkFileExists, echoFileContents} = require('./checkers');

module.exports = [
  {humanName: 'Riff Raff', fileName: 'riff-raff.yaml', checkers: [checkFileExists]},
  {
    humanName: 'Linting',
    fileName: ['.eslintrc.js', '.eslintrc', '.jshintrc', '.sass-lint.yml'],
    moduleName: ['eslint', 'jshint', 'sass-lint'],
    checkers: [checkFileExists, packageJsonVersion]
  },
	{humanName: '.babelrc', fileName: '.babelrc', moduleName: 'babel', checkers: [checkFileExists, packageJsonVersion]},
	{humanName: '.nvmrc', fileName: '.nvmrc', checkers: [checkFileExists, echoFileContents({prefix: 'The node version is set to'})]},
  {humanName: 'Bundlers', moduleName: ['webpack', 'requirejs', 'jspm'], checkers: [packageJsonVersion]},
  {humanName: 'A lock or shrinkwrap', fileName: ['yarn.lock', 'npm-shrinkwrap.json', 'package-lock.json'], checkers: [checkFileExists]},
]
