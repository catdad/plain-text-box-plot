# plain-text-box-plot

A small Node library that creates box plots in plain text. Great for outputting box plots from CLI tools.

## API

```javascript
var ptBox = require('plain-text-box-plot');

var data = {
    min: 1,
    q1: 2,
    q2: 3,
    q3: 4,
    max: 5
};

var boxplotString = ptBox(data);
```

Example output:

```
         +--------+--------+
|--------|        |        |--------|
         +--------+--------+
```

By default, the width of the output will be at most 75 characters. (Note: sometimes it can be 74, depending on the data.) You can also set this value with an optional second parameter:

```javascript
var ptBox = require('plain-text-box-plot');

var data = { ... };

var boxplotString = ptBox(data, 120);
```

If you are going to `console.log` it, and would like to match the console width, you can figure that out as such:

```javascript
var tty = require('tty');
var isatty = tty.isatty(1) && tty.isatty(2);

var width;

// if we are not in a tty session, you don't want to do this
if (isatty) {
    width = process.stdout.getWindowSize ?
        process.stdout.getWindowSize(1)[0] :
        tty.getWindowSize()[1];
}

var ptBox = require('plain-text-box-plot');

var data = { ... };
var boxplotString = ptBox(data, width);
```
