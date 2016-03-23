"use strict";

var React = require('react');
var Router = require('react-router');

var Home = React.createClass({
    render: function() {
        return (
          <div className="jumbotron">
            <h1>Auctionata Online</h1>
            <p>Welcome to the leading online auction house for art and luxury colletibles. Please, check the current auctions.</p>
            <Router.Link to="about" className="btn btn-primary btn-lg">Learn more about us</Router.Link>
          </div>
        );
    }
});

module.exports = Home;
