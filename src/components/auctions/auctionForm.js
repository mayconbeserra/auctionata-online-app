"use strict";

var React = require('react');
var Input = require('../common/textInput');
var DropDown = require('../common/dropDown');

var AuctionForm = React.createClass({

    propTypes: {
        auction: React.PropTypes.object.isRequired,
        buyers: React.PropTypes.array.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onBuyerChanged: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function() {
        return (
            <form>
                <h1>Place a Bid</h1>
                <Input
                      name="Id"
                      label="Auction ID"
                      readOnly
                      value={this.props.auction.id} />
                <Input
                      name="Item"
                      label="Item"
                      readOnly
                      value={this.props.auction.item.name} />
                <DropDown
                      label="Buyer"
                      options={this.props.buyers}
                      field="name"
                      dropDownValueChanged={this.props.onBuyerChanged}
                      error={this.props.errors.buyerid} />
                <Input
                      name="InitialPrice"
                      label="Initial Price"
                      readOnly
                      value={this.props.auction.item.initialPrice} />
                <Input
                      name="Highestbid"
                      label="Highest Bid"
                      readOnly
                      value={this.props.auction.highestBid} />
                <Input
                      name="newbidvalue"
                      label="Put there your new bid"
                      value={this.props.auction.newbidvalue}
                      onChange={this.props.onChange}
                      error={this.props.errors.newbidvalue} />
                <input type="submit" value="save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = AuctionForm;
