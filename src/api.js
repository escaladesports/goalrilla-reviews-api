import queryValidator from './query-validator.js';
import store from './store.js';
import range from './range.js';

function postReviewAction(data) {
	// post google sheets request
	// order is important, do this first so we can pass claim # to email properly
	return store.saveReview(data)
	.then(res => {
		console.log('halp');
		console.log('res:');
		console.dir(res);
		// add in additional information from google sheets
		const requestId = range.getFinalRangeRow(res.updates.updatedRange);
		const updatedData = Object.assign({}, data, { requestId });
		// email relevant parties
		//return email.sendWarrantyRegistrationEmail(updatedData, emailConfig.warrantyRegistrationRecipients)
		return updatedData; // emailing disabled, just sent the raw data...
	});
}

module.exports = {
	postReview: (data) => {
		// validate
		if (!queryValidator.validateReviewPost(data)) {
			return Promise.reject('Malformed request data')
		}
		// make request if valid
		return postReviewAction(data);
	}
}