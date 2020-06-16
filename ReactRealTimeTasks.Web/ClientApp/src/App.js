import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './Pages/Home';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';

export default class App extends Component {

  render() {
    return (
      <AuthContextComponent>
        <Layout>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <PrivateRoute exact path='/' component={Home} />
        </Layout>
      </AuthContextComponent>
    );
  }
}
