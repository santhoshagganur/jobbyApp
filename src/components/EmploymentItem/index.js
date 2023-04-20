import './index.css'

const EmploymentItem = props => {
  const {employmentDetails} = props
  const {label, employmentTypeId} = employmentDetails

  return (
    <li className="employment-details">
      <input type="checkbox" className="input-checkbox" id={employmentTypeId} />
      <label className="label-element" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentItem
