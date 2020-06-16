import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import produce from 'immer';
import { AuthContext } from '../AuthContext';

class Login extends React.Component {
    state = {
        user: {
            email: '',
            password: ''
        },
        isValidLogin: true
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.user[e.target.name] = e.target.value;
        });

        this.setState(nextState);
    }

    onFormSubmit = async (e, setUser) => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', this.state.user);
        const isValidLogin = !!data;
        this.setState({ isValidLogin });
        setUser(data);
        this.props.history.push('/');
    }

    render() {
        return (
            <AuthContext.Consumer>
                {value => {
                    const { setUser } = value;
                    return (
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 well">
                                <h3>Log in to your account</h3>
                                {!this.state.isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                                <form onSubmit={e => this.onFormSubmit(e, setUser)}>
                                    <input onChange={this.onTextChange} value={this.state.user.email} type="text" name="email" placeholder="Email" className="form-control" />
                                    <br />
                                    <input onChange={this.onTextChange} value={this.state.user.password} type="password" name="password" placeholder="Password" className="form-control" />
                                    <br />
                                    <button className="btn btn-primary">Login</button>
                                </form>
                                <Link to="/signup">Sign up for a new account</Link>
                            </div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>

        );
    }
}

export default Login;