import React from 'react';
import './Style.css';


class InvoiceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            kontrahents: [],
            button: 'Next',
            buttonText: 'Existing client',
            exitingButton: 'next-btn',
            nextButton: 'next-btn',
            step2: 'step',
            step3: 'step',
            block1: 'create-block',
            block2: 'create-block none',
            block3: 'create-block none',
            block22: 'create-block none',
            next: 0,
            action: 1,
            KontrahentID: 1,
            KontrahentIDRequest: 1,
            OrderID: '',
            Name: '',
            Surname: '',
            Phone: '',
            Nazwa: '',
            Country: '',
            City: '',
            Adress: '',
            District: '',
            Code: '',
            productID: 'Chips',
            productCount: '',
            productRequest: []
        }
        this.next1 = this.next1.bind(this);
        this.exitingClient = this.exitingClient.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }




    componentDidMount() {
        const url = "http://localhost:4000/produkts";
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ products: data })
                console.log(this.state.products)
            });
        const url1 = "http://localhost:4000/clients";
        fetch(url1)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ kontrahents: data })
                this.setState({ KontrahentID: data.length + 1 })
                console.log(this.state.kontrahents)
            });
    }




    exitingClient() {
        if (this.state.next === 0) {
            this.setState({
                button: 'One more',
                buttonText: 'Next step',
                step2: 'step active-step',
                block1: 'create-block none',
                block22: 'create-block',
                nextButton: 'next-btn none',
                next: 2,
                action: 2
            });
            console.log(this.state.next)
        } else {
            console.log(this.state.next)
            this.next2();
        }
    }



    next1() {
        console.log(this.state.next)
        if (this.state.next === 0) {
            this.setState({
                button: 'One more',
                exitingButton: 'none',
                step2: 'step active-step',
                block1: 'create-block none',
                block2: 'create-block',
                next: 1
            });
        } else {
            this.next2();
        }
    }




    next2() {
        console.log(this.state.next);
        if (this.state.next === 1) {
            this.setState({
                button: 'Finish',
                step3: 'step active-step',
                block2: 'create-block none',
                block3: 'create-block',
                next: 3
            });
        } else if (this.state.next === 2) {
            this.setState({
                button: 'Finish',
                step3: 'step active-step',
                block2: 'create-block none',
                block22: 'create-block none',
                block3: 'create-block',
                next: 3,
                action: 2
            });
            console.log(this.state.action)
        } else {
            this.sendRequest();
            // this.setState({
            //     button: 'Finish',
            //     step3: 'step active-step',
            //     block22: 'create-block none',
            //     block3: 'create-block'
            // });
        }
    }
    sendRequest() {
        console.log(this.state.action)
        if (this.state.action == 1) {
            const data = {
                action: this.state.action,
                Name: this.state.Name,
                Surname: this.state.Surname,
                Phone: this.state.Phone,
                Nazwa: this.state.Nazwa,
                Country: this.state.Country,
                City: this.state.City,
                Adress: this.state.Adress,
                District: this.state.District,
                Code: this.state.Code,
                productID: this.state.productID,
                productCount: this.state.productCount,
                productRequest: this.state.productRequest
            };

            fetch('http://localhost:4000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data == true) {
                        alert('Invoice was created!')
                        this.setState({
                            button: 'Next',
                            buttonText: 'Existing client',
                            exitingButton: 'next-btn',
                            nextButton: 'next-btn',
                            step2: 'step',
                            step3: 'step',
                            block1: 'create-block',
                            block2: 'create-block none',
                            block3: 'create-block none',
                            block22: 'create-block none',
                            next: 0,
                            action: 1,
                            KontrahentID: 1,
                            KontrahentIDRequest: 1,
                            OrderID: '',
                            Name: '',
                            Surname: '',
                            Phone: '',
                            Nazwa: '',
                            Country: '',
                            City: '',
                            Adress: '',
                            District: '',
                            Code: '',
                            productID: '1',
                            productCount: '',
                            productRequest: []
                        })
                        this.clearInputs()
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            const data = {
                action: this.state.action,
                KontrahentID: this.state.KontrahentIDRequest,
                productID: this.state.productID,
                productCount: this.state.productCount,
                productRequest: this.state.productRequest
            };
            fetch('http://localhost:4000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data == true) {
                        alert('Invoice was created!')
                        console.log('Success:', data);
                        this.setState({
                            button: 'Next',
                            buttonText: 'Existing client',
                            exitingButton: 'next-btn',
                            nextButton: 'next-btn',
                            step2: 'step',
                            step3: 'step',
                            block1: 'create-block',
                            block2: 'create-block none',
                            block3: 'create-block none',
                            block22: 'create-block none',
                            next: 0,
                            action: 1,
                            KontrahentID: 1,
                            KontrahentIDRequest: 1,
                            OrderID: '',
                            Name: '',
                            Surname: '',
                            Phone: '',
                            Nazwa: '',
                            Country: '',
                            City: '',
                            Adress: '',
                            District: '',
                            Code: '',
                            productID: '1',
                            productCount: '',
                            productRequest: []
                        })
                        this.clearInputs()
                        window.location.reload();
                    }
                })

                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value);
        event.target.setAttribute('value', value);
        this.setState({
            [name]: value
        });
    }

    handleClick() {
        console.log("Fruit product!!");
        let a = this.state.productID;
        let b = this.state.productCount;
        let result = {
            id: a,
            count: b
        }
        var joined = this.state.productRequest.concat(result);
        this.setState({ productRequest: joined })
        console.log(joined);
        console.log(this.state.productRequest);
    }

    handleChange(e) {
        console.log(e.target.value);
        console.log("Product Selected!!");
        this.setState({ productID: e.target.value });
    }

    handleChange1(e) {
        console.log(e.target.value);
        console.log("Kontrahent Selected!!");
        this.setState({ KontrahentIDRequest: e.target.value });
    }
    clearInputs() {
        document.querySelectorAll('input').forEach((elem) => {
            elem.setAttribute('value', '');
        })
        document.querySelectorAll('select').forEach((elem) => {
            elem.setAttribute('value', '');
        })
    }
    deleteItem(e) {
        let array = this.state.productRequest;
        let id = e.target.getAttribute('data-id');
        array.splice(+id - 1, 1);
        this.setState({ productRequest: array })
    }

    render() {
        let c = 0;
        const { products, kontrahents, productRequest } = this.state;
        return (
            <div className="main-block invoice-create">
                <div className="steps">
                    <div className="step active-step"><span>1</span></div>
                    <div className={this.state.step2}><span>2</span></div>
                    <div className={this.state.step3}><span>3</span></div>
                </div>
                <div className="main-legend">Create <span className="red">invoice</span> </div>
                <div id='create-1' className={this.state.block1}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="Name" onChange={this.handleInputChange} />
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" name="Surname" onChange={this.handleInputChange} />
                    <label htmlFor="phone">Phone number:</label>
                    <input type="text" name="Phone" onChange={this.handleInputChange} />
                    <label htmlFor="nazwa">Name of firm:</label>
                    <input type="text" name="Nazwa" onChange={this.handleInputChange} />
                </div>
                <div id='create-2' className={this.state.block2}>
                    <label htmlFor="country">Country:</label>
                    <input type="text" name="Country" onChange={this.handleInputChange} />
                    <label htmlFor="city">City:</label>
                    <input type="text" name="City" onChange={this.handleInputChange} />
                    <label htmlFor="adress">Adress:</label>
                    <input type="text" name="Adress" onChange={this.handleInputChange} />
                    <label htmlFor="district">District:</label>
                    <input type="text" name="District" onChange={this.handleInputChange} />
                    <label htmlFor="code">Postal code:</label>
                    <input type="text" name="Code" onChange={this.handleInputChange} />
                </div>
                <div id='create-22' className={this.state.block22}>
                    <label htmlFor="kontrahent">Choose the kontrahent:</label>
                    <select name="KontrahentID" id="produkt-list" onChange={this.handleChange1}>
                        {kontrahents.map(elem => {
                            return (
                                <option value={elem.KontrahentID} key={elem.KontrahentID}>ID: {elem.KontrahentID} {elem.Imie} {elem.Nazwisko}</option>
                            )
                        })}
                    </select>
                </div>
                <div id='create-3' className={this.state.block3}>
                    <label htmlFor="produkt">Choose the product:</label>
                    <select name="productID" id="produkt-list" onChange={this.handleChange}>
                        {products.map(elem => {
                            return (
                                <option value={elem.ProduktID} key={elem.ProduktID}>{elem.Nazwa}</option>
                            )
                        })}
                    </select>
                    <label className="label-count" htmlFor="count">Count of products:</label>
                    <div className="count-items">
                        <input type="number" onChange={this.handleInputChange} className="count" name='productCount' />
                        <button className="add-btn" onClick={this.handleClick}>Add product</button>
                    </div>
                    <div className="orders">
                        <ul className="products-list">
                            {productRequest.map((elem) => {
                                c++;
                                return (
                                    <li>
                                        <span>ID: {elem.id}</span>
                                        <span>Count: {elem.count}</span>
                                        <span data-id={c} onClick={this.deleteItem}>&#10060;</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="block-btn">
                    <button type="submit" className={this.state.exitingButton} onClick={this.exitingClient
                    }>{this.state.buttonText}</button>
                    <button type="submit" className={this.state.nextButton} onClick={this.next1}>{this.state.button}</button>
                </div>
            </div>
        )
    }
}

export default InvoiceCreate;