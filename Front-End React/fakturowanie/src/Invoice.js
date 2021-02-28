import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";



class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyer: [],
            produkts: [],
            order: [],
            produktsInfo: [],
            wartosc: 0

        }
    }
    componentDidMount() {
        let order = this.props.match.params.order
        let buyer = this.props.match.params.buyer
        console.log(buyer);
        console.log(order);
        const url = `http://localhost:4000/info/buyer?buyer=${buyer}`;
        const url2 = `http://localhost:4000/info/produkts?order=${order}`;
        const url3 = `http://localhost:4000/info/order?order=${order}`;
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            this.setState({ buyer: data[0] });
        };
        fetchData();
        const fetchData2 = async () => {
            const response = await fetch(url2);
            const data = await response.json();
            this.setState({ produkts: data[0] });
        };
        fetchData2();
        const fetchData3 = async () => {
            const response = await fetch(url3);
            const data = await response.json();
            this.setState({ order: data });
        };
        fetchData3();
    }

    render() {
        const { buyer, produkts, order } = this.state;
        console.log(buyer);
        console.log(produkts);
        console.log(order);
        let wartosc1 = 0;
        let wartosc2 = 0;
        // if (order.length)
        //     return null;
        return (
            <div>
                <div className="first-block">
                    <div className="logo">
                        <img src="https://www.designevo.com/res/templates/thumb_small/overlapping-red-and-blue-circle.png" alt="" />
                    </div>
                    <div class="faktura-info">
                        <h1>FAKTURA nr {produkts.OrderID}</h1>
                        <div class="dates">
                            <div>
                                <p>Data zamowienia: </p>
                                <p> &nbsp; {produkts.DataZamowienia}</p>
                            </div>
                            <div>
                                <p>Status: </p>
                                <p> &nbsp; {produkts.Status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="second-block">
                    <div className="seller">
                        <h1>SELLER</h1>
                        <h5></h5>
                        <p>Rzeszow, Okulickiego 11</p>
                        <p>Polska</p>
                        <p>35-222</p>
                        <p>example.email@gmail.com</p>
                        <p>01 2345 6789 1011 1213 1415</p>
                    </div>
                    <div className="buyer">
                        <h1>BUYER</h1>
                        <h5>{buyer.Imie} {buyer.Nazwisko}</h5>
                        <p>{buyer.Adresa} {buyer.Miasto}</p>
                        <p>{buyer.Kraj}</p>
                        <p>{buyer.Powiat}</p>
                        <p>{buyer.KodPocztowy}</p>
                        <p>{buyer.Telefon}</p>
                    </div>
                </div>
                <div className="items-table">
                    <table style={{ width: '100%' }}>
                        <tr>
                            <th>Nazwa</th>
                            <th>Ilosc</th>
                            <th>Cena netto</th>
                            <th>Wartosc netto</th>
                            <th>Stawka VAT</th>
                            <th>Kwota VAT</th>
                            <th>Wartosc brutto</th>
                        </tr>
                        {order.map((elem) => {
                            wartosc1 += +(elem.Ilosc * elem.CenaNetto).toFixed(2);
                            wartosc2 += +((elem.Ilosc * elem.CenaNetto) - (elem.KwotaVAT * elem.Ilosc)).toFixed(2)

                            return (
                                <tr key={elem.ProduktID}>
                                    <td>{elem.Nazwa} </td>
                                    <td>{elem.Ilosc}  </td>
                                    <td>{elem.CenaNetto} zl</td>
                                    <td>{(elem.Ilosc * elem.CenaNetto).toFixed(2)} zl</td>
                                    <td>{elem.StawkaVAT} %</td>
                                    <td>{elem.KwotaVAT} zl</td>
                                    <td>{((elem.Ilosc * elem.CenaNetto) - (elem.KwotaVAT * elem.Ilosc)).toFixed(2)} zl</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className="wart">
                    <div className="wartosc">Wartosc netto: {wartosc1}  zl</div>
                    <div className="wartosc">Wartosc brutto: {wartosc2} zl</div>
                </div>
            </div >

        );
    }
}
// class Invoice extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//     }
//     render() {
//         return (
//         )
//     }
// }

export default Invoice;