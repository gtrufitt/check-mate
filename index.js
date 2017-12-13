'use strict';

const chalk = require('chalk');
const checkFiles = require('./mates.js');

const logAll = messages => messages.map(message => console.log(chalk.green(message)));

const runCheckers = mate => {
	Promise.all(mate.checkers.map(checker => checker(mate)))
		.then(message => {
			console.log(' ')
			console.log(' ')
			console.log(chalk.bold.blueBright(`Checks for ${mate.humanName}`));
			logAll(message);

		});
}

module.exports = (input, opts) => {
	if (typeof input !== 'object') {
		throw new TypeError(`Expected an object, got ${typeof input}`);
	}

	opts = opts || {};

	checkFiles.map(runCheckers)
};
