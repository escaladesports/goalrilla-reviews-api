const createClient = require('./email-client.js').createClient;
/**
	Sends a warranty registration notification filled-out with param data to specified recipients
	@param {Object} data Warranty registration data from form/etc.
	@param {String|Array.<String>} sendTo String or array of strings with email addresses of recipients
	@returns {Promise}
*/
function sendReviewEmail(data, sendTo) {
// take data and send to sendTo
	const client = createClient();
	const subject = `New Goalrilla review for ${data.sku}`;
	const message = `<html><body><p>New Goalrilla review received:</p>
	<p>Request ID: ${data.requestId}</p>
	<p>Date: ${data.timestamp}</p>
	<h2>Review</h2>
	<ul>
		<li>SKU: ${data.sku}</li>
		<li>Product rating: ${data.productRating}</li>
		<li>"Improves my game" rating: ${data.improvesGameRating}</li>
		<li>"Quality" rating: ${data.qualityRating}</li>
		<li>"Value" rating: ${data.valueRating}</li>
		<li>Would recommend product: ${data.wouldRecommend}</li>
		<li>Brand recommendation rating: ${data.brandRecommendRating}</li>
		<li>Brand recommendation reason: ${data.brandRecommendationReason}</li>
		<li>User name/alias: ${data.userName}</li>
		<li>User email: ${data.userEmail}</li>
		<li>User location: ${data.userLocation}</li>
		<li>User age: ${data.userAge}</li>
		<li>User gender: ${data.userGender}</li>
		<li>User description: ${data.userDescription}</li>
		<li>Length product owned: ${data.lengthOwned}</li>
	</ul>
	<h2>${data.reviewSummary}</h2>
	<div>${data.reviewBody}</div>
	</body></html>`;

	return client.send({subject, message}, sendTo, process.env.REVIEW_EMAIL_FROM);
}

module.exports = {
	sendReviewEmail
}