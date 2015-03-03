var mockconfig = {
		host: 'http://localhost',
		auth: {
			username: 'Authorization',
			password: 'Token singlesignon'
		}
	},
	FlexPay = require('../../../index')(mockconfig).FlexPay,
	should = require('should');

describe('Flex Pay: Signature tests', function () {
	'use strict';
	it('should fail if no parameters are supplied', function (done) {
		(function () {
			Flexpay.getSignature();
		}).should.throw();
		done();
	});

	it('should fail if signature parameters are supplied', function (done) {
		(function () {
			Flexpay.getSignature(null);
		}).should.throw();
		done();
	});
});
