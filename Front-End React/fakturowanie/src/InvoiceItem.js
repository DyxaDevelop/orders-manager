import React from 'react';
import './Style.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Invoice from './Invoice.js';
import InvoiceCreate from './InvoiceCreate';

class InvoiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    render() {
        let url = '/invoice/';
        return (
            <Link to={url + this.props.KontrahentID + '/' + this.props.OrderID} >
                <div className="invoice-block" key={this.props.b}>
                    <p>Invoice #{this.props.b}</p>
                    <div className="elements-group">
                        <div className="invoice-info">
                            <div className="name-surname info-in">Buyer ID: {this.props.KontrahentID}</div>
                            <div className="buyer-id info-in">Order status: {this.props.Status}</div>
                            <div className="order-id info-in">Order ID: {this.props.OrderID}</div>
                        </div>
                        <button className="show-invoice">Show</button>
                    </div>
                </div>
            </Link >
        )
    }
}

export default InvoiceItem;