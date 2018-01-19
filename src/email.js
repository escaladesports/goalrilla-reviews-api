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
		<li>User name/alias: ${data.userName}</li>
		<li>User email: ${data.userEmail}</li>
		<li>User location: ${data.userLocation}</li>
		<li>User age: ${data.userAge}</li>
		<li>User gender: ${data.userGender}</li>
		<li>User description: ${data.userDescription}</li>
		<li>
	</ul>
	</body></html>`;

	return client.send({subject, message}, sendTo);
}

module.exports = {
	sendReviewEmail
}