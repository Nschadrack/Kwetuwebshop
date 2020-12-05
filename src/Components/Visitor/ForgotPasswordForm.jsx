import React, { Component } from 'react';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";


class ForgotPasswordForm extends Component {
    state = { 
        username: "",
        emailNotFound: false
     }
     handleEmailChange = (e)=>{
         this.setState({username: e.target.value})
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
    
     handleSubmittedEmail = (e) =>{
        e.preventDefault()
        var csrfToken = this.getCookie('csrftoken')
        const data = JSON.stringify(this.state.username)
        var url = "http://50.116.29.247/user/check-username/"

        axios.post(url, data, {
            headers:{
                "content-type": "application/json",
                "X-CSRFToken": csrfToken
            }
        }).then(response =>{
            if(response.data.erros){
                this.setState({emailNotFound: true})
            }
            else{
                this.props.history.push({
                    pathname: "/confirming-new/password",
                    state: {detail: response.data.username}
                })
            }
        })
     }
    render() { 
        return ( 
            <div className="forgotpassword-page">
                {this.state.emailNotFound === true ?
                    <p><FontAwesomeIcon icon={faInfoCircle} size="2x"/> It seems like there is no account for this email address <span style={{fontWeight: "bold"}}>{this.state.username}</span>
                    <br/>If you are not sure whether you have an account, get new account here 
                    <Link to={"/login-register"}  {...this.props} style={{color: "black", marginLeft: "5px"}}>create new account</Link> </p>
                :
                    <React.Fragment>
                        <h5>Enter your valid account email address you have used when signing up for an account</h5>
                        <form onSubmit={this.handleSubmittedEmail}>
                            <input type="email" placeholder="enter your valid account email address" required onChange={this.handleEmailChange}/>
                            <button style={{marginTop: "20px"}}>Send</button>
                        </form>
                    </React.Fragment>
                }
            </div>
         );
    }
}
 
export default ForgotPasswordForm;