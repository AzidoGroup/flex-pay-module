var mockconfig = {},
	Flexpay = require('../../../index')(mockconfig).FlexPay,
	should = require('should');

describe('Flex Pay: Validate Signature tests', function () {
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
			Flexpay.validateSignature();
		}).should.throw();
		done();
	});

	it('should fail if `secret` argument is null', function (done) {
		(function () {
			Flexpay.validateSignature(null, params);
		}).should.throw();
		done();
	});

	it('should fail if `params` argument is null', function (done) {
		(function () {
			Flexpay.validateSignature(secret, null);
		}).should.throw();
		done();
	});

	it('should fail if `params` argument is an array', function (done) {
		(function () {
			Flexpay.validateSignature(secret, []);
		}).should.throw();
		done();
	});

	it('should fail if the `params` object is missing the `signature` property', function (done) {
		(function () {
			Flexpay.validateSignature(secret, params);
		}).should.throw();
		done();
	});

	it('should fail if the the signatures are different', function (done) {
		params.signature = 'asdfasdfasdf';
		should(Flexpay.validateSignature(secret, params)).be.false;
		done();
	});

	it('should fail if the the signatures are different', function (done) {
		params.signature = Flexpay.getSignature(secret, params);
		should(Flexpay.validateSignature(secret, params)).be.true;
		done();
	});

});
