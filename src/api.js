import queryValidator from './query-validator.js';
import store from './store.js';
import range from './range.js';
import email from './email.js';

function postReviewAction(data) {
	console.log('Saving review...')
	// post google sheets request
	// order is important, do this first so we can pass claim # to email properly
	return store.saveReview(data)
	.then(res => {
		// add in additional information from google sheets
		const requestId = range.getFinalRangeRow(res.updates.updatedRange);
		const updatedData = Object.assign({}, data, { requestId });
		const emailRecipients = [ ...process.env.REVIEW_EMAIL_LIST.split(';') ];
		console.log('sending email...');
		// email relevant parties
		return email.sendReviewEmail(updatedData, emailRecipients).then(() => {
			console.log('email sent');
			return updatedData; // emailing disabled, just sent the raw data...
		}).catch(err => {
			console.log('error:');
			console.error(err);
			return Promise.reject(err);
		});
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