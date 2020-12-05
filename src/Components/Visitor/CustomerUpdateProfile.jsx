import React, { Component } from 'react';
import axios from "axios";



class CustomerUpdateProfile extends Component {
    state = { 
        activeProfile: {
            id: "",
            name: "",
            lastName: "",
            profilePic: null
        },
        profilePicTypeAllowed: true
     }
    componentDidMount(){
        this.updatestate()
    }
    updatestate = () =>{
         this.props.fetchCustomers()
         this.setState({
            activeProfile: {
                id: this.props.state.activeCustomer.customer_id,
                firstName: this.props.activeUser.first_name,
                lastName: this.props.activeUser.last_name,
                profilePic: this.props.state.activeCustomer.profile_pic
            }
         })
    }

    /* cookie for csrftoken */
    getCookie = (name) =>{
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }

    handleSubmittedPicture = (e) =>{
        e.preventDefault()

        const picture = e.target.elements.profile_picture.files[0]
        const id = this.props.activeUser.id
        var csrfToken = this.getCookie('csrftoken')
        let data = new FormData()
        var url =`http://50.116.29.247/update/customer/${id}/profile/`

        if(picture.type.split("/")[1] === "jpeg" || picture.type.split("/")[1] === "png"){

            data.append("id", this.props.activeUser.id)
            data.append("profile_pic", picture, picture.name)

            axios.put(url, data, {
                headers: {
                    "content-type": "multipart/form-data",
                    "X-CSRFToken": csrfToken
                }
            }).then(response => this.props.fetchCustomers())

            e.target.elements.profile_picture.value=""
        }
        else{
            this.setState({profilePicTypeAllowed: false})
        }
    }
    handlePictureChange = () =>{
        this.setState({profilePicTypeAllowed: true})
    }
    render() { 
        const fullName = this.state.activeProfile.firstName + " " + this.state.activeProfile.lastName
        const image = "http://50.116.29.247" + this.props.state.activeCustomer.profile_pic
        return ( 
            <div className="customer-update-profile">
                <div className="customer-current-profile">
                    <div className="current-profile-image">
                        <img src={image} alt="profile"/>
                    </div>
                    <p>{fullName}</p>
                </div>
                <form onSubmit={this.handleSubmittedPicture}>
                    <p>You can change profile picture here</p>
                    <input type="file" name="profile_picture" accept="image/*" required onChange={() => this.handlePictureChange()}/><br/>
                    {this.state.profilePicTypeAllowed === false && 
                        <span style={{color: "red"}}>allowed pictures type are: jpg, jpeg and png</span>
                    }
                    <br/>
                    <button>update profile</button>
                </form>
            </div>
         );
    }
}
 
export default CustomerUpdateProfile;