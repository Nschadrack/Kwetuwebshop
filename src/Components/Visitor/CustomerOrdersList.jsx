import React from 'react';
import {faEye} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link} from "react-router-dom"



const CustomerOrdersList = (props) => {
    return ( 
        <div>
            <div className="content">
                <h6>List of orders I have made</h6>
                <table className="table-content" style={{overflowY: "scroll"}}>
                    <thead>
                        <tr>
                            <th>Order.No</th>
                            <th>date ordered</th>
                            <th>quantity ordered</th>
                            <th>shipping</th>
                            <th>amount ordered</th>
                            <th>Order Status</th>
                            <th className="action-buttons">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.orders !== undefined &&
                        <React.Fragment>
                            {
                                props.orders.sort(function(x,y){
                                    return y.order_number - x.order_number
                                }).map(order =>
                                    <tr key={order.order_number}>
                                        <td>{order.order_number}</td>
                                        <td>{`${order.ordered_date.slice(0,10)} ${order.ordered_date.slice(11,16)}`}</td>
                                        <td style={{textAlign: "center"}}>{order.quantity_ordered}</td>
                                        <td style={{textAlign: "center"}}>{`$ ${order.shipping_fee}`}</td>
                                        <td style={{textAlign: "center"}}>{`$ ${order.amount_ordered}`}</td>
                                        <td><span className={order.order_status === "out for delivery" ? "out_for_delivery" : order.order_status} style={{padding: "5px 15px"}}>{order.order_status}</span></td>
                                        <td className="action-buttons">
                                            <Link to={`/${props.activeUser.first_name}-${props.activeUser.last_name}/account/order/${order.order_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                        </td>
                                    </tr>
                                    )
                            }
                            <tr>
                                <td colSpan="7">
                                    {props.orders.length === 0 && <p style={{textAlign: "center"}}>You have not yet made any order</p>}
                                </td>
                            </tr>
                        </React.Fragment>
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default CustomerOrdersList;