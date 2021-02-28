
import React from 'react';
import './Style.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import InvoiceCreate from './InvoiceCreate.js';
import ListOfInvoices from './ListOfInvoices.js';
import BlockLegend from './BlockLegend.js';
import ListElement from './ListElement.js';
import InvoiceItem from './InvoiceItem.js';
import Invoice from './Invoice.js'


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    render() {
        return (
            <div className="App">
                <InvoiceCreate />
                <ListOfInvoices />
            </div >
        )
    }
}


export default MainPage;
