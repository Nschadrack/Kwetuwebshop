import React, { Component } from 'react';

class Confirmation extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="confirmation-message">
                <h2>Thanks for making your order with Kwetu Trade</h2>
                <div className="confirmation-invoice">
                    <p>You can navigate to your account on invoices made section and see your invoices</p>
                </div>
            </div>
         );
    }
}
 
export default Confirmation;