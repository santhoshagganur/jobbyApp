import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-content">
        <h1 className="app-title"> Find The Job That Fits Your Life </h1>
        <p className="description">
          Millions of people are searching jobs, salary information, company
          reviews. <br />
          Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="find-jobs-btn">
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
