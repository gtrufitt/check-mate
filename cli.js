#!/usr/bin/env node
'use strict';
const meow = require('meow');
const checkMate = require('.');
const chalk = require('chalk');

const cli = meow(`
	Usage
	  $ check-mate [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ check-mate
	  // Will check the default files
	  $ check-mate ./my-files
	  // Will merge custom file set with default set
`);

console.log(chalk.green('Hey!'));
console.log(chalk.green('Checking...'));

checkMate(cli.input[0] || {});
