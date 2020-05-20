import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './login.scss'
import { Spring } from 'react-spring/renderprops'
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import PropTypes from 'prop-types'

class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            hasAgreed: false,
            msg: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props

        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        if (isAuthenticated) {
            this.props.history.push('/profile')
        }
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user)
        this.props.register(user)
        // axios.post('http://localhost:5000/users/add', user)
        //     .then(res => { console.log(res.data) })

        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            hasAgreed: false
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

                            {/* <div className="FormTitle">
                             <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                         </div> */}
                            <div className="FormCenter" style={props}>
                                <div className="FormTitle">
                                    <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                                </div>
                                {this.state.msg ? <div className='Error__Message'>Error: {this.state.msg}</div> : null}
                                <form onSubmit={this.handleSubmit} className="FormFields">
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="first_name">First Name</label>
                                        <input type="text" id="first_name" className="FormField__Input" placeholder="Enter your first name" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                                    </div>
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="last_name">Last Name</label>
                                        <input type="text" id="last_name" className="FormField__Input" placeholder="Enter your last name" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                                    </div>
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="password">Password</label>
                                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    <div className="FormField">
                                        <label className="FormField__CheckboxLabel">
                                            <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="/" className="FormField__TermsLink">terms of service</a>
                                        </label>
                                    </div>

                                    <div className="FormField">
                                        <button className="FormField__Button mr-20">Sign Up</button>
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
    { register }
)(Register)