"use strict";

var React = require('react');
var Router = require('react-router');
var AuctionForm = require('./auctionForm');
var AuctionActions = require('../../actions/auctionActions');
var AuctionStore = require('../../stores/auctionStore');
var BuyerStore = require('../../stores/buyerStore');
var Promise = require('promise');
var toastr = require('toastr');

var BidAuctionPage = React.createClass({

    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function() {
      return {
        auction: { id: '', itemid: '', bidValue: '' },
        buyers: BuyerStore.getAllBuyers(),
        dirty: false,
        errors: {}
      };
    },

    componentWillMount: function() {
        var auctionId = this.props.params.id; //from the path /auction:id
        if (auctionId) {
          this.setState({auction: AuctionStore.getAuctionById(auctionId)});
        }
    },

    componentWillUnmount: function() {
        debugger;
        console.log("### bidAuctionPage.ComponentWillUNmount");
        AuctionActions.resetBidAuction();
        console.log("### bidAuctionPage.ComponentWillUNmount (AuctionActions.resetBidAuction())");
    },

    setAuctionState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.auction[field] = value;
        return this.setState({auction: this.state.auction});
    },

    auctionFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {};

        if (!this.state.auction.buyerid) {
            this.state.errors.buyerid = 'A buyer must be selected';
            formIsValid = false;
        }

        if (!this.state.auction.newbidvalue) {
            this.state.errors.newbidvalue = "The value must be entered";
            formIsValid = false;
        }

        if (isNaN(this.state.auction.newbidvalue)) {
            this.state.errors.newbidvalue = "The value is not a number";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    onBuyerChanged: function(buyerId) {
      this.state.auction.buyerid = buyerId;
    },

    saveAuction: function(event) {
        event.preventDefault();

        if (!this.auctionFormIsValid()) {
          return;
        }

        console.log("### bidAuctionPage.SAVE AUCTION");
        AuctionActions.placeABid(this.state.auction);

        this.setState({dirty: false});
        this.transitionTo('auctions');
    },

    render: function() {
        return (
            <AuctionForm
                auction={this.state.auction}
                buyers={this.state.buyers}
                onChange={this.setAuctionState}
                onSave={this.saveAuction}
                onBuyerChanged={this.onBuyerChanged}
                errors={this.state.errors}
            />
        );
    }
});

module.exports = BidAuctionPage;
