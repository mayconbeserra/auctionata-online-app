"use strict";

var axios = require('axios');

var serviceUrlGet = 'http://localhost:3204/auctionata/api/v1/auctions';
var serviceUrlPost = 'http://localhost:3204/auctionata/api/v1/auctions/bid/{auctionid}/{buyerid}?bidvalue={value}';

var AuctionApi = {
	getAllAuctions: function() {
		return axios({
			url: serviceUrlGet,
			method: 'get',
			data: ''
		}).then(function(response) {
			return response;
		});
	},

	placeABid: function(message) {
		debugger;
		console.log("### AUCTION.API.PLACEABID ####");
		var url = serviceUrlPost.replace('{auctionid}', message.id);
		url = url.replace('{buyerid}', message.buyerid);
		url = url.replace('{value}', message.newbidvalue);

		return axios({
			url: url,
			method: 'post',
			data: message
		}).then(function(response) {
			return response;
		}).catch(function (response) {
			return response;
  	});
	}
};

module.exports = AuctionApi;
