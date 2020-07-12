import React from 'react'
import './profile.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import { logout, loadUser } from '../../actions/authActions'
import { Spring } from 'react-spring/renderprops'
import Upload from './upload'

class Profile extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.props.loadUser()
    }
    render() {
        const { user } = this.props.auth
        let dateString
        if (user) {
            const date = user.created
            dateString = moment(date).format("MMMM YYYY")
        }
        return (<Spring
            from={{ opacity: 0, marginTop: 1500 }}
            to={{ opacity: 1, marginTop: 0 }}
        >
            {props =>
                <div className='container' style={props}>
                    {user ?
                        <div className='profile'>
                            <div className='profileImage'>
                                <a href="https://imgbb.com/"><img src="https://i.ibb.co/2g2zJRS/profileavatar.png" alt="profileavatar" border="0" /></a>
                            </div>
                            <div className='profileCard'>
                                <h3 className='profileHeader'>Name: </h3>
                                <span className='profileInfo'>{user.first_name} {user.last_name}</span>
                                <h3 className='profileHeader'>Email:</h3>
                                <span className='profileInfo'>{user.email}</span>
                                <h3 className='profileHeader'>User since:</h3>
                                <span className='profileInfo'>{dateString}</span>
                                <Upload />
                            </div>
                            <button className='logout-button' onClick={this.props.logout}>Logout</button>

                        </div>
                        : this.props.history.push('/')}

                </div>
            }
        </Spring>


        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout, loadUser })(Profile)