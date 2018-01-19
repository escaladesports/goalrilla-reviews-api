const sparkpost = require('sparkpost');

/**
	Email client, abstracts underlying API/email logic
*/
class EmailClient {
	constructor(key, options) {
		this.client = new sparkpost(key, options);
	}

	send(messageData, recipients, messageFrom) {
		console.dir(recipients);
		const transmission = {
			content: {
				from: messageFrom,
				subject: messageData.subject,
				html: messageData.message
			},
			recipients: recipients.map(address => ({ address }))
		}

		return this.client.transmissions.send(transmission)
		  .then(data => {
		    console.log('Mail sent successfully');
		    return true;
		  })
		  .catch(err => {
		    console.log('Error sending mail');
		    console.dir(err);
		    return err;
		  });
	}
}

/**
	Creates new email client
*/
function createClient() {
	const debug = (process.env.NODE_ENV === 'development');
	const sparkpostKey = process.env.SPARKPOST_API_KEY;
	const defaultOptions = {
		debug // disable before production!
	}
	return new EmailClient(sparkpostKey, defaultOptions);
}

module.exports = {
	createClient
}