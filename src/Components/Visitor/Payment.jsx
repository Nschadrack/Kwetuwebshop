import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import OrderItems from "./OrderItems";
import PaymentEntry from "./PaymentEntry";
import axios from "axios"

const card_logo = require("../../images/Major-Credit-Card.png")

class Payment extends Component {
    state = { orderedPaid: false, success: true }

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
    
      setOrderpaid = (value) =>{
          this.setState({orderedPaid: value, success: value})
      }

    handlePlaceOrder = () =>{
        let data = {}
        data["billing_address"] = this.props.activeBillingAddress
        data["shipping_address"] =  this.props.activeShippingAddress
        data["cart"] = this.props.shoppingCart
        data["shipping_fee"] = this.props.shippingFee
        data["user"] = this.props.activeUser
        // data = JSON.stringify(data)
        var csrfToken = this.getCookie('csrftoken')
        var url = "http://50.116.29.247/create/new/order/"

        axios.post(url, data, {
            headers:{
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            }
        }).then(response => {
            this.props.updatingShoppingCart({
                cartId: 1,
                items:[],
                currency: "$",
                subTotal: 0
            })
            this.props.onhandleSetShowBilling(false, true, false, true, false, true, true,true)
        })

    }
    render() {
        const cart = this.props.shoppingCart
        const items = cart.items
        const shippingFee = this.props.shippingFee
        const groundTotalTobePaid = (Number(cart.subTotal) + Number(shippingFee)).toFixed(2)
        const customerName = this.props.activeBillingAddress.firstName + this.props.activeBillingAddress.lastName
        const customerPhone = this.props.activeBillingAddress.phoneNumber
        const customerEmail = this.props.activeBillingAddress.emailAddress

        return (
            <div className="payments">
                <div className="billing-address-summary">
                    <h2>Billing Address Summary</h2>
                    <p>Firstname: <span>{this.props.activeBillingAddress.firstName}</span></p>
                    <p>Lastname: <span>{this.props.activeBillingAddress.lastName}</span></p>
                    <p>Company: <span>{this.props.activeBillingAddress.company}</span></p>
                    <p>Billing country: <span>{this.props.activeBillingAddress.billingCountry}</span></p>
                    <p>House/Street name: <span>{this.props.activeBillingAddress.houseStreetName}</span></p>
                    <p>Apartment: <span>{this.props.activeBillingAddress.apartment}</span></p>
                    <p>Town/City: <span>{this.props.activeBillingAddress.townCity}</span></p>
                    <p>State/Country: <span>{this.props.activeBillingAddress.stateCountry}</span></p>
                    <p>Postcode/Zip code: <span>{this.props.activeBillingAddress.postCode}</span></p>
                    <p>Phone number: <span>{this.props.activeBillingAddress.phoneNumber}</span></p>
                    <p>Email address: <span>{this.props.activeBillingAddress.emailAddress}</span></p>
                </div>
                <div className="clearBoth"></div>
                <div className="shipping-address-summary">
                    <h2>Shipping Address Summary</h2>
                    <p>Firstname: <span>{this.props.activeShippingAddress.firstName}</span></p>
                    <p>Lastname: <span>{this.props.activeShippingAddress.lastName}</span></p>
                    <p>Company: <span>{this.props.activeShippingAddress.company}</span></p>
                    <p>Shipping country: <span>{this.props.activeShippingAddress.shippingCountry}</span></p>
                    <p>House/Street name: <span>{this.props.activeShippingAddress.houseStreetName}</span></p>
                    <p>Apartment: <span>{this.props.activeShippingAddress.apartment}</span></p>
                    <p>Town/City: <span>{this.props.activeShippingAddress.townCity}</span></p>
                    <p>State/Country: <span>{this.props.activeShippingAddress.stateCountry}</span></p>
                    <p>Postcode/Zip code: <span>{this.props.activeShippingAddress.postCode}</span></p>
                    <p>Phone number: <span>{this.props.activeShippingAddress.phoneNumber}</span></p>
                    <p>Email address: <span>{this.props.activeShippingAddress.emailAddress}</span></p>
                </div>
                <div className="clearBoth"></div>
                <div className="order-summary">
                    <h2>order summary</h2>
                    <table className="cart-items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th style={{borderRight: "1px solid rgb(140,140,140)"}}>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <OrderItems 
                                key={index} item={item} 
                                currency={cart.currency} {...this.props}/>
                            ))}
                            <tr className="ground-subtotal">
                                <td colSpan="3">Order Subtotal Amount</td>
                            <td colSpan="2">{cart.currency}{cart.subTotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{clear: "both", content:""}}>
                        <h4>Shipping fee: <span>{`${cart.currency}${shippingFee.toFixed(2)}`}</span></h4>
                        <h4>Ground total to be paid: <span>{`${cart.currency}${(Number(cart.subTotal) + Number(shippingFee)).toFixed(2)}`}</span></h4>
                    </div>
                    <br/>
                    <br/>
                </div>
                <div className="clearBoth"></div>
                <div className="payment-card">
                    <h3>Currently, we accept</h3>
                    <img src={card_logo} alt={"card_logo"}/>
                    <br/>
                    {this.state.orderedPaid === false &&
                        <PaymentEntry customerName={customerName} customerEmail={customerEmail} 
                        customerPhone={customerPhone} groundTotalTobePaid={groundTotalTobePaid}
                        setOrderpaid={this.setOrderpaid}/>
                    }
                    <br/>
                </div>
                {this.state.success === false &&
                    <React.Fragment>
                        <br/>
                        <p style={{color: "red", fontSize:"13px"}}>Your payment didn't be successfully, check your card and your account balance</p>
                    </React.Fragment>
                }
                <br/>
                <button onClick={() => this.props.onhandleSetShowBilling(false, true, true, true, false, true, false, false)} className="previous">
                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> previous</button>
                {this.state.orderedPaid === true &&
                    <button onClick={() => this.handlePlaceOrder()} className="place-order">
                        place order <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                }
                <br/><br/>
            </div>
         );
    }
}
 
export default Payment;