import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEye} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
// import ShowEntryAddSearch from "./ShowEntryAddSearch"




class CustomerOrderDetail extends Component {
    state = { 
        orderdetatil:{}
     }

     componentDidMount(){
         this.fetchOrderDetail()
     }

     fetchOrderDetail = () =>{
        var id = this.props.match.params.id
        var url = `http://50.116.29.247/orders/${id}/detail/`

        fetch(url).then(response => response.json())
        .then(data => this.setState({orderdetatil: data}))
     }
    render() {
        return (
            <div>
                <div className="customer-info-detail">
                    <div className="customer-info-detail-divs">
                        <h2>Order Billing Address</h2>
                        {this.state.orderdetatil.billing_address !==undefined &&
                        <React.Fragment>
                            <p style={{marginTop: "10px"}}>Firstname: {this.state.orderdetatil.billing_address.first_name}</p>
                            <p>Lastname: {this.state.orderdetatil.billing_address.last_name}</p>
                            <p>Company: {this.state.orderdetatil.billing_address.company_name}</p>
                            <p>Country: {this.state.orderdetatil.billing_address.country}</p>
                            <p>Street Name/House Number: {this.state.orderdetatil.billing_address.street_name_house_number}</p>
                            <p>Apartment: {this.state.orderdetatil.billing_address.apartment_name}</p>
                            <p>City/Town: {this.state.orderdetatil.billing_address.city_town}</p>
                            <p>State/Country: {this.state.orderdetatil.billing_address.state_country}</p>
                            <p>Post/ZipCode: {this.state.orderdetatil.billing_address.zip_post_code}</p>
                            <p>Phone number: {this.state.orderdetatil.billing_address.phone_number}</p>
                            <p>E-mail: {this.state.orderdetatil.billing_address.email_address}</p>
                        </React.Fragment>
                        }
                    </div>
                    <div className="customer-info-detail-divs">
                        <h2>Order Shipping Address</h2>
                        {this.state.orderdetatil.shipping_address !==undefined &&
                        <React.Fragment>
                            <p style={{marginTop: "10px"}}>Firstname: {this.state.orderdetatil.shipping_address.first_name}</p>
                            <p>Lastname: {this.state.orderdetatil.shipping_address.last_name}</p>
                            <p>Company: {this.state.orderdetatil.shipping_address.company_name}</p>
                            <p>Country: {this.state.orderdetatil.shipping_address.country}</p>
                            <p>Street Name/House Number: {this.state.orderdetatil.shipping_address.street_name_house_number}</p>
                            <p>Apartment: {this.state.orderdetatil.shipping_address.apartment_name}</p>
                            <p>City/Town: {this.state.orderdetatil.shipping_address.city_town}</p>
                            <p>State/Country: {this.state.orderdetatil.shipping_address.state_country}</p>
                            <p>Post/ZipCode: {this.state.orderdetatil.shipping_address.zip_post_code}</p>
                            <p>Phone number: {this.state.orderdetatil.shipping_address.phone_number}</p>
                            <p>E-mail: {this.state.orderdetatil.shipping_address.email_address}</p>
                        </React.Fragment>
                        }
                    </div>
                    <div className="customer-info-detail-divs">
                        <h2>More About This Order</h2>
                        {this.state.orderdetatil !==undefined && this.state.orderdetatil.ordered_date !== undefined &&
                        <React.Fragment>                                                
                            <p style={{marginTop: "10px"}}>Order Status: {this.state.orderdetatil.order_status}</p>
                            <p>Ordered date: {`${this.state.orderdetatil.ordered_date.slice(0, 10)} ${this.state.orderdetatil.ordered_date.slice(11, 19)}`}</p>
                            <p>
                                {this.state.orderdetatil.out_of_delivery_date !== null && this.state.orderdetatil.out_of_delivery_date !== undefined &&
                                <React.Fragment>Out for delivery date: {`${this.state.orderdetatil.out_of_delivery_date.slice(0, 10)} ${this.state.orderdetatil.out_of_delivery_date.slice(11, 19)}`}</React.Fragment>
                                }
                            </p>
                            <p>
                                {this.state.orderdetatil.delivered_date !== null && this.state.orderdetatil.delivered_date !== undefined &&
                                <React.Fragment>Delivered date: {`${this.state.orderdetatil.delivered_date.slice(0, 10)} ${this.state.orderdetatil.delivered_date.slice(11, 19)}`}</React.Fragment>
                                }
                            </p>
                            <p>Quantity Ordered: {this.state.orderdetatil.quantity_ordered}</p>
                            <p>Amount Ordered: {`$ ${this.state.orderdetatil.amount_ordered}`}</p>
                            <p>Shipping fee: {`$ ${this.state.orderdetatil.shipping_fee}`}</p>
                            {this.state.orderdetatil.out_of_delivery_date === null && <p><br/></p>}
                            {this.state.orderdetatil.delivered_date === null && <p><br/></p>}
                            <p><br/></p>
                            <p><br/></p>
                            <p><br/></p>
                            <p><br/></p>
                        </React.Fragment>
                    }
                    </div>
                </div>
                <div className="clearboth"></div>
                {/* <p className="order-detail-search"><ShowEntryAddSearch btnTitle={"Order"}  onSale={true}/></p> */}
                <div className="clearboth"></div>
                <br/>
                <div className="content">
                    <h6>Products have been ordered</h6>
                    <table className="table-content">
                        <thead>
                            <tr>
                                <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                <th>price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                <th>quantity<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                <th>Total price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                <th className="action-buttons">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orderdetatil.ordered_products !== undefined && 
                            <React.Fragment>
                                {
                                    this.state.orderdetatil.ordered_products.map(item=>
                                        <tr key={item.order_item_id}>
                                            <td>{item.item_name}</td>
                                            <td>{`$ ${item.price}`}</td>
                                            <td style={{paddingLeft: "30px"}}>{item.quantity}</td>
                                            <td style={{paddingLeft: "20px"}}>{`$ ${Number(item.price) * Number(item.quantity)}`}</td>
                                            <td className="action-buttons">
                                                <Link className="order-detail-view-btn"
                                                to={item.classification === "coffee" ? `/${this.props.activeUser.first_name}-${this.props.activeUser.last_name}/account/order/item/coffee/${item.product_id}` : 
                                                item.classification === "material" ? `/${this.props.activeUser.first_name}-${this.props.activeUser.last_name}/account/order/item/material/${item.product_id}` : 
                                                `/${this.props.activeUser.first_name}-${this.props.activeUser.last_name}/account/order/item/animal/${item.product_id}`}><FontAwesomeIcon icon={faEye}/> view</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </React.Fragment>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
);
    }
}
 
export default CustomerOrderDetail;

