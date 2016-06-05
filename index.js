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

function lengthPercents(opts) {
    var totalLength = opts.max - opts.min;

    var p1 = (opts.q1 - opts.min) / totalLength;
    var p2 = (opts.q2 - opts.min) / totalLength;
    var p3 = (opts.q3 - opts.min) / totalLength;
    var p4 = 1;

    return {
        l1: p1,
        l2: p2 - p1,
        l3: p3 - p2,
        l4: p4 - p3
    };
}

/* This is what a box plot will look like
 *
 *       +----+----+
 *  |----|    |    |----|
 *       +----+----+
 */

function createBoxPlot(stats, options) {
    var width = getWidth(options);
    
    // we are adding 5 extra characters (2 at the ends and 1
    // between each section), so we will subtract that from
    // the total width here
    var chars = width - 5;

    var percents = lengthPercents(stats);

    var l1 = percents.l1 * chars;
    var l2 = percents.l2 * chars;
    var l3 = percents.l3 * chars;
    var l4 = percents.l4 * chars;

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
