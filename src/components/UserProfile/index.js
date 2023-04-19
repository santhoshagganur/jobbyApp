import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class UserProfile extends Component {
  state = {userDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({userDetails: updatedData})
  }

  render() {
    const {userDetails} = this.state
    const {profileImageUrl, name, shortBio} = userDetails

    return (
      <div className="user-details-card">
        <img src={profileImageUrl} alt="profile" className="user-pic" />
        <h1 className="user-name"> {name} </h1>
        <p className="user-info"> {shortBio} </p>
      </div>
    )
  }
}

export default UserProfile
