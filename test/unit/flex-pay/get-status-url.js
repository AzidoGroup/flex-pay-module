var mockconfig = {},
	Flexpay = require('../../../index')(mockconfig).FlexPay,
	should = require('should');

describe('Flex Pay: Get Status Url tests', function () {
	'use strict';
	var secret,
		params;

	beforeEach(function (done) {
		secret = "my secret string";
		params = {
			custome: 'custome value',
			description: 'description value',
			priceAmount: '12.22',
			priceCurrency: 'US',
			referenceID: 'AAAAAAAAA',
			saleID: '12AB',
			shopID: 12345
		};
		done();
	});

	it('should fail if no parameters are supplied', function (done) {
		(function () {
			Flexpay.getStatusUrl();
		}).should.throw();
		done();
	});

	it('should fail if `secret` argument is null', function (done) {
		(function () {
			Flexpay.getStatusUrl(null, params);
		}).should.throw();
		done();
	});

	it('should fail if `params` argument is null', function (done) {
		(function () {
			Flexpay.getStatusUrl(secret, null);
		}).should.throw();
		done();
	});

	it('should fail if `params` argument is an array', function (done) {
		(function () {
			Flexpay.getStatusUrl(secret, []);
		}).should.throw();
		done();
	});

	it('should pass if everything is good', function (done) {
		(function () {
			Flexpay.getStatusUrl(secret, params);
		}).should.not.throw();
		done();
	});

});
