import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCaravan, faMoneyBill, faCheckCircle, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import AddressForm from './AddressForm'
import ShippingAddressForm from "./ShippingAddressForm"
import {Spring} from 'react-spring/renderprops'

class CheckOutBillingShipping extends Component {
    state = { 
        showBillingForm: true,
        showShippingForm: false,
        showShippingAskYesNo: false,
     }

     handleViewBillingAddress =(value) =>{
        this.setState({...this.state, 
            showBillingForm: value})
     }

     handleSubmitBillingForm = (e) => {
         e.preventDefault()
         this.setState({...this.state, 
            showBillingForm: false,
            showShippingAskYesNo: true})
     }
     handleShippingForm = (e) => {
         e.preventDefault()
         this.props.onhandleSetShowBilling(false, true, false, true, true, true, false, false)
     }

     handleShippingNoResponse = () => {
        this.setState({...this.state, 
            showShippingForm: true,
            showShippingAskYesNo: false})
     }

     
    render() { 
        return ( 
            <div className="checkout-billing-shipping">
                <div className="checkout-billing-part">
                    <h4><FontAwesomeIcon icon={faMoneyBill}/>         Billing detail address</h4>
                    {this.state.showBillingForm ?
                    <form onSubmit={this.handleSubmitBillingForm}>
                        <AddressForm {...this.props}/>
                        <button>confirm billing address</button>
                        <input type="reset" value="reset form"/>
                    </form>
                    :
                    <Spring
                        from={{marginTop: '0px'}}
                        to={{marginTop: '40px'}}
                        config={{delay: 1500, duration: 500}}
                    >
                        {
                            props => (
                            <div>
                                <h2 style={props}><FontAwesomeIcon icon={faCheckCircle} size="lg"/>        Billing address completed</h2>
                                <button style={{margin: "20px auto", display: "table"}} onClick={() => this.handleViewBillingAddress(true)}>View billing address</button>
                            </div>
                            )
                        }
                    </Spring>
                    }
                    
                </div>
                <div className="checkout-shipping-part">
                    <h4><FontAwesomeIcon icon={faCaravan}/>         Shipping detail address</h4>
                        {this.state.showShippingAskYesNo &&
                        <Spring
                        from={{marginTop: '-10px'}}
                        to={{marginTop: '35px'}}
                        config={{duration: 1000}}
                        >
                        {
                            props => (
                            <div className="yes_no_question_shipping_address" style={props}>
                                <p>Do you want your order to be shipped to your billing address?</p>
                                <button className="shipping-yes" onClick={() => this.props.handleShippingSameAsBilling(this.props.activeBillingAddress)}>Yes</button>
                                <button className="shipping-no" onClick={this.handleShippingNoResponse}>No</button>
                            </div>
                            )
                        }
                        </Spring>}
                        {this.props.confirm_next_bill_as_shipping &&
                        <Spring
                        from={{marginTop: '-10px'}}
                        to={{marginTop: '35px'}}
                        config={{duration: 1000}}
                        >
                        {
                            props => (
                            <div className="yes_no_question_shipping_address" style={props}>
                                <button onClick={() => this.props.onhandleSetShowBilling(false, true, false, true, true, true, false,false)} className="place-order">
                    next <FontAwesomeIcon icon={faAngleDoubleRight} /></button><br/>
                            </div>
                            )
                        }
                        </Spring>}
                    <div className="on-no-response-shipping-address-form">
                        {this.state.showShippingForm &&
                        <React.Fragment>
                            <form onSubmit={this.handleShippingForm}>
                                <ShippingAddressForm {...this.props}/>
                                <button>confirm shipping address</button>
                                <input type="reset" value="reset form"/>
                            </form>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default CheckOutBillingShipping;