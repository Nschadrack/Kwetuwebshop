import React, {Component} from 'react'
import {Spring} from "react-spring/renderprops"
import Title from "./Title"
import ShowEntryAddSearch from "./ShowEntryAddSearch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import Pagination from "../Visitor/Pagination"




// variables declaration
var orderDiv
var addOrderDiv
var deleteWindow


class SpecialOrder extends Component {
    state = { showAddProduct: false,  showDeleteWindow: false, orderStatus: "", activeOrder: {}}

    setShowAddProduct = (value) =>{
        this.setState({showAddProduct: value})
    }
    setUpdateOrderStatus = (value1, value2, order) =>{
        this.setState({showAddProduct: value1, showDeleteWindow: value2, activeOrder: order})
    }

    setDeleteWindow = (value) =>{
        this.setState({showDeleteWindow: value})
    }

    handleSetShowAddProductSetDeleteWindow =(value1, value2) =>{
        this.setState({showAddProduct: value1, showDeleteWindow: value2})
    }

    handleOrderStatus = (e) =>{
        this.setState({ orderStatus: e.target.value, activeOrder: {...this.state.activeOrder, order_status: e.target.value}})
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
    handleSubmitOrderStatus = (e) =>{
        e.preventDefault()
        if(this.state.orderStatus.length === 0){
            alert("You did not choose the status")
        }
        else{
            var url =   `http://50.116.29.247/update/special-order/${this.state.activeOrder.order_number}/`
            var csrfToken = this.getCookie('csrftoken')
            fetch(url,{
                method: "PUT",
                headers:{
                    'content-type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                  body: JSON.stringify(this.state.activeOrder)
            }).then(response => {
                this.setState({orderStatus: "", activeOrder: {}})
                this.fetchSpecialOrders()
            })
            this.setShowAddProduct(false)
        }    
    }
    fetchSpecialOrders = () =>{
        var url ="http://50.116.29.247/special-orders_list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.updateSpecialOrderList(data))
    }
    deleteOrder = () =>{
        var url=`http://50.116.29.247/delete/special-order/${this.state.activeOrder.order_number}/`
        var csrfToken = this.getCookie('csrftoken')

        fetch(url,{
            method: "DELETE",
            headers:{
                "content-type": "application/json",
                'X-CSRFToken': csrfToken,
            }
        }).then(response => {
            this.setState({orderStatus: "", activeOrder: {}})
            this.fetchSpecialOrders()
            this.setDeleteWindow(false)
        })
    }
    render() {
        let currentSpecialOrders = this.props.currentSpecialOrdersPosts
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

        // displaying order status on update
        if (this.state.showAddProduct){
            addOrderDiv = <Spring
            from={{zIndex:-1, opacity: 0}}
            to={{zIndex:100, opacity:1, marginTop: "160px", marginLeft: "160px"}}>
                {
                    props=>(
                        <div className="new-weight-div" style={props}>
                                <div className="addNewDiv_title">
                                    <h4>Updating order status</h4>
                                    <button onClick={() => this.setShowAddProduct(false)}>x</button>
                                </div>
                                <div className="new-weight-form">
                                    <form onSubmit={this.handleSubmitOrderStatus}>
                                        <p>Order: {this.state.activeOrder.order_number}</p>
                                        <select name="order_status" onChange={this.handleOrderStatus}>
                                            <option>pending</option>
                                            <option>out for delivery</option>
                                            <option>delivered</option>
                                            <option>rejected</option>
                                        </select>
                                        <button>Update order status</button>
                                    </form>
                                </div>
                        </div>
                    )
                }
            </Spring>
        }
        else{
            addOrderDiv = <div></div>
        }

        if(this.props.OnAnimate){
            orderDiv = <div>
                            <div>
                                <Title title={"Special Orders"} title2={" / special-orders"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Order"}  onSale={true} onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                    onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                    setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentSpecialOrdersPosts}
                                    searchingCoffee={this.props.searchingCoffee}
                                    searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                    searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                    searchingSpecialOrder={this.props.searchingSpecialOrder} category={"specialOrder"} searchingInvoice={this.props.searchingInvoice}/>
                                <div className="clearboth"></div>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Order.No<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>amount ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Order Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentSpecialOrders.map(order =>
                                                    <tr key={order.order_number} className={order.newness_order_status}>
                                                        <td>{order.order_number}</td>
                                                        <td>{`${order.ordered_date.slice(0,10)} ${order.ordered_date.slice(11,16)}`}</td>
                                                        <td style={{textAlign: "center"}}>{order.quantity_ordered}</td>
                                                        <td style={{textAlign: "center"}}>{`$ ${order.amount_ordered}`}</td>
                                                        <td><span className={order.order_status === "out for delivery" ? "out_for_delivery" : order.order_status} style={{padding: "5px 15px"}}>{order.order_status}</span></td>
                                                        <td className="action-buttons">
                                                            <Link to={`/admin/kwetu-trade/panel/special-orders/${order.order_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                            <button className="secondButton table-content-button" onClick={() => this.setUpdateOrderStatus(true, false, order)}><FontAwesomeIcon icon={faEdit}/></button>
                                                            <button className="thirdButton table-content-button" onClick={() => this.setUpdateOrderStatus(false, true, order)}><FontAwesomeIcon icon={faTrash}/></button>
                                                        </td>
                                                    </tr>
                                                    )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                                <Pagination postsPerpage={this.props.specialOrdersPostsPerPage} totalPosts={this.props.totalSpecialOrders} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
            orderDiv = <div>
                            <div>
                                <Title title={"Special Orders"} title2={" / special-orders"}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay: 500, duration: 1000}}>
                                {
                                props=>(
                                <div className="main-load-data" style={props}>
                                    <ShowEntryAddSearch btnTitle={"Order"}  onSale={true} onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                        onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                        setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentSpecialOrdersPosts}
                                        searchingCoffee={this.props.searchingCoffee}
                                        searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                        searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                        searchingSpecialOrder={this.props.searchingSpecialOrder} category={"specialOrder"} searchingInvoice={this.props.searchingInvoice}/>
                                    <div className="clearboth"></div>
                                    <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Order.No<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>amount ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Order Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentSpecialOrders.map(order =>
                                                    <tr key={order.order_number} className={order.newness_order_status}>
                                                        <td>{order.order_number}</td>
                                                        <td>{`${order.ordered_date.slice(0,10)} ${order.ordered_date.slice(11,16)}`}</td>
                                                        <td style={{textAlign: "center"}}>{order.quantity_ordered}</td>
                                                        <td style={{textAlign: "center"}}>{`$ ${order.amount_ordered}`}</td>
                                                        <td><span className={order.order_status === "out for delivery" ? "out_for_delivery" : order.order_status} style={{padding: "5px 15px"}}>{order.order_status}</span></td>
                                                        <td className="action-buttons">
                                                            <Link to={`/admin/kwetu-trade/panel/special-orders/${order.order_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                            <button className="secondButton table-content-button" onClick={() => this.setUpdateOrderStatus(true, false, order)}><FontAwesomeIcon icon={faEdit}/></button>
                                                            <button className="thirdButton table-content-button" onClick={() => this.setUpdateOrderStatus(false, true, order)}><FontAwesomeIcon icon={faTrash}/></button>
                                                        </td>
                                                    </tr>
                                                    )
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                    {deleteWindow}
                                    <Pagination postsPerpage={this.props.specialOrdersPostsPerPage} totalPosts={this.props.totalSpecialOrders} paginate={this.props.paginate}/>
                                </div>
                                )
                                }
                            </Spring>
                        </div>
        }
        return ( 
            <div>
                {orderDiv}
                {addOrderDiv}
            </div>
         );
    }
}
export default SpecialOrder;