import React, {Component} from "react";



class ShoppingCartItem extends Component{
   
    render(){
        const {item, currency} = this.props
        
        return(
            <React.Fragment>
                <tr>
                    <td className="td-img"><img src={"http://50.116.29.247" + item.image} alt="item"/>{item.itemName.slice(0,50)}</td>
                    <td>{currency}{item.price}</td>
                    <td><button onClick={() => this.props.increasingShoppingCartItemQuantity(item)}>+</button></td>
                    <td>{item.quantity}</td>
                    { item.quantity === 0 ? 
                    <td><button  disabled>-</button></td>: 
                    <td><button onClick={() => this.props.decreasingShoppingCartItemQuantity(item)}>-</button></td>}
                    <td>{currency}{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="remove-btn" onClick={() => this.props.removingShoppingCartItem(item)}><button >Remove</button></td>
                </tr>
            </React.Fragment>
        )
    }
}


export default ShoppingCartItem