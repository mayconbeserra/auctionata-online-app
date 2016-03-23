"use strict";

var axios = require('axios');

var serviceUrl = 'http://localhost:3204/auctionata/api/v1/buyers';

var BuyerApi = {
	getAllBuyers: function() {
		return axios({
			url: serviceUrl,
			method: 'get',
			data: ''
		}).then(function(response) {
			return response;
		});
	}
};

module.exports = BuyerApi;
