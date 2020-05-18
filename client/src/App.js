import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import login from './components/login/login';
import register from './components/login/register';
import profile from './components/Profile';
import home from './components/Homepage'
import recipes from './components/Recipes'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Header from './components/Header'
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
            <Route path="/sign-in" component={login} />
            <Route path="/sign-up" component={register} />
            <Route path="/profile" component={profile} />
            <Route exact path="/" component={home} />
            <Route path="/search" component={home} />
            <Route path="/recipes" component={recipes} />
          </Router>
        </div>
      </Provider>
    )
  }
}


export default App
