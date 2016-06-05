function lengthPercents(opts) {
    var totalLength = opts.max - opts.min;

    var p1 = (opts.q1 - opts.min) / totalLength;
    var p2 = (opts.q2 - opts.min) / totalLength;
    var p3 = (opts.q3 - opts.min) / totalLength;
    var p4 = 1;

    var vals = {
        l1: p1,
        l2: p2 - p1,
        l3: p3 - p2,
        l4: p4 - p3
    };

    return vals;
}

function round(num) {
    return Math.floor(num);
}

function times(num, func) {
    while (num--) {
        func();
    }
}

function getWidth(options) {
    if (options === undefined) {
        return 75;
    }
    
    if (options === Number(options)) {
        return options;
    }
    
    return getWidth(options.width);
}

/* This is what a box plot will look like
 *
 *       +----+----+
 *  |----|    |    |----|
 *       +----+----+
 */

function createBoxPlot(stats, options) {
    var width = getWidth(options);
    var ticks = width - 5;

    var percents = lengthPercents(stats);

    var l1 = percents.l1 * ticks;
    var l2 = percents.l2 * ticks;
    var l3 = percents.l3 * ticks;
    var l4 = percents.l4 * ticks;

    var str1 = '';
    var str2 = '';
    var str3 = '';

    addEnd();

    times(round(l1), addWisker);

    addBreak();

    times(round(l2), addBox);

    addBreak();

    times(round(l3), addBox);

    addBreak();

    times(round(l4), addWisker);

    addEnd();

    function addBreak() {
        str1 += '+';
        str2 += '|';
        str3 += '+';
    }

    function addBox() {
        str1 += '-';
        str2 += ' ';
        str3 += '-';
    }

    function addWisker() {
        str1 += ' ';
        str2 += '-';
        str3 += ' ';
    }

    function addEnd() {
        str1 += ' ';
        str2 += '|';
        str3 += ' ';
    }
    
    return [str1, str2, str3].join('\n');
}

module.exports = createBoxPlot;
