import React from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount = async () => {
        await axios.get('/api/account/logout');
    }

    render() {
        return <AuthContext.Consumer>
            {value => {
                value.logout();
                return <Redirect to='/login' />
            }}
        </AuthContext.Consumer>
    }

}

export default Logout;