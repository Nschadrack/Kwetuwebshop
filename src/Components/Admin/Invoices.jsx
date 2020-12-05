import React, { Component } from 'react';
import {Spring} from "react-spring/renderprops";
import Title from "./Title";
import ShowEntryAddSearch from "./ShowEntryAddSearch";
import {faEye, faFileDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import Pagination from "../Visitor/Pagination";


var invoiceDiv

class Invoices extends Component {
    
     handleSetShowAddProduct = (value) =>{
        
    }
    handleSetShowAddProductSetDeleteCoffeeWindow =(value1, value2, activeCoffee) =>{
        
    }

    render() { 
        const invoices = this.props.currentInvoicesPosts
        if(this.props.OnAnimate){
            invoiceDiv = <div>
                            <div>
                                <Title title={"Invoices"} title2={" / invoices"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Product"} onSale={"false"} onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentInvoicesPosts} searchingCoffee={this.props.searchingCoffee}
                                searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer} 
                                searchingSpecialOrder={this.props.searchingSpecialOrder} category={"invoice"}
                                searchingInvoice={this.props.searchingInvoice}/>

                                <div className="content">
                                    <table className="table-content">
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
                                <Pagination postsPerpage={this.props.invoicesPostsPerPage} totalPosts={this.props.totalInvoicesPost} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
           invoiceDiv = <div>
                            <div>
                                <Title title={"Invoices"} title2={" / invoices"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay:1000, duration: 500}}>
                                {
                                    props=>(
                                        <div className="main-load-data" style={props}>
                                            <ShowEntryAddSearch btnTitle={"Product"} onSale={"false"} onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                            onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                            setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentInvoicesPosts} searchingCoffee={this.props.searchingCoffee}
                                            searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                            searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer} 
                                            searchingSpecialOrder={this.props.searchingSpecialOrder} category={"invoice"}
                                            searchingInvoice={this.props.searchingInvoice}/>
                                            
                                            <div className="content">
                                                <table className="table-content">
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
                                            <Pagination postsPerpage={this.props.invoicesPostsPerPage} totalPosts={this.props.totalInvoicesPost} paginate={this.props.paginate}/>
                                        </div>
                                    )
                                }
                            </Spring>                            
                        </div>
        }
        return ( 
            <div>{invoiceDiv}</div>
         );
    }
}
 
export default Invoices;
