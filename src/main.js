"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var auctionActions = require('./actions/auctionActions');
var buyerActions = require('./actions/buyerActions');

buyerActions.initialiseBuyers();
auctionActions.initialiseAuctions();

// Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
