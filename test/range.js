'use strict';

// tests for range module

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
const range = require('../src/range.js');

describe('range', () => {
  it('getFinalRangeRow should return 3 if the final range param\'s character is 3', (done) => {
    const row = range.getFinalRangeRow('overview!A1:R3');
    expect(row).to.equal(3);
    done();
  });

  it('getFinalRangeRow should return false if the final character isn\'t a number', (done) => {
    const row = range.getFinalRangeRow('overview!A1:R');
    expect(row).to.equal(false);
    done();
  });
});
