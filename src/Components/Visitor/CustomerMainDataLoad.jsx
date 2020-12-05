import React, { Component } from 'react';
import {Route} from "react-router-dom";
import CustomerOrdersList from "./CustomerOrdersList";
import CustomerShippingAddress from "./CustomerShippingAddress";
import CustomerBillingAddress from "./CustomerBillingAddress";
import CustomerOrderDetail from "./CustomerOrderDetail";
import CustomerSpecialOrder from "./CustomerSpecialOrder";
import CustomerSpecialOrderDetail from "./CustomerSpecialOrderDetail";
import CustomerUpdateProfile from "./CustomerUpdateProfile";
import CustomerSpecialOrderItemDetail from "./CustomerSpecialOrderItemDetail";
import CustomerOrderItemDetail from "./CustomerOrderItemDetail";
import CustomerInvoice from "./CustomerInvoice";


class CustomerMainDataLoad extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="customer-main-data-load">
                <Route exact path={[`/:first_name-:last_name/account`, `/:first_name-:last_name/account/orders`]} render={() =>(
                        <CustomerOrdersList orders={this.props.state.customerOrders} {...this.props}/>
                )} />
                <Route path={`/:first_name-:last_name/account/special-orders`} render={() =>(
                        <CustomerSpecialOrder specialOrders={this.props.state.customerSpecialOrders} {...this.props}/>
                )} />
                <Route path={`/:first_name-:last_name/account/shipping-addresses`} render={() =>(
                        <CustomerShippingAddress shippingAddresses={this.props.state.customerShippingAddresses}/>
                )} />
                <Route path={`/:first_name-:last_name/account/billing-addresses`} render={() =>(
                        <CustomerBillingAddress billingAddresses={this.props.state.customerBillingAddresses}/>
                )} />
                <Route path={`/:first_name-:last_name/account/order/:id/detail`} render={(params) =>(
                    <CustomerOrderDetail {...params} {...this.props}/>
                )}/>

                <Route path={`/:first_name-:last_name/account/order/item/coffee/:id`} render={(params) =>(
                    <CustomerOrderItemDetail {...params} {...this.props} onCategroy="coffee"/>
                )}/>
                <Route path={`/:first_name-:last_name/account/order/item/material/:id`} render={(params) =>(
                    <CustomerOrderItemDetail {...params} {...this.props} onCategroy="material"/>
                )}/>
                <Route path={`/:first_name-:last_name/account/order/item/animal/:id`} render={(params) =>(
                    <CustomerOrderItemDetail {...params} {...this.props} onCategroy="animal"/>
                )}/>

                <Route path={`/:first_name-:last_name/account/special-order/:id/detail`} render={(params) =>(
                    <CustomerSpecialOrderDetail {...params} {...this.props}/>
                )}/>
                <Route path={`/:first_name-:last_name/account/special-order/product/:id/detail`} render={(params) =>(
                    <CustomerSpecialOrderItemDetail {...params}/>
                )}/>

                <Route path={`/:first_name-:last_name/account/update-profile`} render={(params) =>(
                    <CustomerUpdateProfile {...params} {...this.props}/>
                )}/>

                <Route path={`/:first_name-:last_name/account/invoices`} render={(params) =>(
                    <CustomerInvoice {...params} {...this.props}/>
                )}/>
            </div>
         );
    }
}
 
export default CustomerMainDataLoad;
