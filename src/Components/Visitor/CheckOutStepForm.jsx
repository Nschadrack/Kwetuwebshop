import React, { Component } from 'react';
import LoginCustomerForm from './LoginCustomerForm';
import CheckOutBillingShipping from './CheckOutBillingShipping';
import ScrollToTop from './ScrollToTop';
import auth from "../../auth";
import Payment from "./Payment";
import Confirmation from './Confirmation';


class CheckOutStepForm extends Component {
    constructor(props){
        super(props)
        if(auth.isAuthenticated(this.props.authenticated)){
            this.state={ 
                confirm_next_bill_as_shipping: false,
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
                activeBillingAddress:{
                    firstName: "",
                    lastName: "",
                    company: "",
                    billingCountry: "Rwanda",
                    houseStreetName: "",
                    apartment: "",
                    townCity: "",
                    stateCountry: "",
                    postCode: "",
                    phoneNumber: "",
                    emailAddress: ""
                },
                activeShippingAddress:{
                    firstName: "",
                    lastName: "",
                    company: "",
                    shippingCountry: "Rwanda",
                    houseStreetName: "",
                    apartment: "",
                    townCity: "",
                    stateCountry: "",
                    postCode: "",
                    phoneNumber: "",
                    emailAddress: ""
                }
            }
        }
        else{
            this.state= { 
                    threeButtons: {
                        showLogin: true,
                        showLoginStatus: true,
                        showBilling:false,
                        showBillingStatus: false,
                        showPayment: false,
                        showPaymentStatus: false,
                        showConfirmation:false,
                        showConfirmationStatus: false
                        },
                    activeBillingAddress:{
                        firstName: "",
                        lastName: "",
                        company: "",
                        billingCountry: "Rwanda",
                        houseStreetName: "",
                        apartment: "",
                        townCity: "",
                        stateCountry: "",
                        postCode: "",
                        phoneNumber: "",
                        emailAddress: ""
                    },
                    activeShippingAddress:{
                        firstName: "",
                        lastName: "",
                        company: "",
                        shippingCountry: "Rwanda",
                        houseStreetName: "",
                        apartment: "",
                        townCity: "",
                        stateCountry: "",
                        postCode: "",
                        phoneNumber: "",
                        emailAddress: ""
                    }
            }
        }
    }

    /* handle billing address form  change on different fields */
    handleBillingFirsName = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, firstName: e.target.value}})
    }

    handleBillingLastName = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, lastName: e.target.value}})
    }

    handleBillingCompany = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, company: e.target.value}})
    }

    handleBillingCountry = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, billingCountry: e.target.value}})
    }

    handleBillingHouseStreet = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, houseStreetName: e.target.value}})
    }
    
    handleBillingApartment = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, apartment: e.target.value}})
    }
    handleBillingTownCity = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, townCity: e.target.value}})
    }
    handleBillingStateCountry = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, stateCountry: e.target.value}})
    }

    handleBillingPostCode = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, postCode: e.target.value}})
    }

    handleBillingPhoneNumber = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, phoneNumber: e.target.value}})
    }

    handleBillingEmailAddress = (e) =>{
        this.setState({activeBillingAddress: {...this.state.activeBillingAddress, emailAddress: e.target.value}})
    }


    /* handle shipping address form  change on different fields */
    handleShippingFirsName = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, firstName: e.target.value}})
    }

    handleShippingLastName = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, lastName: e.target.value}})
    }

    handleShippingCompany = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, company: e.target.value}})
    }

    handleShippingCountry = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, shippingCountry: e.target.value}})
    }

    handleShippingHouseStreet = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, houseStreetName: e.target.value}})
    }
    
    handleShippingApartment = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, apartment: e.target.value}})
    }
    handleShippingTownCity = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, townCity: e.target.value}})
    }
    handleShippingStateCountry = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, stateCountry: e.target.value}})
    }

    handleShippingPostCode = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, postCode: e.target.value}})
    }

    handleShippingPhoneNumber = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, phoneNumber: e.target.value}})
    }

    handleShippingEmailAddress = (e) =>{
        this.setState({activeShippingAddress: {...this.state.activeShippingAddress, emailAddress: e.target.value}})
    }


    /* handle show different buttons for process status */
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
            { ...this.state, threeButtons:newThreeButtons}
         )
    }
    handleShippingSameAsBilling = (data) =>{
         this.setState({
             activeShippingAddress: {
                 ...this.state.activeShippingAddress,
                firstName: data.firstName,
                lastName: data.lastName,
                company: data.company,
                shippingCountry: data.billingCountry,
                houseStreetName: data.houseStreetName,
                apartment: data.apartment,
                townCity: data.townCity,
                stateCountry: data.stateCountry,
                postCode: data.postCode,
                phoneNumber: data.phoneNumber,
                emailAddress: data.emailAddress
             },
             confirm_next_bill_as_shipping: true
         })
    }
    render() { 
        return ( 
            <div className="check-out-step-form">
                <div className="check-out-links">
                    { this.state.threeButtons.showLoginStatus ? 
                    (<button className='check-out-step-form-active'>Login</button>) 
                    :
                    (<button>Login</button>)
                    }
                    { this.state.threeButtons.showBillingStatus ? 
                    (<button className='check-out-step-form-active'>Billing</button>)
                    :
                    (<button>Billing</button>)
                    }
                    { this.state.threeButtons.showPaymentStatus ? 
                    (<button className='check-out-step-form-active'>Payment</button>)
                    :
                    (<button >Payment</button>)
                    }
                    { this.state.threeButtons.showConfirmationStatus ? 
                    (<button className='check-out-step-form-active'>Confirmation</button>)
                    :
                    (<button >Confirmation</button>)
                    }
                </div>
                <div>
                    {auth.isAuthenticated(this.props.authenticated) === false ?
                        <React.Fragment>
                            {this.state.threeButtons.showLogin &&
                            <ScrollToTop> 
                                <LoginCustomerForm onhandleSetShowBilling={this.handleSetShowBilling} {...this.props} fetchUsers={this.props.onFectUsersList}/>
                            </ScrollToTop>
                            }
                        </React.Fragment>
                    :
                        <React.Fragment>
                            {this.state.threeButtons.showBilling && 
                            <ScrollToTop>
                                <CheckOutBillingShipping onhandleSetShowBilling={this.handleSetShowBilling}  activeBillingAddress={this.state.activeBillingAddress} {...this.props}
                                activeShippingAddress={this.state.activeShippingAddress}
                                handleBillingFirsName={this.handleBillingFirsName} handleBillingLastName={this.handleBillingLastName}
                                handleBillingCompany={this.handleBillingCompany} handleBillingCountry={this.handleBillingCountry}
                                handleBillingHouseStreet={this.handleBillingHouseStreet} handleBillingApartment={this.handleBillingApartment}
                                handleBillingTownCity={this.handleBillingTownCity} handleBillingStateCountry={this.handleBillingStateCountry}
                                handleBillingPostCode={this.handleBillingPostCode} handleBillingPhoneNumber={this.handleBillingPhoneNumber}
                                handleBillingEmailAddress={this.handleBillingEmailAddress}
                                handleShippingFirsName={this.handleShippingFirsName} handleShippingLastName={this.handleShippingLastName}
                                handleShippingCompany={this.handleShippingCompany} handleShippingCountry={this.handleShippingCountry}
                                handleShippingHouseStreet={this.handleShippingHouseStreet} handleShippingApartment={this.handleShippingApartment}
                                handleShippingTownCity={this.handleShippingTownCity} handleShippingStateCountry={this.handleShippingStateCountry}
                                handleShippingPostCode={this.handleShippingPostCode} handleShippingPhoneNumber={this.handleShippingPhoneNumber}
                                handleShippingEmailAddress={this.handleShippingEmailAddress}
                                handleShippingSameAsBilling={this.handleShippingSameAsBilling}
                                confirm_next_bill_as_shipping={this.state.confirm_next_bill_as_shipping}/>
                            </ScrollToTop>
                            }
                            {this.state.threeButtons.showPayment && 
                            <Payment onhandleSetShowBilling={this.handleSetShowBilling}  activeBillingAddress={this.state.activeBillingAddress} {...this.props}
                                activeShippingAddress={this.state.activeShippingAddress}/>
                            }
                            {this.state.threeButtons.showConfirmation && 
                            <Confirmation onhandleSetShowBilling={this.handleSetShowBilling}  activeBillingAddress={this.state.activeBillingAddress} {...this.props}
                            activeShippingAddress={this.state.activeShippingAddress}/>
                            }
                        </React.Fragment>
                    }
                </div>
            </div>
         );
    }
}
 
export default CheckOutStepForm;