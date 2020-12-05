import React from 'react';
import {faEye, faFileDownload} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link} from "react-router-dom"



const CustomerInvoice = (props) => {
    const invoices = props.state.customerInvoices
    return (
        <div>
            <div className="content">
                <h6>List of invoices</h6>
                <table className="table-content" style={{overflowY: "scroll"}}>
                    <thead>
                        <tr>
                            <th>Invoice number</th>
                            <th>Invoice date</th>
                            <th>Order number</th>
                            <th className="action-buttons">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices !== undefined &&
                        <React.Fragment>
                            {
                                invoices.sort(function(x, y){
                                    return y.invoice_number - x.invoice_number
                                }).map(invoice =>
                                    <tr key={invoice.invoice_number}>
                                        <td style={{ paddingLeft: "45px"}}>{invoice.invoice_number}</td>
                                        <td>{`${invoice.invoice_date.slice(0,10)} ${invoice.invoice_date.slice(11,19)}`}</td>
                                        <td style={{ paddingLeft: "55px"}}>{invoice.order_number}</td>
                                        <td className="action-buttons">
                                            <Link to={{pathname: `http://50.116.29.247/invoice/${invoice.invoice_number}/`}} target="_blank" className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                            <Link to={{pathname: `http://50.116.29.247/invoice/${invoice.invoice_number}/?download=True`}} target="_blank" className="secondButton table-content-button"><FontAwesomeIcon icon={faFileDownload}/></Link>
                                        </td>
                                    </tr>
                                    )
                            }
                            <tr>
                                <td colSpan="4">
                                    {invoices.length === 0 && <p style={{textAlign: "center"}}>You have not yet made any invoice</p>}
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
 
export default CustomerInvoice;