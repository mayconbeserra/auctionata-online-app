"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var BuyerAPI = require('../api/BuyerAPI');
var ActionTypes = require('../constants/actionTypes');
var Promise = require('promise');

var BuyerActions = {

    initialiseBuyers: function() {
      Promise.resolve(BuyerAPI.getAllBuyers()).then(function(result) {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALISE_BUYERS,
            initialData: {
                buyers: result.data
            }
        });
      });
    },

    createBuyer: function(buyer) {
        var newBuyer = BuyerAPI.saveBuyer(buyer);

        //Hey dispatcher, go tell all the stores that an buyer was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_BUYER,
            buyer: newBuyer
        });
    },

    updateBuyer: function(buyer) {
        var updatedBuyer = BuyerAPI.saveBuyer(buyer);

        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_BUYER,
            buyer: updatedBuyer
        });
    },

    deleteBuyer: function(id) {
        BuyerAPI.deleteBuyer(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_BUYER,
            id: id
        });
    }
};

module.exports = BuyerActions;
