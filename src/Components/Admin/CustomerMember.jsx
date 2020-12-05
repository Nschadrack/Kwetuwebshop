import React, {Component} from 'react'
import {Spring} from "react-spring/renderprops"
import Title from "./Title"
import ShowEntryAddSearch from "./ShowEntryAddSearch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import Pagination from "../Visitor/Pagination"



// variables declarations
var customerDiv
var deleteWindow

class CustomerMember extends Component {
    state = { showDeleteWindow : false, activeMember: {}}

    setDeleteWindow = (value) =>{
        this.setState({showDeleteWindow: value})
    }
    setActiveMember = (value1, activeMember) =>{
        this.setState({showDeleteWindow: value1, activeMember})
    }
    /* for avoiding erros only */
    handleSetShowAddProduct = (value) =>{
        
    }

    handleSetShowAddProductSetDeleteWindow =(value1, value2) =>{
        
    }

    /* cookie for csrftoken */
    getCookie = (name) =>{
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    deleteCustomer = () =>{
        var url =`http://50.116.29.247/delete/customer/${this.state.activeMember.customer_id}/`
        var csrfToken = this.getCookie('csrftoken')
        fetch(url, {
            method: "DELETE",
            headers:{
                "content-type": "application/json",
                "X-CSRFToken": csrfToken,
            }
        }).then(response =>{
            this.fetchCustomers()
            this.setState({activeMember: {}})
        })
        this.setDeleteWindow(false)
    }
    
    fetchCustomers = () =>{
        var url ="http://50.116.29.247/customers/"
        fetch(url).then(response => response.json())
        .then(data => this.props.customerList(data))
    }
    render() {
        let customers = this.props.currentCustomersPosts        
        // display delete window
        if (this.state.showDeleteWindow){
            deleteWindow = <Spring
            from={{opacity: 0, zIndex: -1}}
            to={{opacity: 1, zIndex: 1}}
            >
                {
                    props =>(
                        <div style={props} className="delete-window-div">
                            <div className="addNewDiv_title">
                                <h4>delete customer</h4>
                                <button onClick={() => this.setDeleteWindow(false)}>x</button>
                            </div>
                            <div className="delete-window-div_body">
                                <p>Do you want to this customer ?</p>
                                <button onClick={() => this.deleteCustomer()}>Delete</button>
                                <button onClick={() => this.setDeleteWindow(false)}>Cancel</button>
                            </div>
                        </div>
                    )
                }

            </Spring>
        }
        else{
            deleteWindow = <div></div>
        }

        if(this.props.OnAnimate){
            customerDiv = <div>
                            <div>
                                <Title title={"Customers"} title2={" / customers / members"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Customer"} onSale={true}
                                onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentCustomersPosts}
                                searchingCoffee={this.props.searchingCoffee}
                                searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                searchingSpecialOrder={this.props.searchingSpecialOrder} category={"customerMember"}
                                searchingInvoice={this.props.searchingInvoice}/>
                                <div className="content">
                                <table className="table-content">
                                        <thead>
                                            <th>image</th>
                                            <th>First Name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>Last Name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>Email<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>Date Joined<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>orders<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th className="action-buttons">options</th>
                                        </thead>
                                        <tbody>
                                            {
                                                customers.map(customer =>
                                                    <tr key={customer.customer_id}>
                                                        <td><img src={"http://50.116.29.247" + customer.profile_pic} alt={'profile picutre'}/></td>
                                                        <td>{customer.user.first_name}</td>
                                                        <td>{customer.user.last_name}</td>
                                                        <td>{customer.user.email}</td>
                                                        <td>{`${customer.user.date_joined.slice(0, 10)} ${customer.user.date_joined.slice(11, 19)}`}</td>
                                                        <td style={{textAlign: "center"}}>{customer.orders.length}</td>
                                                        <td className="action-buttons">
                                                            <Link to={`/admin/kwetu-trade/panel/customer/member/${customer.customer_id}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                            <button className="thirdButton table-content-button" onClick={() => this.setActiveMember(true, customer)}><FontAwesomeIcon icon={faTrash}/></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                                <Pagination postsPerpage={this.props.customerPostsPerPage} totalPosts={this.props.totalCustomers} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
            customerDiv = <div>
            <div>
                <Title title={"Customers"} title2={" / customers"}/>
            </div>
            <Spring
            from={{width:'77%'}}
            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
            config={{delay: 500, duration: 1000}} 
            >
                {
                    props=>(
                            <div className="main-load-data" style={props}>
                                <ShowEntryAddSearch btnTitle={"Customer"} onSale={true}
                                onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentCustomersPosts}
                                searchingCoffee={this.props.searchingCoffee}
                                searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                searchingSpecialOrder={this.props.searchingSpecialOrder} category={"customerMember"}
                                searchingInvoice={this.props.searchingInvoice}/>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <th>image</th>
                                            <th>First Name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>Last Name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>Email<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>Date Joined<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>orders<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th className="action-buttons">options</th>
                                        </thead>
                                        <tbody>
                                        {
                                            customers.map(customer =>
                                                <tr key={customer.customer_id}>
                                                    <td><img src={"http://50.116.29.247" + customer.profile_pic} alt={'profile picutre'}/></td>
                                                    <td>{customer.user.first_name}</td>
                                                    <td>{customer.user.last_name}</td>
                                                    <td>{customer.user.email}</td>
                                                    <td>{`${customer.user.date_joined.slice(0, 10)} ${customer.user.date_joined.slice(11, 19)}`}</td>
                                                    <td style={{textAlign: "center"}}>{customer.orders.length}</td>
                                                    <td className="action-buttons">
                                                        <Link to={`/admin/kwetu-trade/panel/customer/member/${customer.customer_id}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                        <button className="thirdButton table-content-button" onClick={() => this.setActiveMember(true, customer)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                                <Pagination postsPerpage={this.props.customerPostsPerPage} totalPosts={this.props.totalCustomers} paginate={this.props.paginate}/>
                            </div>
                    )
                }
            </Spring>
        </div>                         
        }
        return ( 
            <div>
                {customerDiv}
            </div>
         );
    }
}
 
export default CustomerMember;

