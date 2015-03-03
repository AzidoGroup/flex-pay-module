var crypto = require('crypto'),
	urllib = require('url'),
	validator = require('validator');
/**
 * A Node module to help send transactions to the Verotel payment processor
 *
 * See verotel API docs at:
 * http://www.verotel.com/en/verotel-flexpay-online-services-api.html
 *
 * @param {Object} config
 */

var toType = function(obj) {
	// stolen from: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

function FlexPay(config) {
	'use strict';

	var publicAPI,
		_purchaseUrl = 'https://secure.verotel.com/order/purchase',
		_statusUrl = 'https://secure.verotel.com/status/purchase',
		_version = '2';

	function getPurchaseUrl(secret, params) {

	}

	function getSignature(secret, params) {
		var filtered = _filterParameters(params);
		return _signature(secret, filtered);
	}

	function getStatusUrl() {

	}

	function validateSignature() {

	}

	function _filterParameters(params) {
		var filtered = {},
			patterns = [
				'custom\w*',
				'description',
				'shopID',
				'price(Amount|Currency)',
				'paymentMethod',
				'referenceID',
				'saleID',
				'version'
			],
			pattern;

		if (toType(params) !== 'object') {
			for (var i = 0, l = patterns.length; i < l; i++) {
				pattern = partterns[i];
				for (var key in params) {
					if (key.match(pattern)) {
						filtered[key] = params[key];
					}
				}
			}
		} else {
			throw new Error('`params` argument must be an object!');
		}
		return filtered;
	}

	function _signature(secret, params) {
		if (secret && validator.isAlphanumeric(secret)) {
			if (toType(params) !== 'object') {
				var signature = '',
					list = [secret], // had the secret first
					hash;
				for (var p in params) {
					list.push(p + '=' + params[p]);
				}
				signature = crypto
					.createHash('sha1')
					.update(list.join(':'))
					.digest('hex')
					.toLowerCase();
				return signature;
			} else {
				throw new Error('`params` argument must be an object!');
			}
		} else {
			throw new Error('`secret` argument is required and must be a string');
		}
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
