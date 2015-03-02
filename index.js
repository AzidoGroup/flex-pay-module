var FlexPay = require('./lib/flex-pay');

module.exports = function (config) {
	'use strict';

	return {
		FlexPay: FlexPay(config)
	};
};
