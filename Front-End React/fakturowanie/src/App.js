
import React from 'react';
import './Style.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import InvoiceCreate from './InvoiceCreate.js';
import ListOfInvoices from './ListOfInvoices.js';
import BlockLegend from './BlockLegend.js';
import ListElement from './ListElement.js';
import MainPage from './MainPage.js';
import Invoice from './Invoice.js';
import UserInvoices from './UserInvoices.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  render() {
    return (
      <div >
        <Router>
          <Switch>
            <Route exact path='/'>
              <MainPage />
            </Route>
            <Route exact path="/invoice/:buyer/:order" component={Invoice} />
            <Route exact path="/invoice/:buyer/" component={UserInvoices} />
          </Switch>
        </Router>
      </div >
    )
  }
}


export default App;
