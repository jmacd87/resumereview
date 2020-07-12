import React from 'react';
import './header.scss'
import { Link, NavLink } from 'react-router-dom';
import SideBar from "./Sidebar";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false };

  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    return (

      <header className='header'>
        {isAuthenticated ? <NavLink to="/profile">
          <div className='welcome'>
            <img className='avatarIcon' src="https://i.ibb.co/2g2zJRS/profileavatar.png" alt="profileavatar" border="0" />
          </div></NavLink> : <div style={{ width: 30 }} />}
        <div className="businessName">
          <Link className="businessName" to='/'><h1>RESUME REVIEW</h1></Link>
        </div>
        <div className="icon">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Header)
