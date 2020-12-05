import React, { Component } from 'react';
import {Spring} from "react-spring/renderprops";
import LoginCustomerForm from "./LoginCustomerForm";
import {Link} from "react-router-dom";


class UserLoginRegisteration extends Component {
    constructor(){
        super()
        this.state = { 
            threeButtons: {
                    showLogin: false,
                    showLoginStatus: true,
                    showBilling:true,
                    showBillingStatus: true,
                    showPayment: false,
                    showPaymentStatus: false,
                    showConfirmation:false,
                    showConfirmationStatus: false 
                },
                showRegisterLogin: true
        }
        
    }
    handleSetShowBilling = (showLogin, showLoginStatus, showBilling, showBillingStatus, showPayment, showPaymentStatus, showConfirmation, showConfirmationStatus) =>{
        const newThreeButtons={
           showLogin,
           showLoginStatus,
           showBilling,
           showBillingStatus,
           showPayment,
           showPaymentStatus,
           showConfirmation,
           showConfirmationStatus
       }
        this.setState(
           { ...this.state, threeButtons:newThreeButtons, showRegisterLogin: false}
        )
        this.props.history.push("/")
   }
  
    render() { 
        return ( 
            <React.Fragment>
                {this.state.showRegisterLogin === true &&
                    <Spring
                    from={{opacity: 0}}
                    to={{opacity: 1}}
                    config={{delay:200, duration:400}}
                    >
                        {
                            props=>(
                                <div className="user-login-register" style={props}>
                                    <div className="wrap-close-button">
                                        <Link to={"/"} className="close">x</Link>
                                    </div>
                                    <LoginCustomerForm onhandleSetShowBilling={this.handleSetShowBilling} {...this.props} fetchUsers={this.props.onFectUsersList}/>
                                </div>
                            )
                        }
                    </Spring>
                }
            </React.Fragment>
         );
    }
}
 
export default UserLoginRegisteration;