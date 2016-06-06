/* This is what a box plot will look like
 *
 *       +----+----+
 *  |----|    |    |----|
 *       +----+----+
 */

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

    var top = '';
    var mid = '';

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
        top += '+';
        mid += '|';
    }

    function addBox() {
        top += '-';
        mid += ' ';
    }

    function addWisker() {
        top += ' ';
        mid += '-';
    }

    function addEnd() {
        top += ' ';
        mid += '|';
    }
    
    return [top, mid, top].join('\n');
}

module.exports = createBoxPlot;
