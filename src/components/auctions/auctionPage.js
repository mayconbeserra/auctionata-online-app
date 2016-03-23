"use strict";

var React = require('react');
var AuctionActions = require('../../actions/auctionActions');
var AuctionStore = require('../../stores/auctionStore');
var AuctionList = require('./auctionList');
var toastr = require('toastr');
var Link = require('react-router').Link;

var AuctionPage = React.createClass({

    getInitialState: function() {
        return {
            auctions: AuctionStore.getAllAuctions()
        };
    },

    componentWillMount: function() {
        console.log("### AuctionPage.ComponentWill Mount");
        AuctionStore.addChangeListener(this._onChange);
        //AuctionActions.initialiseAuctions();
    },

    componentWillUnmount: function() {
        AuctionStore.removeChangeListener(this._onChange);
        AuctionActions.resetBidAuction();
        console.log("### AuctionPage.ComponentWillUNount");
    },

    _onChange: function() {
        debugger;
        this.setState({
          auctions: AuctionStore.getAllAuctions()
        });
    },

    render: function() {
        debugger;
        var result = AuctionStore.getPlaceABidResult();
        console.log("### AuctionPage.RENDER");
        console.log("### AuctionStore.getPlaceABidResult = ");
        console.log(result);
        if (result.isPlacedABid) {
          toastr.success('Your bid was added!');
        } else if (result.error) {
          toastr.error(result.error);
        }
        return (
            <div>
                <h1>Auctions</h1>
                <AuctionList auctions={this.state.auctions} />
            </div>
        );
    }
});

module.exports = AuctionPage;
