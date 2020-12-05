import React, { Component } from 'react';
import {Spring} from "react-spring/renderprops";
import Title from "./Title";
import {Link} from "react-router-dom";

var notificationsDiv

class Notifications extends Component {
    state = { 

     }
    render() { 
        if(this.props.OnAnimate){
            notificationsDiv = <div>
                            <div>
                                <Title title={"Notifications"} title2={" / notifications"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                            {(this.props.newOrders.length + this.props.newSpecialOrders.length) !==0 ?
                            <React.Fragment>
                                {this.props.newOrders !== undefined && this.props.newOrders.length !== 0 &&
                                    this.props.newOrders.map(order =>
                                        <Link to="/admin/kwetu-trade/panel/orders" >You have received new order and it is pending<br/><br/></Link>)
                                }
                                {this.props.newSpecialOrders !== undefined && this.props.newSpecialOrders.length !== 0 &&
                                    this.props.newSpecialOrders.map(order =>
                                        <Link to="/admin/kwetu-trade/panel/special-orders" >You have received new special order and it is pending<br/><br/></Link>)
                                }
                            </React.Fragment>
                            :
                                <p>You don't have notifications at this time</p>
                            }
                            </div>
                        </div>
        }
        else{
            notificationsDiv = <div>
                            <div>
                                <Title title={"Notifications"} title2={" / notifications"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay:1000, duration: 500}}>
                                {
                                    props=>(
                                        <div className="main-load-data" style={props}>
                                            {(this.props.newOrders.length + this.props.newSpecialOrders.length) !==0 ?
                                                <React.Fragment>
                                                    {this.props.newOrders !== undefined && this.props.newOrders.length !== 0 &&
                                                        this.props.newOrders.map(order =>
                                                            <Link to="/admin/kwetu-trade/panel/orders" >You have received new order and it is pending<br/><br/></Link>)
                                                    }
                                                    {this.props.newSpecialOrders !== undefined && this.props.newSpecialOrders.length !== 0 &&
                                                        this.props.newSpecialOrders.map(order =>
                                                            <Link to="/admin/kwetu-trade/panel/special-orders" >You have received new special order and it is pending<br/><br/></Link>)
                                                    }
                                                </React.Fragment>
                                                :
                                                    <p>You don't have notifications at this time</p>
                                                }
                                                            </div>
                                                        )
                                            }
                            </Spring>                            
                        </div>
        }
        return ( 
            <div>{notificationsDiv}</div>
         );
    }
}
 
export default Notifications;
