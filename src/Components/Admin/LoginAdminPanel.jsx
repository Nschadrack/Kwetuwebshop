import React, {Component} from "react";
import axios from "axios"

class LoginAdminPanel extends Component {
    state = { 
        adminCredentials:{
            username: "",
            password: ""
        },
        badCredentials: false,
        countTrials: 0,
     }

     handlePasswordChangeField = (e) =>{
         this.setState({adminCredentials: {...this.state.adminCredentials, password: e.target.value}, badCredentials: false})
     }
     handleUsernameChangeField =(e) =>{
        this.setState({adminCredentials: {...this.state.adminCredentials, username: e.target.value}, badCredentials: false})
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

    
    handleSubmittedCredentials = (e) =>{
        e.preventDefault()
        var csrfToken = this.getCookie('csrftoken')
        var url ="http://50.116.29.247/users/specific_username/"
        const data = JSON.stringify(this.state.adminCredentials)

        axios.post(url, data, {
            headers:{
                "content-type": "application/json",
                "X-CSRFToken": csrfToken
            }
        }).then(response => {
            if(response.data.erros){
                this.setState({badCredentials: true, countTrials: this.state.countTrials +1})
            }
            else{
                this.props.updateActiveSuperuser(response.data)
                this.props.loginSuperUser()
                if(this.props.location.state !== undefined){
                    this.props.history.push(this.props.location.state.detail)
                }
                else{
                    this.props.history.push("/admin/kwetu-trade/panel")
                }
            }
        })    
    }
    render() { 
        return ( 
            <div className="admin-login-page">
                <div className="admin-login-page-elements">
                    <h2>Welcome To Kwetu Trade Administration Login Page</h2>
                    {this.state.countTrials !== 3 ?
                        <React.Fragment>
                            <div className="admin-login-page-form">
                                <h3>Kwetu Trade Administrator Credentials</h3>
                                <form onSubmit={this.handleSubmittedCredentials}>
                                    <input type="text" placeholder="Kwetu Trade Admin Username....." required onChange={this.handleUsernameChangeField}/>
                                    <input type="password" placeholder="Kwetu Trade Admin Secret Key..." required onChange={this.handlePasswordChangeField}/>
                                    <button>Kwetu Trade Admin Login</button>
                                </form>
                            </div>
                            {this.state.badCredentials === true &&
                                <p style={{backgroundColor: "rgba(200,50,50)",color: "black"}}>You're supplying bad credentials, check username and secret key! you still have {3-this.state.countTrials} trials only</p>
                            }
                        </React.Fragment>
                    :
                        <p style={{backgroundColor: "rgb(220,40,40)", color: "white", padding: "10px"}}>It seems like you're not a kwetu trade administrator, try again later! or contact controller!</p>
                    }
                </div>
            </div>
         );
    }
}

export default LoginAdminPanel;