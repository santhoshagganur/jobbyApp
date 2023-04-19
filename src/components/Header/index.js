import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="app-logo"
        />
      </Link>

      <div className="app-items-lg">
        <Link className="app-item-lg" to="/">
          Home
        </Link>

        <Link className="app-item-lg" to="/jobs">
          Jobs
        </Link>
      </div>

      <div className="app-items-sm">
        <Link to="/">
          <AiFillHome className="app-item-sm" />
        </Link>
        <Link to="/jobs">
          <BsBriefcaseFill className="app-item-sm" />
        </Link>
        <FiLogOut className="app-item-sm" onClick={onLogout} />
      </div>

      <div className="logout">
        <button type="button" className="log-out-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
