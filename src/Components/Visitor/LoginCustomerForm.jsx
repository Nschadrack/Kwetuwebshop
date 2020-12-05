import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import {Spring} from 'react-spring/renderprops';
import axios from "axios";
import {Link} from "react-router-dom";

class LoginCustomerForm extends Component {
    state = { 
        showRegisterForm: false,
        showCreateButton: true,
        passwordMatch: true,
        emailExist: false,
        emailSelected: false,
        registerationInfo:{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: ""
        },
        accountCreated: false,
        activeUser:{
            username: "",
            password: ""
        },
        credentialNotFound: false
     }

     handleShowAccountCreated = (value) =>{
         this.setState({accountCreated: value})
     }
     handleShowLoginWarning = (value) =>{
        this.setState({credentialNotFound: value})
    }
     handleShowRegisterForm = (receivedButtonValue, receivedFormValue) =>{
         this.setState({...this.state, 
            showRegisterForm: receivedFormValue,
            showCreateButton: receivedButtonValue,
            emailExist: false})
     }

     handleFirstName = (e) =>{
        this.setState({registerationInfo: {...this.state.registerationInfo, firstName: e.target.value}})
     }

     handleLastName = (e) =>{
        this.setState({registerationInfo: {...this.state.registerationInfo, lastName: e.target.value}})
     }
     
     handleEmailAddress = (e) =>{
         var emailExist =false
         this.props.users.map(user =>{
             if(user.username === e.target.value){
                emailExist=true
             }
             return 0
         })

         this.setState({emailExist, emailSelected: true})
         if(emailExist === false){
            this.setState({registerationInfo: {...this.state.registerationInfo, email: e.target.value}})
         }
     }

     handlePassword = (e) =>{
         if(this.state.emailSelected === false){
             this.setState({emailExist: true})
         }
         this.setState({registerationInfo: {...this.state.registerationInfo, password: e.target.value}})
     }
     handlePassword2 = (e) =>{
         if(this.state.registerationInfo.password !== e.target.value){
            this.setState({passwordMatch: false})
        }
        else{
            this.setState({registerationInfo: {...this.state.registerationInfo, password2: e.target.value}, passwordMatch: true})
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


    handleSubmittedForm = (e) =>{
        e.preventDefault()
        var url ="http://50.116.29.247/new/customer/"
        var csrfToken = this.getCookie('csrftoken')
        const data = JSON.stringify(this.state.registerationInfo)


        axios.post(url, data, {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        }).then(response => {
            this.setState({
            passwordMatch: true,
            emailExist: false,
            registerationInfo:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                password2: ""
            }})
            this.props.fetchUsers()
        }
        )

        this.handleShowRegisterForm(true, false)
        this.handleShowAccountCreated(true)
    }

    /* handle change on submit login form */
    handleLoginEmail = (e) =>{
        this.setState({
            activeUser:{...this.state.activeUSer, username: e.target.value}
        })
    }

    handleLoginPassword = (e) =>{
        this.setState({
            activeUser: {...this.state.activeUser, password: e.target.value}
        })
    }

    handleLoginForm = (e) =>{
        e.preventDefault()
        var url ="http://50.116.29.247/users/specific_username/"
        var csrfToken = this.getCookie('csrftoken')
        
        const data = JSON.stringify(this.state.activeUser)


        axios.post(url, data, {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        }).then(response => {
            this.setState({
            activeUSer:{
                username: "",
                password: ""
            }})
            if(response.data["erros"]){
               this.setState({credentialNotFound: true})
            }
            else{
                this.setState({credentialNotFound: false})
                this.props.loginUser(true)
                this.props.updateActiveUser(response.data)
                this.props.onhandleSetShowBilling(false, true, true, true, false, false, false, false)
                if(this.props.location.state !== undefined && this.props.location.state !== null){
                if(this.props.location.state.detail !== undefined && this.props.location.state.detail !== null){
                    this.props.history.push(this.props.location.state.detail)
                }
            }
            }
        }
        )

        e.target.elements.email_login_field.value = ""
        e.target.elements.password_login_field.value = ""
    
    }


    render() {
        return (
            <div>
                <div className="login-customer-form">
                    {this.state.accountCreated===true &&
                        <Spring
                        from={{opacity: 0}}
                        to={{opacity: 1}}
                        config={{delay: 300, duration: 1000}}
                        >
                            {
                                props =>(
                                <p style={props} className="message-p">account created successfully! you can now login <button style={{float: "right", backgroundColor: 'rgb(100,250,100)', border: "none", outline: "none"}} onClick={() => this.handleShowAccountCreated(false)}>X</button></p>
                            )
                            }
                        </Spring>
                    }
                    {this.state.credentialNotFound===true &&
                        <Spring
                        from={{opacity: 0}}
                        to={{opacity: 1}}
                        config={{delay: 300, duration: 1000}}
                        >
                            {
                                props =>(
                                <p style={props} className="message-p2">incorrect email or password, check them and try again!<button style={{float: "right", backgroundColor: ' rgb(241, 31, 31)', border: "none", outline: "none"}} onClick={() => this.handleShowLoginWarning(false)}>X</button></p>
                            )
                            }
                        </Spring>
                    }
                    <div className="login-customer-form-existing-customer">
                        <h4><FontAwesomeIcon icon={faKey}/>            Customer with an account</h4>
                        <form onSubmit={this.handleLoginForm}>
                            <input type="email" name="email_login_field" placeholder="Enter your email" required autoComplete="off" onChange={this.handleLoginEmail}/>
                            <input type="password" name="password_login_field" placeholder="Enter your password" required autoComplete="off" onChange={this.handleLoginPassword}/>
                            <button>Login</button>
                            <Link to={"/resetting-password/request"} className="forgot-password">Forgot password?</Link>
                        </form>
                    </div>
                    <div className="login-customer-form-new-customer-and-guest">
                        <h4><FontAwesomeIcon icon={faUser}/>            New Customer</h4>
                        {(this.state.emailExist === true || this.state.passwordMatch === false) &&
                        <p style={{color: "red"}} className="message-p">Fill registeration form correctly</p>
                        }
                        {this.state.showCreateButton &&
                        <React.Fragment>
                            {/* <button className="check-out-without-account"
                            onClick={this.props.onhandleSetShowBilling}>check out with no account</button> */}
                            <button onClick={() => this.handleShowRegisterForm(false, true)}>create an account</button>
                        </React.Fragment>
                        }
                        {this.state.showRegisterForm && 
                            <Spring
                            from={{marginTop: '-80px'}}
                            to={{marginTop: '40px', marginBottom: '80px'}}
                            >
                                {
                                    props =>(
                                    <div className="create-account-division" style={props}>
                                        <form onSubmit={this.handleSubmittedForm}>
                                            <input type="text" name="firstName" placeholder="Enter your first name" required  maxLength="40" onChange={this.handleFirstName} autoComplete="off"/>
                                            <input type="text" name="lastName" placeholder="Enter your last name" required autoComplete="off" maxLength="40" onChange={this.handleLastName}/>
                                            <input type="email" name="email_login_field" placeholder="Enter your email" required autoComplete="off" maxLength="100" onChange={this.handleEmailAddress}/>
                                            {this.state.emailExist === true &&
                                                <p>email already exists, try different one</p>
                                            }
                                            <input type="password" name="password_login_field" placeholder="Enter your password" required autoComplete="off" minLength={"10"} onChange={this.handlePassword}/>
                                            <input type="password" name="password2_login_field" placeholder="Re-type your password" required autoComplete="off" minLength={"10"} onChange={this.handlePassword2}/>
                                            {this.state.passwordMatch === false &&
                                                <p>passwords must match</p>
                                            }
                                            {(this.state.emailExist === true || this.state.passwordMatch === false) ?
                                                <button className="register-button" disabled>Register</button>
                                            :
                                            <button className="register-button">Register</button>
                                            }
                                            <button onClick={() => this.handleShowRegisterForm(true, false)} className="cancel-register-form">Cancel</button>
                                        </form>
                                    </div>
                                    )
                                }
                            </Spring>
                        }
                    </div>
                </div>
                <br/>
                <div className="clearboth"></div>
            </div>
         );
    }
}
 
export default LoginCustomerForm;