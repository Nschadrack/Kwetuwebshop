import React, { Component } from 'react';
import axios from "axios";

class RestPasswordForm extends Component {
    state = { 
        password: "",
        passwordTwo: "",
        passwordsNotEqual: false
     }

    handlePasswordChange = (e) =>{
        this.setState({password: e.target.value})
    }
    handlePasswordTwoChange = (e) =>{
        this.setState({passwordTwo: e.target.value})
        if(this.state.password !== e.target.value){
            this.setState({passwordsNotEqual: true})
        }
        else{
            this.setState({passwordsNotEqual: false})
        }
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
    handleSubmittedPasswords = (e) =>{
        e.preventDefault()
        var csrfToken = this.getCookie('csrftoken')
        const data = JSON.stringify(this.state.password)
        var url = `http://50.116.29.247/user/resetting-password/${this.props.location.state.detail}/`

        axios.post(url, data, {
            headers:{
                "content-type": "application/json",
                "X-CSRFToken": csrfToken
            }
        }).then(response =>{
            if(response.data.erros){
                alert(response.data.erros)
            }
            else{
                this.props.history.push("/login-register")
            }
        })
    }
    render() { 
        return ( 
            <div className="forgotpassword-page">
                <h4>Resetting password for {this.props.location.state.detail}</h4>
                <form onSubmit={this.handleSubmittedPasswords}>
                    <input type="password" placeholder="Type your new password" required onChange={this.handlePasswordChange}/>
                    <input type="password" placeholder="Re-type your new password" required onChange={this.handlePasswordTwoChange}/>
                    {this.state.passwordsNotEqual === true &&
                        <React.Fragment>
                            <span style={{color:"red", fontSize:"11px"}}>password fields must match!</span><br/>
                        </React.Fragment>
                    }
                    {this.state.passwordsNotEqual === false &&
                        <button style={{marginTop: "10px"}}>Rest Password</button>
                    }
                </form>
            </div>
         );
    }
}
 
export default RestPasswordForm;