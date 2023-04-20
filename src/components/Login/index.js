import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showError: true})
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-content-container">
          <div className="app-info-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <form className="form-container" onSubmit={this.getDetails}>
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="input-box"
              onChange={this.changeUsername}
              value={username}
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input-box"
              onChange={this.changePassword}
              value={password}
            />
            <button type="submit" className="submit-button">
              Login
            </button>
            {showError && <p className="error-msg"> {errorMsg} </p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
