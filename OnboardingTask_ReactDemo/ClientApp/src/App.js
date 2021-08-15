import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout.jsx';
import { Home } from './components/Home.jsx';
import { Customer } from './components/Customer/Customer.jsx';
import './custom.css'
import { Product } from './components/Product/Products.jsx';
import { Store } from './components/Store/Store.jsx';
import {Sales} from './components/Sales/Sales.jsx'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout >
        
          <Route exact path='/' component={Home} />
          <Route path='/customer' component={Customer} />
          <Route path='/product' component={Product} />
          <Route path='/store' component={Store} />
          <Route path='/sales' component={Sales} />
      
        
      </Layout>
    );
  }
}
