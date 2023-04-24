import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobCard from '../JobCard'
import EmploymentItem from '../EmploymentItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    recommendedJobs: [],
    employmentTypes: [],
    searchInput: '',
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  changeEmploymentType = typeEmployement => {
    const {employmentTypes} = this.state
    const newEmployment = [...employmentTypes, typeEmployement]
    this.setState({employmentTypes: newEmployment}, this.getJobs)
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobs)
  }

  changeSearchResults = event => {
    this.setState({searchInput: event.target.value}, this.getJobs)
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypes, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
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

      this.setState({
        recommendedJobs: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {recommendedJobs} = this.state

    return (
      <ul className="jobs-display-section">
        {recommendedJobs.map(each => (
          <JobCard key={each.id} jobDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-content"> Oops! Something Went Wrong </h1>
      <p className="failure-reason">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
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
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="recommended-jobs-container">
            <div className="input-container">
              <input
                type="search"
                className="user-input"
                placeholder="Search"
                onChange={this.changeSearchResults}
              />
              <button type="button" className="search-button">
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
