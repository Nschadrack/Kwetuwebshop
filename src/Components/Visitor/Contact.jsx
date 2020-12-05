import React, { Component } from 'react';


class Contact extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="contact-page">
                <h3>welcome to Kwetu Trade contact page</h3>
                <div className="contact-info">
                    <h2>Office Address</h2>
                    <p>Bwishyura, Karongi, Western Province, RWANDA</p>
                    <h2>Contact address</h2>
                    <p>Tel:  <a href="tel:+250788497091">+250788497091</a></p>
                    <p>Tel:  <a href="tel:+250783476137">+250783476137</a></p>
                    <p>Tel:  <a href="tel:+250788497091">+250788497091</a></p>
                    <p>E-mail: <a href="mailto:kwetutrade@gmail.com">kwetutrade@gmail.com</a></p>
                    <p>E-mail: <a href="mailto:pacifiquentwari77@gmail.com">pacifiquentwari77@gmail.com</a></p>

                </div>
            </div>
         );
    }
}
 
export default Contact;