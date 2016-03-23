"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _buyers = [];

var BuyerStore = assign({}, EventEmitter.prototype, {

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

    getAllBuyers: function() {
        return _buyers;
    },

    getBuyerById: function(id) {
        return _.find(_buyers, {id: Number(id)});
    }

});

Dispatcher.register(function(action) {
    switch (action.actionType) {
      case ActionTypes.INITIALISE_BUYERS:
        debugger;
        _buyers = action.initialData.buyers;
        BuyerStore.emitChange();
        break;
      default:
        // no operation
    }
});

module.exports = BuyerStore;
