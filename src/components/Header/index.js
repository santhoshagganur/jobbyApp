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
        <link to="/">
          <p className="app-item-lg">Home </p>
        </link>

        <link>
          <p className="app-item-lg"> Jobs </p>
        </link>
      </div>

      <div className="app-items-sm">
        <AiFillHome className="app-item-sm" />
        <BsBriefcaseFill className="app-item-sm" />
        <FiLogOut className="app-item-sm" />
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
