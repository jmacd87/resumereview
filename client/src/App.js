import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import login from './components/login/login';
import register from './components/login/register';
import profile from './components/profile/Profile';
import home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Header from './components/header/Header'
import { loadUser } from './actions/authActions'

class App extends React.Component {
  async componentDidMount() {

    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Header />
            <Route path="/signin" component={login} />
            <Route path="/signup" component={register} />
            <Route path="/profile" component={profile} />
            <Route exact path="/" component={home} />
          </Router>
        </div>
      </Provider>
    )
  }
}


export default App
