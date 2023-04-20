import './index.css'
import Header from '../Header'
import UserProfile from '../UserProfile'
import EmploymentItem from '../EmploymentItem'

const Jobs = props => {
  const {employmentTypesList, salaryRangesList} = props

  return (
    <div className="jobs-bg-container">
      <Header />
      <div className="jobs-bottom-container">
        <div className="user-decision-container">
          <UserProfile />
          <hr className="horizontal-line" />
          <h1 className="employment-types-heading"> Type of Employment </h1>
          <ul className="employment-decision-container">
            {employmentTypesList.map(each => (
              <EmploymentItem
                employmentDetails={each}
                key={each.employmentTypeId}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Jobs
