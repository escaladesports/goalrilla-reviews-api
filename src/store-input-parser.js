function formatNumber(input) {
	return parseInt(input);
}

function formatBoolean(input) {
	if (input.toString().toLowerCase() === 'false' || !input) {
		return false;
	}
	return true;
}

module.exports = {
	formatNumber,
	formatBoolean
}