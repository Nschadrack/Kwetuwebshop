import React, {Component} from 'react'
import Title from "./Title"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import { Spring } from 'react-spring/renderprops'



// variables declarations
var deleteWindow
var CustomerMemberDetailDiv

class CustomerMemberDetail extends Component {
    state = { showDeleteWindow: false,
            customerDetail:{},
            activeOrder: {}
        }

    componentDidMount(){
        this.fetchCustomerDetail()
    }
    setDeleteWindow = (value) =>{
        this.setState({showDeleteWindow: value})
    }
    setUpdateOrderStatus = (value1, order) =>{
        this.setState({showDeleteWindow: value1, activeOrder: order})
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

    fetchCustomerDetail = () =>{
        const id=this.props.match.params.id
        var url = `http://50.116.29.247/customer/${id}/detail/`
        fetch(url).then(response => response.json())
        .then(data => this.setState({customerDetail: data}))
    }
    fetchOrders = () =>{
        var url ="http://50.116.29.247/orders_list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.ordersList(data))
    }
    deleteOrder = () =>{
        var url=`http://50.116.29.247/delete/order/${this.state.activeOrder.order_number}/`
        var csrfToken = this.getCookie('csrftoken')
        
        fetch(url,{
            method: "DELETE",
            headers:{
                "content-type": "application/json",
                'X-CSRFToken': csrfToken,
            }
        }).then(response => {
            this.setState({orderStatus: "", activeOrder: {}})
            this.fetchOrders()
            this.fetchCustomerDetail()
            this.setDeleteWindow(false)
        })
    }
    render() {
        // display delete window
        if (this.state.showDeleteWindow){
            deleteWindow = <Spring
            from={{opacity: 0, zIndex: -1}}
            to={{opacity: 1, zIndex: 1}}>
                {
                    props=>(
                        <div style={props} className="delete-window-div">
                            <div className="addNewDiv_title">
                                <h4>delete order</h4>
                                <button onClick={() => this.setDeleteWindow(false)}>x</button>
                            </div>
                            <div className="delete-window-div_body">
                                <p>Do you want to this order ?</p>
                                <button onClick={() => this.deleteOrder()}>Delete</button>
                                <button onClick={() => this.setDeleteWindow(false)}>Cancel</button>
                            </div>
                        </div>
                    )
                }

            </Spring>
        }
        else{
            deleteWindow = <div></div>
        }
        if(this.props.OnAnimate){
            CustomerMemberDetailDiv = <div>
                            <div>
                                <Title title={"Customer Member Detail"} title2={" / Customer-Member / customer-member-detail"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <div className="customer-info-detail">
                                    <div className="customer-info-detail-divs">
                                        <h2>Customer Info</h2>
                                        {this.state.customerDetail.user !== undefined &&
                                        <React.Fragment>
                                            <p>Firstname: {this.state.customerDetail.user.first_name}</p>
                                            <p>Lastname: {this.state.customerDetail.user.last_name}</p>
                                            <p>E-mail: {this.state.customerDetail.user.email}</p>
                                            <p>Username: {this.state.customerDetail.user.username}</p>
                                        </React.Fragment>
                                        }
                                    </div>
                                    <div className="customer-info-detail-divs">
                                        <h2>Addresses used</h2>
                                        {this.state.customerDetail.billing_address !== undefined &&
                                        <React.Fragment>
                                            <p>Billing Addresses: {this.state.customerDetail.billing_address.length}</p>
                                        </React.Fragment>
                                        }
                                        {this.state.customerDetail.shipping_address !== undefined &&
                                        <React.Fragment>
                                            <p>Shipping Addresses: {this.state.customerDetail.shipping_address.length}</p>
                                        </React.Fragment>
                                        }
                                        <p><br/></p>
                                        <p><br/></p>
                                    </div>
                                    <div className="customer-info-detail-divs">
                                        <h2>Payment Info & Orders</h2>
                                        {this.state.customerDetail.orders !== undefined && <p>Total Orders Has Made: {this.state.customerDetail.orders.length}</p>}
                                        <p><br/></p>
                                        <p><br/></p>
                                        <p><br/></p>
                                    </div>
                                </div>
                                <div className="clearboth"></div>
                                {/* <p className="order-detail-search"><ShowEntryAddSearch btnTitle={"customer"}  onSale={true}/></p> */}
                                <div className="clearboth"></div>
                                <div className="content">
                                    <h6>List of orders has made</h6>
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Order.No<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>shipping<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>amount ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Order Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.customerDetail.orders !== undefined &&
                                            <React.Fragment>
                                                {
                                                    this.state.customerDetail.orders.map(order =>
                                                        <tr key={order.order_number}>
                                                            <td>{order.order_number}</td>
                                                            <td>{`${order.ordered_date.slice(0,10)} ${order.ordered_date.slice(11,16)}`}</td>
                                                            <td style={{textAlign: "center"}}>{order.quantity_ordered}</td>
                                                            <td style={{textAlign: "center"}}>{`$ ${order.shipping_fee}`}</td>
                                                            <td style={{textAlign: "center"}}>{`$ ${order.amount_ordered}`}</td>
                                                            <td><span className={"Active"}>{order.order_status}</span></td>
                                                            <td className="action-buttons">
                                                                <Link to={`/admin/kwetu-trade/panel/order/${order.order_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                                <button className="thirdButton table-content-button" onClick={() => this.setUpdateOrderStatus(true, order)}><FontAwesomeIcon icon={faTrash}/></button>
                                                            </td>
                                                        </tr>
                                                        )
                                                }
                                                <tr>
                                                    <td colspan="7">
                                                        {this.state.customerDetail.orders.length === 0 && <p style={{textAlign: "center"}}>This customer has not made any order</p>}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                            </div>
                        </div>
        }
        else{
            CustomerMemberDetailDiv = <div>
                            <div>
                                <Title title={"Customer Member Detail"} title2={" / Customer-Member / customer-member-detail"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay: 500, duration: 1000}}>
                                {
                                    props=>(
                                    <div className="main-load-data" style={props}>
                                        <div className="customer-info-detail">
                                            <div className="customer-info-detail-divs">
                                                <h2>Customer Info</h2>
                                                {this.state.customerDetail.user !== undefined &&
                                                <React.Fragment>
                                                    <p>Firstname: {this.state.customerDetail.user.first_name}</p>
                                                    <p>Lastname: {this.state.customerDetail.user.last_name}</p>
                                                    <p>E-mail: {this.state.customerDetail.user.email}</p>
                                                    <p>Username: {this.state.customerDetail.user.username}</p>
                                                </React.Fragment>
                                                }
                                            </div>
                                            <div className="customer-info-detail-divs">
                                                <h2>Addresses used</h2>
                                                {this.state.customerDetail.billing_address !== undefined &&
                                                <React.Fragment>
                                                    <p>Billing Addresses: {this.state.customerDetail.billing_address.length}</p>
                                                </React.Fragment>
                                                }
                                                {this.state.customerDetail.shipping_address !== undefined &&
                                                <React.Fragment>
                                                    <p>Shipping Addresses: {this.state.customerDetail.shipping_address.length}</p>
                                                </React.Fragment>
                                                }
                                                <p><br/></p>
                                                <p><br/></p>
                                            </div>
                                            <div className="customer-info-detail-divs">
                                                <h2>Payment Info & Orders</h2>
                                                {this.state.customerDetail.orders !== undefined && <p>Total Orders Has Made: {this.state.customerDetail.orders.length}</p>}
                                                <p><br/></p>
                                                <p><br/></p>
                                                <p><br/></p>
                                            </div>
                                        </div>
                                        <div className="clearboth"></div>
                                        {/* <p className="order-detail-search"><ShowEntryAddSearch btnTitle={"customer"}  onSale={true}/></p> */}
                                        <div className="clearboth"></div>
                                        <div className="content">
                                            <h6>List of orders has made</h6>
                                            <table className="table-content">
                                                <thead>
                                                    <tr>
                                                        <th>Order.No<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>date ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>quantity ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>shipping<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>amount ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Order Status</th>
                                                        <th className="action-buttons">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.customerDetail.orders !== undefined &&
                                                    <React.Fragment>
                                                        {
                                                            this.state.customerDetail.orders.map(order =>
                                                                <tr key={order.order_number}>
                                                                    <td>{order.order_number}</td>
                                                                    <td>{`${order.ordered_date.slice(0,10)} ${order.ordered_date.slice(11,16)}`}</td>
                                                                    <td style={{textAlign: "center"}}>{order.quantity_ordered}</td>
                                                                    <td style={{textAlign: "center"}}>{`$ ${order.shipping_fee}`}</td>
                                                                    <td style={{textAlign: "center"}}>{`$ ${order.amount_ordered}`}</td>
                                                                    <td><span className={"Active"}>{order.order_status}</span></td>
                                                                    <td className="action-buttons">
                                                                        <Link to={`/admin/kwetu-trade/panel/order/${order.order_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                                        <button className="thirdButton table-content-button" onClick={() => this.setUpdateOrderStatus(true, order)}><FontAwesomeIcon icon={faTrash}/></button>
                                                                    </td>
                                                                </tr>
                                                                )
                                                        }
                                                        <tr>
                                                            <td colspan="7">
                                                                {this.state.customerDetail.orders.length === 0 && <p style={{textAlign: "center"}}>This customer has not made any order</p>}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        {deleteWindow}
                                    </div>
                                    )
                                }
                            </Spring>
                        </div>
        }
        return ( 
            <div>{CustomerMemberDetailDiv}</div>
         );
    }
}
 
export default CustomerMemberDetail;

