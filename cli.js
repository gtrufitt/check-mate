#!/usr/bin/env node
'use strict';
const meow = require('meow');
const checkMate = require('.');
const chalk = require('chalk');

const cli = meow(`
	Usage
	  $ check-mate
		// Run on a project folder

	Examples
	  $ check-mate
	  // Will check the default files exist
`);

console.log(chalk.green('Hey!'));
console.log(chalk.green('Checking...'));

checkMate(cli.input[0] || {});
