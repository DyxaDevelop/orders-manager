import React from 'react';
import './Style.css';
import InvoiceCreate from './InvoiceCreate.js';
import BlockLegend from './BlockLegend.js';
import ListElement from './ListElement.js';
import InvoiceItem from './InvoiceItem.js';
import Invoice from './Invoice.js'


class ListOfInvoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    render() {
        return (
            <div className="main-block invoices-list">
                <BlockLegend />
                <ListElement />
            </div >
        )
    }
}

export default ListOfInvoices;