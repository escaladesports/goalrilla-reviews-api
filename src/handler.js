import middy from 'middy'
import { jsonBodyParser, httpErrorHandler, cors } from 'middy/middlewares'
import { load } from 'envdotjs'
load()

import api from './api.js'
import timestamp from './timestamp.js'

// Export function with middleware
module.exports.postReviewV1 = middy((event, context, callback) => {
		//console.log('Env:', process.env)
		console.log('Body:', event.body)
		const params = {
			timestamp: timestamp.createCurrentTimestamp(),
			sku: event.body['product-id'].toUpperCase(),
			userName: event.body['user-name'],
			userEmail: event.body['user-email'],
			userLocation: event.body['user-location'],
			reviewSummary: event.body['review-summary'],
			reviewBody: event.body['review-body'],
			productRating: event.body['product-rating'],
			brandRecommendationReason: event.body['brand-recommendation-reason'],
			brandRecommendRating: event.body['brand-recommendation-rating'],
			improvesGameRating: event.body['improves-game-rating'],
			qualityRating: event.body['quality-rating'],
			valueRating: event.body['value-rating'],
			wouldRecommend: event.body['would-recommend'],
			userAge: event.body['user-age'],
			userGender: event.body['user-gender'],
			userDescription: event.body['user-description'],
			lengthOwned: event.body['length-owned']
		}

		api.postReview(params).then(responseData => {
			callback(null, {
				body: JSON.stringify({
					result: 'success'
				})
			})
		}).catch(err => {
			console.error('Error: '+err);
			callback(null, {
				body: JSON.stringify({
					error: err
				})
			})
		});
	})
	.use(cors())
	.use(jsonBodyParser())
	.use(httpErrorHandler())