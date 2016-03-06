
var assert = require('assert'),
	request = require('request');

function _fetch (opt) {
	request({
		uri: opt.url,
		method: opt.method || 'GET',
		form: opt.data || {}
	}, function(error, res, data) {
		if (error) {
			opt.error.call(this, data);
		} else {
			opt.success.call(this, data);
		}
	});
}

module.exports = function(serverOptions, _getFile) {

	var pathExpected = './test/expected/mock-server',
		baseUrl = serverOptions.urlBase + serverOptions.urlPath;

	it('GET /products/search', function () {
		_fetch({
			url: baseUrl + '/products/search',
			success: function (data) {
				var expected = _getFile(pathExpected + '/01.json');
				assert.equal(data, expected);
			}
		});
	});

	it('GET /products/{productCode}', function () {
		_fetch({
			url: baseUrl + '/products/31221',
			success: function (data) {
				var expected = _getFile(pathExpected + '/02.json');
				assert.equal(data, expected);
			}
		});
	});

	it('POST /products/{productCode}', function () {
		_fetch({
			url: baseUrl + '/products/31221',
			method: 'POST',
			success: function (data) {
				var expected = _getFile(pathExpected + '/03.json');
				assert.equal(data, expected);
			}
		});
	});

};