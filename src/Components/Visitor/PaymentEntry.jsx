import React from 'react';
import { FlutterWaveButton } from 'flutterwave-react-v3';
 
const PaymentEntry = (props) =>{
   const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_LIVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: props.groundTotalTobePaid,
    currency: 'USD',
    payment_options: 'card',
    customer: {
      email: props.customerEmail,
      phonenumber: props.customerPhone,
      name: props.customerName,
    },
    customizations: {
      title: 'Kwetu Trade',
      description: 'Payment for order at kwetu trade',
      logo: 'https://cdn.filestackcontent.com/1ZO0hckTQ6u43OmWP5IJ',
    },
  };
 
  const fwConfig = {
    ...config,
    text: 'Pay now',
    callback: (response) => {
      console.log(response);
      if(response.status === "successful"){
        props.setOrderpaid(true)
        hideIframe("iframe")
      }
      else{
        props.setOrderpaid(false)
      }
    },
    onClose: () => {
      props.setOrderpaid(false)
    },
  };

  const hideIframe = (elementName) =>{
      var elements = document.getElementsByTagName(elementName)
      if(elements.length !== 0){
        for(var i = 0; i< elements.length; i++){
          elements[i].style.display = "none"
        }
      }
  }
 
  return (
    <div className="PaymentEntry">
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}


export default PaymentEntry


