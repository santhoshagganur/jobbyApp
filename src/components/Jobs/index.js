import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobCard from '../JobCard'
import EmploymentItem from '../EmploymentItem'

class Jobs extends Component {
  state = {
    recommendedJobs: [],
    employmentTypes: [],
    searchInput: '',
    salaryRange: 0,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const url = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({recommendedJobs: updatedData})
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {recommendedJobs} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-bottom-container">
          <div className="user-decision-container">
            <UserProfile />
            <hr className="horizontal-line" />
            <h1 className="employment-types-heading"> Type of Employment </h1>
            <EmploymentItem
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>
          <div className="recommended-jobs-container">
            <div className="input-container">
              <input
                type="search"
                className="user-input"
                placeholder="Search"
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobs-display-section">
              {recommendedJobs.map(each => (
                <JobCard key={each.id} jobDetails={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
