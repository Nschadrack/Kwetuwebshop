import React from 'react'
import {Link} from 'react-router-dom';

const DropDownCart = (props) => {
    const cart = props.cart
    const items = cart.items
    return ( 
    <React.Fragment>
        {items.length !== 0 ?
        <React.Fragment>
            <div className="cart-items-drop">
                    <ol>
                        {
                          items.map((item, index) => <li key={index}>{`${item.itemName}(x ${item.quantity})`}<span style={{marginLeft: "12px"}}>{`${cart.currency}${item.price * item.quantity}`}</span></li>)  
                        }
                    </ol>
            </div>
            <div className="cart-subtotal-view-cart">
                <p>{`Subtotal:   ${cart.currency}${Number(cart.subTotal).toFixed(2)}`}</p>
                <Link to={'/cart'}>view cart</Link>
            </div>
        </React.Fragment>
        :
        <p style={{marginTop: "-5px", padding: "20px 10px", fontWeight: "bold"}}>your cart is currently empty!</p>
        }
    </React.Fragment>);
}
 
export default DropDownCart;