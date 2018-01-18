import middy from 'middy'
import { jsonBodyParser, httpErrorHandler, cors } from 'middy/middlewares'
import { load } from 'envdotjs'
load()

// Export function with middleware
module.exports.postReviewV1 = middy((event, context, callback) => {
		callback(null, {
			body: JSON.stringify({
				result: 'success'
			})
		})
	})
	.use(cors())
	.use(jsonBodyParser())
	.use(httpErrorHandler())