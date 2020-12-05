import React, {Component} from "react";


class OrderItems extends Component{
   
    render(){
        const {item, currency} = this.props
        
        return(
            <React.Fragment>
                <tr>
                    <td className="td-img"><img src={"http://50.116.29.247" + item.image} alt="item"/>{item.itemName}</td>
                    <td>{currency}{item.price}</td>
                    <td style={{textAlign: "center"}}>{item.quantity}</td>
                    <td style={{borderRight: "1px solid rgb(140,140,140)"}}>{currency}{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            </React.Fragment>
        )
    }
}


export default OrderItems