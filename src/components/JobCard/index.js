import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card-container">
        <div className="job-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title"> {title} </h1>
            <div className="rating-container">
              <AiFillStar className="rating-star" />
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
      </li>
    </Link>
  )
}

export default JobCard
