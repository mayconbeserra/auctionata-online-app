"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _auctions = [];
var _bid = { isPlacedABid: false, error: '' };

var AuctionStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        debugger;
        this.emit(CHANGE_EVENT);
    },

    getAllAuctions: function() {
        return _auctions;
    },

    getPlaceABidResult: function() {
        return _bid;
    },

    getAuctionById: function(id) {
        debugger;
        return _.find(_auctions, {id: Number(id)});
    }
});

Dispatcher.register(function(action) {
    switch (action.actionType) {
      case ActionTypes.INITIALISE:
        _auctions = action.initialData.auctions;
        AuctionStore.emitChange();
        break;
      case ActionTypes.CREATE_AUCTION:
        _auctions.push(action.auction);
        AuctionStore.emitChange();
        break;
      case ActionTypes.BID_AUCTION:
        debugger;
        if (action.auction.status.toString().startsWith("20")) {
          console.log("### AuctionStore.BID_AUCTION ####");
          console.log(action.auction.data);
          var existingAuction = _.find(_auctions, {id: action.auction.data.id});
          var existingAuctionIndex = _.indexOf(_auctions, existingAuction);
          _auctions.splice(existingAuctionIndex, 1, action.auction.data);

          console.log(existingAuction);
          console.log("### AuctionStore.BID_AUCTION ####" + existingAuction);
          _bid.isPlacedABid = true;
        } else {
          _bid.isPlacedABid = false;
          _bid.error = action.auction.data;
        }
        AuctionStore.emitChange();
        break;
      case ActionTypes.RESET_BID_AUCTION:
        debugger;
        console.log("### RESET ########");
        console.log(action);
        _bid.isPlacedABid = action.isPlacedABid;
        _bid.error = action.error;
        AuctionStore.emitChange();
        break;
      default:
        // no operation
    }
});

module.exports = AuctionStore;
