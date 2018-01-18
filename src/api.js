import queryValidator from './query-validator.js';

module.exports = {
	postReview: (data) => {
		// validate
		if (!queryValidator.validateReviewPost(data)) {
			return Promise.reject('Malformed request data')
		}
		// make request if valid
		return Promise.resolve();
	}
}