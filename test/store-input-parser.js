'use strict';

// tests for range module

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
const storeInputParser = require('../src/store-input-parser.js');

describe('storeInputParser', () => {
  it('storeInputParser boolean formatter should return true if given truthy input', (done) => {
    const result = storeInputParser.formatBoolean('test');
    expect(result).to.be.true;
    done();
  });

  it('storeInputParser boolean formatter should return false if given falsy input', (done) => {
    const result = storeInputParser.formatBoolean(0);
    expect(result).to.be.false;
    done();
  });

  it('storeInputParser boolean formatter should return true if given the string \'false\'', (done) => {
    const result = storeInputParser.formatBoolean('false');
    expect(result).to.be.false;
    done();
  });

  it('storeInputParser boolean formatter should return true if given the string \'FALSE\'', (done) => {
    const result = storeInputParser.formatBoolean('FALSE');
    expect(result).to.be.false;
    done();
  });

  it('storeInputParser number formatter should return int 3 if given the string \'3\'', (done) => {
    const result = storeInputParser.formatNumber('3');
    expect(result).to.equal(3);
    done();
  });

  it('storeInputParser number formatter should return NaN if given input that cannot be parsed into an int', (done) => {
    const result = storeInputParser.formatNumber('ten');
    expect(result).to.be.NaN;
    done();
  });
});
