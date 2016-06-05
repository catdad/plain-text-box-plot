/* eslint-env mocha */

var expect = require('chai').expect;
var ptBox = require('../index.js');

describe('[index]', function() {
    var DATA = {
        min: 1,
        q1: 2,
        q2: 3,
        q3: 4,
        max: 5
    };
    var DEFAULT_WIDTH = 75;
    
    it('returns a string or 3 lines', function() {
        var str = ptBox(DATA);
        
        expect(str).to.be.a('string');
        
        var strArr = str.split('\n');
        
        expect(strArr).to.have.lengthOf(3);
        
        strArr.forEach(function(line) {
            expect(line).to.have.property('length')
                .and.to.be.at.most(DEFAULT_WIDTH);
        });
    });
    
    it('takes an optional width', function() {
        var WIDTH = 20;
        var str = ptBox(DATA, WIDTH);
        var strArr = str.split('\n');
        
        strArr.forEach(function(line) {
            expect(line).to.have.property('length')
                .and.to.be.at.most(WIDTH);
        });
    });
    
    it('takes an optional options object with a width property', function() {
        var WIDTH = 20;
        var str = ptBox(DATA, {
            width: WIDTH
        });
        var strArr = str.split('\n');
        
        strArr.forEach(function(line) {
            expect(line).to.have.property('length')
                .and.to.be.at.most(WIDTH);
        });
    });
});
