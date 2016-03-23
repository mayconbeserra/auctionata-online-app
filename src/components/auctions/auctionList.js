"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuctionActions = require('../../actions/auctionActions');
var toastr = require('toastr');

var AuctionList = React.createClass({

    propTypes: {
        auctions: React.PropTypes.array.isRequired
    },

    placeABid: function(id, event) {
        console.log('Call the Action');
        event.preventDefault();
        //AuctionActions.placeABid(id);
        toastr.success('Auction Deleted');
    },

    render: function() {

        var createAuctionRow = function(auction) {
            return (
                <tr key={auction.id}>
                    <td><Link to="placeABid" params={{id: auction.id}}>Place a bid</Link></td>
                    <td>{auction.id}</td>
                    <td>{auction.item.name}</td>
                    <td>{auction.item.initialPrice}</td>
                    <td>{auction.highestBid}</td>
                    <td>{auction.highestBidderName}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th>Auction Identification</th>
                        <th>Item</th>
                        <th>Initial Price</th>
                        <th>Highest bid</th>
                        <th>Highest bidder</th>
                    </thead>
                    <tbody>
                        {this.props.auctions.map(createAuctionRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuctionList;
