import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './header.scss'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getRecipes } from '../actions/recipeActions'

class Header extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        if (user) {
            console.log('header user', user)
            // const id = user._id
            // this.props.getRecipes(user)
        }
        return (
            <div className='header'>
                {isAuthenticated ?
                    <NavLink to="/profile">
                        <div className='welcome'>
                            <img className='avatarIcon' src="https://i.ibb.co/2g2zJRS/profileavatar.png" alt="profileavatar" border="0" />
                        </div></NavLink> : null}
                <div className="logo">
                    <Link id='spin' to='/#'>3 </Link>
                </div>

                <div className='title'>Recipes</div>

                <div className='headerTabs'>
                    <div className='headerLinks'>
                        <div className='hoverStyle'>
                            {isAuthenticated ? <NavLink activeClassName="active" to="/profile">Profile</NavLink> : <NavLink activeClassName="active" to="/sign-in">Account</NavLink>}

                            <NavLink activeClassName="active" to="/search">Search</NavLink>
                            <NavLink activeClassName="active" to="/recipes">Recipes</NavLink>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getRecipes })(Header)