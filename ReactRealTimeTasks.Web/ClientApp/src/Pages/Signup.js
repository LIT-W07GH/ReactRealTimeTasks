import React from 'react';
import axios from 'axios';
import produce from 'immer';

class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        });

        this.setState(nextState);
    }

    onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/account/signup', this.state);
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3 well">
                    <h3>Sign up for a new account</h3>
                    <form onSubmit={this.onFormSubmit}>
                        <input onChange={this.onTextChange} type="text" name="firstName" placeholder="First Name" className="form-control" />
                        <br />
                        <input onChange={this.onTextChange} type="text" name="lastName" placeholder="Last Name" className="form-control" />
                        <br />
                        <input onChange={this.onTextChange} type="text" name="email" placeholder="Email" className="form-control" />
                        <br />
                        <input onChange={this.onTextChange} type="password" name="password" placeholder="Password" className="form-control" />
                        <br />
                        <button className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;