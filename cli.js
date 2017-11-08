#!/usr/bin/env node
'use strict';
const meow = require('meow');
const checkMate = require('.');

const cli = meow(`
	Usage
	  $ check-mate [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ check-mate
	  unicorns & rainbows
	  $ check-mate ponies
	  ponies & rainbows
`);

console.log(checkMate(cli.input[0] || 'unicorns'));
