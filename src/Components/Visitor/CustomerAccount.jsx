import React, { Component } from 'react';
import CustomerAsideNav from "./CustomerAsideNav";
import CustomerMainDataLoad from "./CustomerMainDataLoad";


class CustomerAccount extends Component {
    state = { 
        orderClicked: "acive-link-nav-customer",
        billingClicked: "notActive",
        shippingClicked: "notActive",
        invoiceClicked: "notActive",
        specialOrderedCliked: "notActive",
        customerOrders: [],
        customerSpecialOrders: [],
        customerBillingAddresses: [],
        customerShippingAddresses: [],
        customerInvoices: [],
        activeCustomer: {}
    }

    componentDidMount(){
        this.fetchCustomers()
    }
    handleActiveLink = (order, specialOrder, billing, shipping, invoice) =>{
        this.setState({
            orderClicked: order,
            specialOrderedCliked: specialOrder,
            billingClicked: billing,
            shippingClicked: shipping,
            invoiceClicked: invoice
        })
    }
    fetchCustomers = () =>{
        var invoices = []
        var url ="http://50.116.29.247/customers/"
        fetch(url).then(response => response.json())
        .then(data =>{
            for(let i=0; i< data.length; i++){
                if(data[i].user.id === this.props.activeUser.id){
                    this.setState({
                        customerOrders: data[i].orders,
                        customerSpecialOrders: data[i].orders_not_on_site, 
                        customerBillingAddresses: data[i].billing_address,
                        customerShippingAddresses: data[i].shipping_address,
                        activeCustomer: data[i]})

                        for (let j=0; j < data[i].orders.length; j++){
                            invoices.push(data[i].orders[j].invoices[0])
                        }
                        this.setState({customerInvoices: invoices})
                    break;
                }
            }
        })
    }
    render() {
        return ( 
            <div className="customer-account">
                <CustomerAsideNav onHandleActiveLink={this.handleActiveLink} state={this.state} activeCustomer={this.props.activeUser} {...this.props}/>
                <CustomerMainDataLoad state={this.state} activeUser={this.props.activeUser} fetchCustomers={this.fetchCustomers}/>
            </div>
         );
    }
}
 
export default CustomerAccount;