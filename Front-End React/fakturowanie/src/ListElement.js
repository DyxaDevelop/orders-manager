import React from 'react';
import './Style.css';
// import InvoiceCreate from './InvoiceCreate.js';
// import BlockLegend from './BlockLegend.js';
import InvoiceItem from './InvoiceItem.js';
// import Invoice from './Invoice.js'


class ListElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        const url = "http://localhost:4000/all";
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ items: data })
                console.log(this.state.items)
            });
    }
    render() {
        const { items } = this.state;
        let b = 0;
        return (
            <div className='list-of-invoices'>
                {items.map((elem) => {
                    b++;
                    return (
                        <InvoiceItem KontrahentID={elem.KontrahentID} Status={elem.Status} OrderID={elem.OrderID} b={b} />
                    )
                })
                }
            </div>
        )
    }
}

export default ListElement;