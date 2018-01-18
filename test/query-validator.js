'use strict';

// tests for range module

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
const queryValidator = require('../src/query-validator.js');

describe('queryValidator', () => {
  let queryData;

    before((done) => {
      queryData = {
        timestamp: '12-24-2017 1:00 PM',
        sku: 'xxxxxx',
        userName: 'Test User',
        userEmail: 'test@gmail.com',
        reviewSummary: 'Test Review',
        reviewBody: 'Test body',
        productRating: 5,
        improvesGameRating: 3,
        qualityRating: 3,
        valueRating: 2,
        wouldRecommend: true,
      }
      done();
  });

  it('queryValidator should return true if all required properties are present', (done) => {
    const isValid = queryValidator.validateReviewPost(queryData);
    expect(isValid).to.equal(true);
    done();
  });

  it('queryValidator should return false if timestamp is missing', (done) => {
    const missingData = Object.assign({}, queryData);
    missingData.timestamp = undefined;

    const isValid = queryValidator.validateReviewPost(missingData);
    expect(isValid).to.equal(false);
    done();
  });
});
