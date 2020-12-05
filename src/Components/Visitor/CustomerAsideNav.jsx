import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faAngleRight, faFirstAid, faBook, faAddressBook, faFileInvoice} from '@fortawesome/free-solid-svg-icons'

// const image = require("../../images/IMG-20190818-WA0006.jpg")
// const image = require(props.state.activeCustomer.profile_pic)

const CustomerAsideNav = (props) =>{

    const image = "http://50.116.29.247" + props.state.activeCustomer.profile_pic

    return(
        <div className="customer-aside-nav">
            <div className="brand-name-customer">
                <h2>Kwetu Trade customer panel</h2>
            </div>
            <div className="clearBoth"></div>
            <div className="customer-profile">
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/update-profile`}><img src={image} alt="profile"/></Link>
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/update-profile`}><h6>{`${props.activeCustomer.first_name} ${props.activeCustomer.last_name}`}</h6></Link>
            </div>
            <div className="clearBoth"></div>
            <nav className="customer-nav">
                <Link to={"/"} style={{backgroundColor: "rgb(20, 20, 38)"}}><span className={"NavIcons"}><FontAwesomeIcon icon={faHome}/></span>Home</Link>
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/orders`} onClick={() =>props.onHandleActiveLink("acive-link-nav-customer", "notActive", "notActive", "notActive", "notActive")} className={props.state.orderClicked}><span className="NavIcons"><FontAwesomeIcon icon={faFirstAid}/></span>Orders made<span className="new-span">{props.state.customerOrders.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/special-orders`} onClick={() =>props.onHandleActiveLink("notActive", "acive-link-nav-customer", "notActive", "notActive", "notActive")}className={props.state.specialOrderedCliked}><span className="NavIcons"><FontAwesomeIcon icon={faBook}/></span>Special Orders<span className="new-span">{props.state.customerSpecialOrders.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/billing-addresses`} onClick={() =>props.onHandleActiveLink("notActive", "notActive", "acive-link-nav-customer", "notActive", "notActive")} className={props.state.billingClicked}><span className={"NavIcons"}><FontAwesomeIcon icon={faAddressBook}/></span>Billing Addresses<span className="new-span">{props.state.customerBillingAddresses.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/shipping-addresses`} onClick={() =>props.onHandleActiveLink("notActive", "notActive", "notActive", "acive-link-nav-customer", "notActive")} className={props.state.shippingClicked}><span className={"NavIcons"}><FontAwesomeIcon icon={faAddressBook}/></span>Shipping Addresses<span className="new-span">{props.state.customerShippingAddresses.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={`/${props.activeCustomer.first_name}-${props.activeCustomer.last_name}/account/invoices`} onClick={() =>props.onHandleActiveLink("notActive", "notActive", "notActive", "notActive", "acive-link-nav-customer")} className={props.state.invoiceClicked}><span className={"NavIcons"}><FontAwesomeIcon icon={faFileInvoice}/></span>Invoices made<span className="new-span">{props.state.customerInvoices.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <button onClick={() =>{
                     props.logoutUser(false)
                     props.updateActiveUser({})
                     props.history.push("/")
                }}>Logout</button>
            </nav>
            <div className="kwetu-trade-customer-allrights">
                <p>All rights reserved. &copy; Copyright 2020 - 2025 kwetu trade</p>
            </div>
        </div>
    )
}

export default CustomerAsideNav