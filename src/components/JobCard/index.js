import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {companyLogoUrl, title, rating} = jobDetails

  return (
    <li className="job-card-container">
      <div className="job-title-container">
        <img src={companyLogoUrl} alt="company" className="company-logo" />
        <div>
          <h1 className="job-title"> {title} </h1>
        </div>
      </div>
    </li>
  )
}

export default JobCard
