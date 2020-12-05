import React, {Component} from "react";
import {Spring} from "react-spring/renderprops";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEye} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
// import ShowEntryAddSearch from "./ShowEntryAddSearch"



var orderDetailDiv

class SpecialOrderDetail extends Component {
    state = { 
        orderdetatil:{}
     }

     componentDidMount(){
         this.fetchOrderDetail()
     }

     fetchOrderDetail = () =>{
        var id = this.props.match.params.id
        var url = `http://50.116.29.247/special-orders/${id}/detail/`

        fetch(url).then(response => response.json())
        .then(data => this.setState({orderdetatil: data}))
     }
    render() {
        if(this.props.OnAnimate){
            orderDetailDiv = <div>
                                <div className="main-load-data">
                                    <div className="customer-info-detail">
                                        <div className="customer-info-detail-divs">
                                            <h2>Order Contact Address</h2>
                                            <p>Country: {this.state.orderdetatil.country}</p>
                                            <p>Province/State: {this.state.orderdetatil.province}</p>
                                            <p>Phone number: {this.state.orderdetatil.phone_number}</p>
                                            <p>E-mail: {this.state.orderdetatil.email_address}</p>
                                            <br/>
                                            <React.Fragment>                                                
                                                <p>
                                                    {this.state.orderdetatil.out_of_delivery_date !== null && this.state.orderdetatil.out_of_delivery_date !== undefined &&
                                                        <p><br/></p>
                                                    }
                                                </p>
                                                <p>
                                                    {this.state.orderdetatil.rejected_date !== null && this.state.orderdetatil.rejected_date !== undefined &&
                                                        <p><br/></p>
                                                    }
                                                </p>
                                                <p>
                                                    {this.state.orderdetatil.delivered_date !== null && this.state.orderdetatil.delivered_date !== undefined &&
                                                        <p><br/></p>
                                                    }
                                                </p>
                                            </React.Fragment>
                                        </div>
                                        <div className="customer-info-detail-divs">
                                            <h2>More About This Order</h2>
                                            {this.state.orderdetatil !==undefined && this.state.orderdetatil.ordered_date !== undefined &&
                                            <React.Fragment>                                                
                                                <p style={{marginTop: "9px"}}>Order Status: {this.state.orderdetatil.order_status}</p>
                                                <p>Ordered date: {`${this.state.orderdetatil.ordered_date.slice(0, 10)} ${this.state.orderdetatil.ordered_date.slice(11, 19)}`}</p>
                                                <p>
                                                    {this.state.orderdetatil.out_of_delivery_date !== null && this.state.orderdetatil.out_of_delivery_date !== undefined &&
                                                    <React.Fragment>Out for delivery date: {`${this.state.orderdetatil.out_of_delivery_date.slice(0, 10)} ${this.state.orderdetatil.out_of_delivery_date.slice(11, 19)}`}</React.Fragment>
                                                    }
                                                </p>
                                                <p>
                                                    {this.state.orderdetatil.rejected_date !== null && this.state.orderdetatil.rejected_date !== undefined &&
                                                    <React.Fragment>Rejected date: {`${this.state.orderdetatil.rejected_date.slice(0, 10)} ${this.state.orderdetatil.rejected_date.slice(11, 19)}`}</React.Fragment>
                                                    }
                                                </p>
                                                <p>
                                                    {this.state.orderdetatil.delivered_date !== null && this.state.orderdetatil.delivered_date !== undefined &&
                                                    <React.Fragment>Delivered date: {`${this.state.orderdetatil.delivered_date.slice(0, 10)} ${this.state.orderdetatil.delivered_date.slice(11, 19)}`}</React.Fragment>
                                                    }
                                                </p>
                                                <p>Quantity Ordered: {this.state.orderdetatil.quantity_ordered}</p>
                                                <p>Amount Ordered: {`$ ${this.state.orderdetatil.amount_ordered}`}</p>
                                                <br/>
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
                                                    <th>unit<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                    <th>Total price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                    <th className="action-buttons">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.orderdetatil.ordered_products !== undefined && 
                                                <React.Fragment>
                                                    {
                                                        this.state.orderdetatil.ordered_products.map(item=>
                                                            <tr key={item.item_number}>
                                                                <td>{item.item_name}</td>
                                                                <td>{`$ ${Number(item.price).toFixed(2)}`}</td>
                                                                <td style={{paddingLeft: "30px"}}>{item.quantity}</td>
                                                                <td>{`${item.unit}`}</td>
                                                                <td style={{paddingLeft: "20px"}}>{`$ ${(Number(item.price) * Number(item.quantity)).toFixed(2)}`}</td>
                                                                <td className="action-buttons">
                                                                    <Link className="order-detail-view-btn"
                                                                    to={`/admin/kwetu-trade/panel/special-orders/product/${item.item_number}/detail`}><FontAwesomeIcon icon={faEye}/> view</Link>
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
                            </div>
        }
        else{
            orderDetailDiv =<div>
                                <Spring
                                from={{width:'77%'}}
                                to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                                config={{delay: 500, duration: 1000}}>
                                    {
                                    props=>(
                                    <div className="main-load-data" style={props}>
                                        <div className="customer-info-detail">
                                            <div className="customer-info-detail-divs">
                                                <h2>Order Contact Address</h2>
                                                <p>Country: {this.state.orderdetatil.country}</p>
                                                <p>Province/State: {this.state.orderdetatil.province}</p>
                                                <p>Phone number: {this.state.orderdetatil.phone_number}</p>
                                                <p>E-mail: {this.state.orderdetatil.email_address}</p>
                                                <React.Fragment>                                                
                                                    <p>
                                                        {this.state.orderdetatil.out_of_delivery_date !== null && this.state.orderdetatil.out_of_delivery_date !== undefined &&
                                                            <p><br/></p>
                                                        }
                                                    </p>
                                                    <p>
                                                        {this.state.orderdetatil.rejected_date !== null && this.state.orderdetatil.rejected_date !== undefined &&
                                                            <p><br/></p>
                                                        }
                                                    </p>
                                                    <p>
                                                        {this.state.orderdetatil.delivered_date !== null && this.state.orderdetatil.delivered_date !== undefined &&
                                                            <p><br/></p>
                                                        }
                                                    </p>
                                                </React.Fragment>
                                            </div>
                                            <div className="customer-info-detail-divs">
                                                <h2>More About This Order</h2>
                                                {this.state.orderdetatil !==undefined && this.state.orderdetatil.ordered_date !== undefined &&
                                                <React.Fragment> 
                                                    <p style={{marginTop: "9px"}}>Order Status: {this.state.orderdetatil.order_status}</p>
                                                    <p>Ordered date: {`${this.state.orderdetatil.ordered_date.slice(0, 10)} ${this.state.orderdetatil.ordered_date.slice(11, 19)}`}</p>
                                                    <p>
                                                        {this.state.orderdetatil.out_of_delivery_date !== null && this.state.orderdetatil.out_of_delivery_date !== undefined &&
                                                        <React.Fragment>Out for delivery date: {`${this.state.orderdetatil.out_of_delivery_date.slice(0, 10)} ${this.state.orderdetatil.out_of_delivery_date.slice(11, 19)}`}</React.Fragment>
                                                        }
                                                    </p>
                                                    <p>
                                                        {this.state.orderdetatil.rejected_date !== null && this.state.orderdetatil.rejected_date !== undefined &&
                                                        <React.Fragment>Rejected date: {`${this.state.orderdetatil.rejected_date.slice(0, 10)} ${this.state.orderdetatil.rejected_date.slice(11, 19)}`}</React.Fragment>
                                                        }
                                                    </p>
                                                    <p>
                                                        {this.state.orderdetatil.delivered_date !== null && this.state.orderdetatil.delivered_date !== undefined &&
                                                        <React.Fragment>Delivered date: {`${this.state.orderdetatil.delivered_date.slice(0, 10)} ${this.state.orderdetatil.delivered_date.slice(11, 19)}`}</React.Fragment>
                                                        }
                                                    </p>
                                                    <p>Quantity Ordered: {this.state.orderdetatil.quantity_ordered}</p>
                                                    <p>Amount Ordered: {`$ ${this.state.orderdetatil.amount_ordered}`}</p>
                                                    <br/>
                                                </React.Fragment>
                                            }
                                            </div>
                                        </div>
                                        <div className="clearboth"></div>
                                        {/* <p className="order-detail-search"><ShowEntryAddSearch btnTitle={"Order"}  onSale={true}/></p> */}
                                        <div className="clearboth"></div>
                                        <div className="content">
                                            <h6>Products have been ordered</h6>
                                            <table className="table-content">
                                                <thead>
                                                    <tr>
                                                        <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>quantity<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>unit<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Total price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th className="action-buttons">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.orderdetatil.ordered_products !== undefined && 
                                                    <React.Fragment>
                                                        {
                                                            this.state.orderdetatil.ordered_products.map(item=>
                                                                <tr key={item.item_number}>
                                                                    <td>{item.item_name}</td>
                                                                    <td>{`$ ${Number(item.price).toFixed(2)}`}</td>
                                                                    <td style={{paddingLeft: "30px"}}>{item.quantity}</td>
                                                                    <td>{` ${item.unit}`}</td>
                                                                    <td style={{paddingLeft: "20px"}}>{`$ ${(Number(item.price) * Number(item.quantity)).toFixed(2)}`}</td>
                                                                    <td className="action-buttons">
                                                                        <Link className="order-detail-view-btn"
                                                                        to={`/admin/kwetu-trade/panel/special-orders/product/${item.item_number}/detail`}><FontAwesomeIcon icon={faEye}/> view</Link>
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
                                    )
                                    }
                                </Spring>
                            </div>


        }
        return ( 
            <div>{orderDetailDiv}</div>
         );
    }
}
 
export default SpecialOrderDetail;

