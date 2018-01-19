/*
	Checks for missing keys in request data
	@param {Array.<String>} keys Keys/properties to check for on request data
	@param {Object} data Request data to validate
	@returns {Boolean} False if validation fails, true if successful
*/
function checkMissingKeys(keys, data) {
	for (let key of keys) {
		if (data[key] === undefined || !(key in data)) {
			console.log('missing key '+key);
			return false;
		}
	}
	return true;
}

function checkNumberInRange(num, min, max) {
	const parsedNum = parseInt(num);
	if (isNaN(parsedNum)) {
		console.log(`is not a valid number: ${num}`);
		return false;
	}
	if (parsedNum < min) {
		console.log(`is below minimum (${min}): ${num}`);
		return false;
	}
	if (parsedNum > max) {
		console.log(`is above maximum (${max}): ${num}`)
		return false;
	}
	return true;
}

function validateReviewPost(params) {
	// check for missing data
	if (!checkMissingKeys([
			'timestamp',
			'sku',
			'userName',
			'userEmail',
			'reviewSummary',
			'reviewBody',
			'productRating',
			'improvesGameRating',
			'qualityRating',
			'valueRating',
			'wouldRecommend',
		], params)) {
		return false;
	}
	if (!checkNumberInRange(params.productRating, 1, 5)) {
		return false;
	}
	if (checkMissingKeys(['brandRecommendRating'], params) && !checkNumberInRange(params.brandRecommendRating, 1, 10)) {
		return false;
	}
	if (!checkNumberInRange(params.improvesGameRating, 1, 5)) {
		return false;
	}
	if (!checkNumberInRange(params.qualityRating, 1, 5)) {
		return false;
	}
	if (!checkNumberInRange(params.valueRating, 1, 5)) {
		return false;
	}
	if (checkMissingKeys(['userAge'], params) && !checkNumberInRange(params.userAge, 5, 8)) {
		return false;
	}
	if (checkMissingKeys(['userGender'], params) && !checkNumberInRange(params.userGender, 1, 4)) {
		return false;
	}
	if (checkMissingKeys(['userDescription'], params) && !checkNumberInRange(params.userDescription, 1, 5)) {
		return false;
	}
	if (checkMissingKeys(['lengthOwned'], params) && !checkNumberInRange(params.lengthOwned, 1, 6)) {
		return false;
	}
	return true;
}

module.exports = {
	validateReviewPost
}
