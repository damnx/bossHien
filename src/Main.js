import React from 'react'
import { Switch, Route,Redirect } from 'react-router-dom';
import ListProduct from './ListProduct';
import Detail from './Detail';
import Cart from './Cart';
// import Roster from './Roster'
// import Schedule from './Schedule'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ListProduct} />
      <Route path='/product/:product_id/detail' component={Detail} />
      <Route path='/cart' component={Cart} />
      <Redirect from="/" to="/" />
    </Switch>
  </main>
)

export default Main
