# check-mate [![Build Status](https://travis-ci.org/gtrufitt/check-mate.svg?branch=master)](https://travis-ci.org/gtrufitt/check-mate)

> Your mate to check files or modules exist in your project


## Install

```
$ npm install check-mate
```


## Usage

```js
const checkMate = require('check-mate');

checkMate('unicorns');
//=> 'unicorns & rainbows'
```


## API

### checkMate(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global check-mate
```

```
$ check-mate --help

  Usage
    check-mate [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ check-mate
    unicorns & rainbows
    $ check-mate ponies
    ponies & rainbows
```


## License

MIT © [Gareth Trufitt](http://trufitt.com)
