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
		_protocol = 'https',
		_host = 'secure.verotel.com',
		_purchaseUrl = '/order/purchase',
		_statusUrl = '/status/purchase',
		_version = '2';

	function getPurchaseUrl(secret, params) {
		if (secret && toType(secret) === 'string') {
			if (params && toType(params) === 'object') {
				return _generateUrl(_purchaseUrl, secret, params);
			} else {
				throw new Error('`params` argument is required and must be an object');
			}
		} else {
			throw new Error('`secret` argument is required and must be a string');
		}
	}

	function getSignature(secret, params) {
		if (secret && toType(secret) === 'string') {
			if (params && toType(params) === 'object') {
				var filtered = _filterParameters(params);
				return _signature(secret, filtered);
			} else {
				throw new Error('`params` argument is required and must be an object');
			}
		} else {
			throw new Error('`secret` argument is required and must be a string');
		}
	}

	function getStatusUrl(secret, params) {
		if (secret && toType(secret) === 'string') {
			if (params && toType(params) === 'object') {
				return _generateUrl(_statusUrl, secret, params);
			} else {
				throw new Error('`params` argument is required and must be an object');
			}
		} else {
			throw new Error('`secret` argument is required and must be a string');
		}
	}

	function validateSignature(secret, params) {
		if (secret && toType(secret) === 'string') {
			if (params && toType(params) === 'object') {
				if (params.signature && toType(params.signature) === 'string') {
					var signature1 = params.signature;
					delete params.signature;
					var filtered = _filterParameters(params);
					var signature2 =  _signature(secret, filtered);
					return signature2 === signature1;
				} else {
					throw new Error('the proptery `signature` is required in the `params` object');
				}
			} else {
				throw new Error('`params` argument is required and must be an object');
			}
		} else {
			throw new Error('`secret` argument is required and must be a string');
		}
	}

	function _buildUrl(url, params) {
		var urlObj = {
			protocol: _protocol,
			host: _host,
			pathname: url,
			query: params
		};
		return urllib.format(urlObj);
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

		if (toType(params) === 'object') {
			for (var i = 0, l = patterns.length; i < l; i++) {
				pattern = patterns[i];
				for (var key in params) {
					if (key.match(pattern)) {
						filtered[key] = params[key];
					}
				}
			}
		} else {
			throw new Error('`params` argument is required and must be an object!');
		}
		return filtered;
	}

	function _generateUrl(baseUrl, secret, params) {
		var signature = '';
		params.version = _version;
		params = _filterParameters(params);
		params.signature = _signature(secret, params);

		return _buildUrl(baseUrl, params);
	}

	function _signature(secret, params) {
		if (secret && toType(secret) === 'string') {
			if (toType(params) === 'object') {
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
			console.log('here', validator.isAlphanumeric(secret), secret);
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
