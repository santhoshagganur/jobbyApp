import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    companyData: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItem()
  }

  getCompanyData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
  })

  getJobItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedCompanyData = this.getCompanyData(data.job_details)
      const similarJobsData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        companyData: updatedCompanyData,
        similarJobs: similarJobsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {companyData, similarJobs} = this.state
    const {
      companyLogoUrl,
      location,
      rating,
      jobDescription,
      packagePerAnnum,
      title,
      employmentType,
    } = companyData

    return (
      <div className="job-details-bottom-container">
        <div className="job-item-details">
          <div className="company-information">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div>
              <h1 className="job-title"> {title} </h1>
              <div className="company-information">
                <AiFillStar className="star-icon" />
                <p className="rating"> {rating} </p>
              </div>
            </div>
          </div>

          <div className="job-location-details">
            <div className="job-location">
              <div className="location">
                <GoLocation className="location-img" />
                <p className="job-content"> {location} </p>
              </div>
              <div className="location">
                <BsBriefcaseFill className="location-img" />
                <p className="job-content"> {employmentType} </p>
              </div>
            </div>

            <p className="salary"> {packagePerAnnum} </p>
          </div>

          <hr className="jobs-card-horizontal-line" />
          <h1 className="description"> Description </h1>
          <p className="job-description"> {jobDescription} </p>
        </div>
      </div>
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
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
