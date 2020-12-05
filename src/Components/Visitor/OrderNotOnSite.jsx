import React, { Component } from 'react';
import {Spring} from "react-spring/renderprops";
import axios from "axios"


class OrderNotOnSite extends Component {
    state = {
        orderItem:{
            name: "",
            unit: "",
            price: "",
            quantity: "",
            image: null,
            description: ""
        },
        orderAddress:{
            email: "",
            phone: "",
            country: "",
            province: ""
        },
        showWelcomeMessage: true,
        showAddItemsForm: false,
        showAddressForm: false,
        showAddressSummary: false,
        showConfirmationMessage: false,
        hideRemoveButton: true
     }

    /* handle changes on order item form fields */
     handleChangeOnName = (e) =>{
        this.setState({...this.state, orderItem: {...this.state.orderItem, name: e.target.value}})
     }
     handleChangeOnUnit = (e) =>{
        this.setState({...this.state, orderItem: {...this.state.orderItem, unit: e.target.value}})
     }
     handleChangeOnPrice = (e) =>{
        this.setState({...this.state, orderItem: {...this.state.orderItem, price: e.target.value}})
     }
     handleChangeOnQuantity = (e) =>{
        this.setState({...this.state, orderItem: {...this.state.orderItem, quantity: e.target.value}})
     }
     handleChangeOnImage = (e) =>{
         var productImage = e.target.files[0]
            this.setState({...this.state, orderItem: {...this.state.orderItem, image: productImage}})
     }
     handleChangeOnDescription = (e) =>{
        this.setState({...this.state, orderItem: {...this.state.orderItem, description: e.target.value}})
     }

     /* handle changes on order address form fields */
     handleChangeOnCountry = (e) =>{
        this.setState({...this.state.orderAddress, orderAddress: {...this.state.orderAddress, country: e.target.value}})
     }
     handleChangeOnProvince = (e) =>{
        this.setState({...this.state.orderAddress, orderAddress: {...this.state.orderAddress, province: e.target.value}})
     }
     handleChangeOnEmail = (e) =>{
        this.setState({...this.state.orderAddress, orderAddress: {...this.state.orderAddress, email: e.target.value}})
     }
     handleChangeOnPhone = (e) =>{
        this.setState({...this.state.orderAddress, orderAddress: {...this.state.orderAddress, phone: e.target.value}})
     }


     setShowWelcomeMessage = () =>{
         this.setState({showWelcomeMessage: false, showAddItemsForm:true})
     }
     setShowAddItemForm = () =>{
         this.setState({showAddItemsForm: false, showAddressForm: true, hideRemoveButton:false})
     }
     setShowAddressForm = () =>{
         this.setState({showAddressForm: false, showAddressSummary: true, hideRemoveButton: false})
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

     setShowConfirmationMessage =()=>{
        //  send axios request to the server for saving the order
        let data = new FormData()
        let customerId = this.props.specialOrder.customerId
        let amountOrdered = this.props.specialOrder.amountOrdered
        let quantityOrdered = this.props.specialOrder.quantityOrdered
        let orderedItems = this.props.specialOrder.orderItems
        let orderAddress = this.props.specialOrder.orderAddress
        

        data.append('customerId', customerId)
        data.append('amountOrdered', amountOrdered)
        data.append('quantityOrdered', quantityOrdered)
        data.append("email", orderAddress.email)
        data.append("phone", orderAddress.phone)
        data.append("country", orderAddress.country)
        data.append("province", orderAddress.province)
        data.append("numberOfItems", orderedItems.length)
        
        for(let i=0; i<orderedItems.length; i++){
            data.append(`name_${i}`, orderedItems[i].name)
            data.append(`unit_${i}`, orderedItems[i].unit)
            data.append(`price_${i}`, orderedItems[i].price)
            data.append(`quantity_${i}`, orderedItems[i].quantity)
            if(orderedItems[i].image !== undefined && orderedItems[i].image !== null)
                data.append(`image_${i}`, orderedItems[i].image, orderedItems[i].image.name)
            else
                data.append(`image_${i}`, orderedItems[i].image) 
            data.append(`description_${i}`, orderedItems[i].description)
        }
        
        
        var csrfToken = this.getCookie('csrftoken')
        var url = "http://50.116.29.247/create/new/special-order/"

        axios.post(url, data, {
            headers:{
                'content-type': 'multipart/form-data',
                'X-CSRFToken': csrfToken,
            }
        })
        .then(response => this.props.updateSpecialOrderList(response.data))
         this.setState({showAddressSummary: false, showConfirmationMessage: true})
     }

    handleSubmittedItems = (e) =>{
        e.preventDefault()
        this.props.addSpecialOrderItem(this.state.orderItem)
        e.target.elements.product_name.value = ""
        e.target.elements.unit.value = ""
        e.target.elements.price.value = ""
        e.target.elements.quantity.value = ""
        e.target.elements.description.value = ""
        e.target.elements.image.value = ""
        
     }
    handleAddressSubmitted = (e) =>{
        e.preventDefault()
        this.props.addSpecialOrderCustomerId(this.props.activeUser.id)
        this.props.addSpecialOrderAddress(this.state.orderAddress)
        this.setShowAddressForm()
    }
    render() {
        const orderItems = this.props.specialOrder.orderItems
        var toProps = {opacity: 1}
        var configProps={duration: 0, delay: 0}
        if(this.state.showWelcomeMessage === false){
            toProps = {opacity: 0, display: "none"}
            configProps={duration: 1000, delay: 500}
        }
        return ( 
            <div className="order-not-on-site">
                <Spring
                from={{opacity: 1}}
                config={configProps}
                to={toProps}
                >
                   {
                       props =>(
                           <div style={props}>
                                <h2>Hello dear <span>{`${this.props.activeUser.first_name} ${this.props.activeUser.last_name}`}</span>, welcome to Kwetu Trade Special Order place.</h2>
                                <p>Through this place, you can order any product you want that you didn't find on our main praducts page</p>
                                <p>Feel free to place your order with prices you want which we will negotiate with when we receive your order, 
                                    and we will contact you as soon as possible to confirm you with order prices you have specified.</p>

                                <button onClick={this.setShowWelcomeMessage}>Starting placing your order</button>
                           </div>
                       )
                   } 
                </Spring>
                {this.state.showConfirmationMessage === false && this.props.specialOrder.orderItems.length !== 0 &&
                    <div className="order-items-list">
                    <table className="cart-items-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Unit</th>
                                <th>Total price</th>
                                {this.state.hideRemoveButton === true &&
                                    <th></th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                           {
                               orderItems.map(item =>
                                <tr key={item.itemId}>
                                    <td>{item.name.length > 50 ? `${item.name.slice(0, 50)} ...` : item.name}</td>
                                    <td>{`$${(Number(item.price)).toFixed(2)}`}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unit}</td>
                                    <td>{`$${(Number(item.price) * Number(item.quantity)).toFixed(2)}`}</td>
                                    {this.state.hideRemoveButton === true &&
                                        <td onClick={() => this.props.removeSpecialOrderItem(item)}><button>remove</button></td>
                                    }
                                </tr>)
                           } 
                           {this.state.hideRemoveButton === true ?
                            <tr style={{fontWeight: "bold"}}>
                                <td colSpan="3" style={{fontWeight: "bold"}}>Total amount to order</td>
                                <td colSpan="3" style={{fontWeight: "bold"}}>{`$${(Number(this.props.specialOrder.amountOrdered)).toFixed(2)}`}</td>
                            </tr>
                            :
                                <tr>
                                    <td colSpan="3" style={{fontWeight: "bold"}}>Total amount to order</td>
                                    <td colSpan="2" style={{fontWeight: "bold"}}>{`$${(Number(this.props.specialOrder.amountOrdered)).toFixed(2)}`}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    </div>
                }
                {this.state.showAddItemsForm === true &&
                    <div className="product-form-add">
                        <form onSubmit={this.handleSubmittedItems}>
                            <input type="text" maxLength="90" placeholder="Order product name" required autoComplete="off" onChange={this.handleChangeOnName} name="product_name"/>
                            <input type="text" maxLength="20" placeholder="Order unit quantity" required  autoComplete="off" onChange={this.handleChangeOnUnit} name="unit"/>
                            <input type="text" defaultValue="currency($) USD" disabled/>
                            <input type="number" step="0.01" required placeholder="Order unit price"  autoComplete="off" onChange={this.handleChangeOnPrice} name="price"/>
                            <input type="number" step="0.01" min="0" placeholder="Quantity to order" required  autoComplete="off" onChange={this.handleChangeOnQuantity} name="quantity"/>
                            <textarea rows="6" onChange={this.handleChangeOnDescription} name="description">  

                            </textarea>
                            <input type="file" onChange={this.handleChangeOnImage} name="image" accept="image/*"/>
                            {this.props.specialOrder.orderItems.length !== 0 ?
                                <button>Add new product</button>
                            :
                                <button>Add product</button>
                            }
                        </form>
                        {this.props.specialOrder.orderItems.length !== 0 &&
                            <button className="done-to-add-products" onClick={this.setShowAddItemForm}>Done to add products</button>
                        }
                    </div>
                }
                {this.state.showAddressForm === true &&
                    <div className="address-form-order">
                        <h4>Provide your contact address where we will contact you for negotiating on your order</h4>
                        <form onSubmit={this.handleAddressSubmitted}>
                            <input type="text" placeholder="your residence country" maxLength="30" required  autoComplete="off" onChange={this.handleChangeOnCountry}/>
                            <input type="text" placeholder="province or state" maxLength="30" required  autoComplete="off" onChange={this.handleChangeOnProvince}/>
                            <input type="email" placeholder="your contact email address" maxLength="60" required  autoComplete="off" onChange={this.handleChangeOnEmail}/>
                            <input type="text" placeholder="your phone number with your country code" minLength="10" maxLength="14" required  autoComplete="off" onChange={this.handleChangeOnPhone}/>
                            <button>Confirm address</button>
                        </form>
                    </div>
                }
                {this.state.showAddressSummary === true &&
                    <div className="address-summary">
                        <h4>This is the address summary you have provided to be contact on for your order</h4>
                        <p><span>Country of residence: </span>{this.state.orderAddress.country}</p>
                        <p><span>Province/State: </span>{this.state.orderAddress.province}</p>
                        <p><span>E-mail: </span>{this.state.orderAddress.email}</p>
                        <p><span>Telphone: </span>{this.state.orderAddress.phone}</p>
                        <button onClick={this.setShowConfirmationMessage}>Place your order</button>
                    </div>
                }
                {this.state.showConfirmationMessage === true &&
                    <h6>Thank you dear <span>{`${this.props.activeUser.first_name} ${this.props.activeUser.last_name}`}</span> for placing your special order with Kwetu Trade, we will contact you as soon as possible for further process on your order!</h6>
                }
            </div>
         );
    }
}
 
export default OrderNotOnSite;