var urllib = require('url');

function FlexPay(config) {
	'use strict';

	var publicAPI,
		_purchaseUrl = 'https://secure.verotel.com/order/purchase',
		_statusUrl = 'https://secure.verotel.com/status/purchase',
		_version = '2';

	function getPurchaseUrl(secret, params) {

	}

	function getSignature() {

	}

	function getStatusUrl() {

	}

	function validateSignature() {

	}

	publicAPI = {
		getPurchaseUrl: getPurchaseUrl,
		getSignature: getSignature,
		getStatusUrl: getStatusUrl,
		validateSignature: validateSignature
	};

	return publicAPI;
}

var exports = module.exports = FlexPay;
