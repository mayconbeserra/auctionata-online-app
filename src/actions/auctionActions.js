"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuctionAPI = require('../api/auctionAPI');
var ActionTypes = require('../constants/actionTypes');
var Promise = require('promise');

var AuctionActions = {

    initialiseAuctions: function() {
      Promise.resolve(AuctionAPI.getAllAuctions()).then(function(result) {
        debugger;
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALISE,
            initialData: {
                auctions: result.data
            }
        });
      });
    },

    createAuction: function(auction) {
        var newAuction = AuctionAPI.saveAuction(auction);
        //Hey dispatcher, go tell all the stores that an auction was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUCTION,
            auction: newAuction
        });
    },

    placeABid: function(auction) {
      Promise.resolve(AuctionAPI.placeABid(auction)).then(function(result) {
        Dispatcher.dispatch({
            actionType: ActionTypes.BID_AUCTION,
            auction: result
        });
      });
    },

    resetBidAuction: function() {
      Dispatcher.dispatch({
          actionType: ActionTypes.RESET_BID_AUCTION,
          auction: ''
      });
    }
};

module.exports = AuctionActions;
