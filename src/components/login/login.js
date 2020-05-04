import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './login.scss'
import { Spring } from 'react-spring/renderprops'
import { login } from '../../actions/authActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            msg: null
        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        if (isAuthenticated) {
            this.props.history.push('/profile')
        }
    }
    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state

        const user = {
            email,
            password
        }
        console.log(user)
        this.props.login(user)
        this.setState({
            email: '',
            password: ''
        })
    }

    render() {


        return (
            <Spring
                from={{ opacity: 0, marginTop: -200 }}
                to={{ opacity: 1, marginTop: 0 }}
            >
                {props =>
                    <div className="AuthForm">
                        <div className="App__Aside"></div>
                        <div className="App__Form">
                            <div className="PageSwitcher">
                                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                                <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                            </div>
                            <div className="FormCenter" style={props}>
                                <div className="FormTitle">
                                    <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
                                </div>
                                <form onSubmit={this.handleSubmit} className="FormFields">
                                    {this.state.msg ? <div className='Error__Message'>Error: {this.state.msg}</div> : null}
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>

                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="password">Password</label>
                                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>

                                    <div className="FormField">
                                        <button className="FormField__Button mr-20">Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </Spring>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(
    mapStateToProps,
    { login }
)(Login)