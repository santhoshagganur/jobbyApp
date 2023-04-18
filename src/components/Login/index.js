import './index.css'
import {Component} from 'react'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  getDetails = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  changeUsername = event => {
    this.setState({userName: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {userName, password, errorMsg} = this.state

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
              value={userName}
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
            <p className="error-msg"> {errorMsg} </p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
