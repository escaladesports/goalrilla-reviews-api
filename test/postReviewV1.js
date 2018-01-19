'use strict';

// tests for postReviewV1
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('postReviewV1', '/src/handler.js', 'postReviewV1');

describe('postReviewV1', () => {
  let reviewPostData;

  before((done) => {
  	reviewPostData = {
  		'product-id': 'xxxxxx',
  		'user-name': 'Test Review Data',
  		'user-email': 'testreviewer@gmail.com',
  		'user-location': 'Evansville, IN',
  		'review-summary': 'Great product!',
  		'review-body': 'Test review',
  		'product-rating': 5,
  		'brand-recommendation-reason': 'Test brand recommendation reason',
  		'brand-recommendation-rating': 10,
  		'improves-game-rating': 5,
  		'quality-rating': 5,
  		'value-rating': 5,
  		'would-recommend': 'true',
  		'user-age': '7',
  		'user-gender': '2',
  		'user-description': '5',
  		'length-owned': '4'
  	}
    done();
  });

  it('should return a response', () => {
    return wrapped.run({body: reviewPostData}).then((response) => {
      const responseBodyParsed = JSON.parse(response.body);
      expect(responseBodyParsed.result).to.equal('success');
    });
  });

  it('should return an error', () => {
  	const malformedData = Object.assign({}, reviewPostData);
  	malformedData['user-name'] = undefined;

  	return wrapped.run({body: malformedData}).then((response) => {
  		const responseBodyParsed = JSON.parse(response.body);
  		expect(responseBodyParsed.error).to.equal('Malformed request data');
  	})
  })
});