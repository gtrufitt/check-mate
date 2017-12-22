'use strict';

const chalk = require('chalk');
const checkFiles = require('./lib/mates');

const logAll = messages => messages.map(message => console.log(chalk.green(message)));

const runCheckers = (opts) => {
	return mate =>
		Promise.all(mate.checkers.map(checker => checker(mate, opts)))
			.then(message => {
				console.log(' ')
				console.log(' ')
				console.log(chalk.bold.blueBright(`Checks for ${mate.humanName}`));
				logAll(message);

			});
}

module.exports = (input, opts) => {
	opts = opts || {};
	checkFiles.map(runCheckers(opts))
};
