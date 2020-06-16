import React from 'react';
import { AuthContext } from './AuthContext';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <AuthContext.Consumer>
        {value => {
            const { user } = value;
            return <Route {...rest} render={(props) => (
                !!user ? <Component {...props} /> : <Redirect to='/login' />
            )} />
        }}
    </AuthContext.Consumer>

)

export default PrivateRoute;