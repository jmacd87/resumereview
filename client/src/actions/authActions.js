import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types'

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING })

    //fetch User
    axios.get('/users/token', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            console.log('error', err)
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })

}
//Register User
export const register = ({ first_name, last_name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({ first_name, last_name, email, password })

    axios.post('/users/add', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: 'REGISTER_FAIL'
            })
        })
}

//setup config/header and token
export const tokenConfig = getState => {
    //Get token from localStorage
    const token = getState().auth.token

    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    //If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token
    }

    return config
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }

}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({ email, password })

    axios.post('/users/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
    loadUser()
}
