import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops";
import ShowEntryAddSearch from "./ShowEntryAddSearch";
import Title from "./Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from 'axios'
import Pagination from "../Visitor/./Pagination";


var productDiv
var addProductDiv
var deleteWindow
var deleteCoffeeWindow
var weightDiv =<div></div>
var addNewWeightDiv = <div></div>


class Coffee extends Component {
    constructor(){
        super()
        this.state ={
            showAddProduct: false,
            showDeleteWindow: false,
            showDeleteCoffeeWindow: false,
            showWeight: false,
            showNewWeight: false,
            activeCoffee: {
                "id": 0,
                "name": "",
                "image": null,
                "status": "Deactive",
                "description": "",
                "brand": "",
                "coffee_type": "",
                "coffeeweights": [],
                "coffee_shipping_fees": []

            },
            editingCoffee: false,
            activeWeight: {
                "id": 0,
                "unit": "g",
                "quantity":"",
                "price": "",
                "coffee": 0
            },
            editingCoffeeWeight: false,
        }
    }


    componentDidUpdate(prevProps, prevState){
        if (prevProps.currentCoffeePosts === this.props.currentCoffeePosts){
                this.props.onFecthCoffeeList()
        }
    }
    handleSetDeleteWindowItem = (value, activeWeightItem) =>{
        this.setState({showDeleteWindow: value,
            activeWeight:{
                ...this.state.activeWeight,
                "id": activeWeightItem.unit_ID,
                "unit": activeWeightItem.unit,
                "quantity": activeWeightItem.quantity,
                "price": activeWeightItem.price,
                "coffee": activeWeightItem.coffee
            }})
    }

    handleSetDeleteWindow = (value) =>{
        this.setState({showDeleteWindow: value
        })
    }



    handleSetDeleteCoffeeWindow = (value) =>{
        this.setState({showDeleteCoffeeWindow: value})
        if (!value){
         this.setState({
            activeCoffee: {
                "id": 0,
                "name": "",
                "image": null,
                "status": "Deactive",
                "description": "",
                "brand": "",
                "coffee_type": "",
                "coffeeweights": [],
                "coffee_shipping_fees": []
            }
         })  
        }
    }
    


    handleSetShowAddProduct = (value) =>{
        this.setState({showAddProduct: value})
        if (value=== false){
            this.setState({editingCoffee:false})
        }
    }


    handleSetShowAddProductSetDeleteWindow =(value1, value2) =>{
        this.setState({showAddProduct: value1, showDeleteWindow:value2})
    }


    handleSetShowAddProductSetDeleteCoffeeWindow =(value1, value2, activeCoffee) =>{
        this.setState({showAddProduct: value1, showDeleteCoffeeWindow:value2})
        if (activeCoffee !== null && value2) {
            this.setState({
                activeCoffee: {
                    ...this.activeCoffee,
                    "id": activeCoffee.coffee_ID,
                    "name": activeCoffee.name,
                    "image": null,
                    "status": activeCoffee.status,
                    "description": activeCoffee.description,
                    "brand": activeCoffee.brand,
                    "coffee_type": activeCoffee.coffee_type
                }})    
        }
        else{
            this.setState({
                activeCoffee: {
                    "id": 0,
                    "name": "",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "brand": "",
                    "coffee_type": "",
                    "coffeeweights": [],
                    "coffee_shipping_fees": []
                }
            })
        }
    }


    handleSetShowWeight = (showWeightValue, coffee_item) =>{
        this.setState({showWeight:showWeightValue, activeCoffee:coffee_item})
    }


    handleSetShowNewWeight = (value) =>{
        this.setState({showNewWeight:value,
            activeWeight: {
                "id": 0,
                "unit": "g",
                "quantity":"",
                "price": "",
                "coffee": 0
            }})
    }


    handleSetShowWeightDivSetShowNewWeight = (value1, value2) =>{
        this.setState({
            showWeight:value1,
            showNewWeight: value2,
            editingCoffeeWeight: false
        })
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


    /* HANDLE CHANGE ON FORM INPUT FIELDS OF  ADD COFFEE PRODUCT */
    handleProductNameChange = (e) =>{
        var productName = e.target.value 
        this.setState({activeCoffee:{...this.state.activeCoffee, name:productName}})
    }
    handleProductImageChange = (e) =>{
        var productImage = e.target.files[0]
        this.setState({activeCoffee:{...this.state.activeCoffee, image:productImage}})
    }
    handleProductStatusChange = (e) =>{
        var productStatus = e.target.value
        this.setState({activeCoffee:{...this.state.activeCoffee, status:productStatus}})
    }
    handleProductDescriptionChange = (e) =>{
        var productDescription = e.target.value
        this.setState({activeCoffee:{...this.state.activeCoffee, description:productDescription}})
    }
    handleProductBrandChange = (e) =>{
        var productBrand = e.target.value
        this.setState({activeCoffee:{...this.state.activeCoffee, brand:productBrand}})
    }
    handleProductTypeChange = (e) =>{
        var productType = e.target.value
        this.setState({activeCoffee:{...this.state.activeCoffee, coffee_type:productType}})
    }


    /* HANLDE SUBMITTED FORM TO SAVE DATA IN DATABASE ON THE SERVER */
    handleSubmitAddNewCoffee = (event) =>{
        event.preventDefault()
        let form_data = new FormData()
        form_data.append('name', this.state.activeCoffee.name)
        if (!this.state.editingCoffee === true){
            form_data.append('image', this.state.activeCoffee.image, this.state.activeCoffee.image.name)
        }
        form_data.append('status', this.state.activeCoffee.status)
        form_data.append('description', this.state.activeCoffee.description)
        form_data.append('brand', this.state.activeCoffee.brand)
        form_data.append('coffee_type', this.state.activeCoffee.coffee_type)
        var csrfToken = this.getCookie('csrftoken')
        var url = "http://50.116.29.247/add-new/coffee/product/"

            if (this.state.editingCoffee === true){
                url = `http://50.116.29.247/update/coffee/product/${this.state.activeCoffee.id}/`
                this.setState({
                    editingCoffee: false
                    
                })
                fetch(url,{
                    method: "PUT",
                    headers:{
                        'content-type': 'application/json',
                        'X-CSRFToken': csrfToken,
                      },
                      body: JSON.stringify(this.state.activeCoffee)
                }).then(response =>{
                    this.setState(
                    {activeCoffee: {
                    "id": 0,
                    "name": "",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "brand": "",
                    "coffee_type": "",
                    "coffeeweights": [],
                    "coffee_shipping_fees": []
                }})})
                .catch(errors => console.log("ERRORS:", errors))
                this.handleSetShowAddProduct(false)
            }
            else{
            axios.post(url, form_data, {
                headers:{
                    'content-type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                }
            }).then(response =>{
                this.setState(
                {activeCoffee: {
                "id": 0,
                "name": "",
                "image": null,
                "status": "Deactive",
                "description": "",
                "brand": "",
                "coffee_type": "",
                "coffeeweights": [],
                "coffee_shipping_fees": []
            }})})
            .catch(errors => console.log("ERRORS:", errors))

            this.handleSetShowAddProduct(false)
    }        
    }

    /* WHEN GOING TO UPDATE COFFEE PRODUCT */
    startEditingCoffeeProduct = (value1, value2, activeCoffeeitem) =>{
        this.setState({
            activeCoffee: {
                ...this.activeCoffee,
                "id": activeCoffeeitem.coffee_ID,
                "name": activeCoffeeitem.name,
                "image": null,
                "status": activeCoffeeitem.status,
                "description": activeCoffeeitem.description,
                "brand": activeCoffeeitem.brand,
                "coffee_type": activeCoffeeitem.coffee_type
            },
            editingCoffee: true,
            showAddProduct: value1,
            showDeleteCoffeeWindow:value2
        })
    }



    /* DELETING COFFEE PRODUCT */
    deleteCoffeeProduct = (coffeeItem) =>{
        var url = `http://50.116.29.247/delete/coffee/product/${coffeeItem.id}/`
        var csrfToken = this.getCookie('csrftoken')

        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type' : 'application/json',
                'X-CSRFToken': csrfToken,
            }
        }).then(response => response.json())
        .then(data =>{
            this.setState(
                {activeCoffee: {
                "id": 0,
                "name": "",
                "image": null,
                "status": "Deactive",
                "description": "",
                "brand": "",
                "coffee_type": "",
                "coffeeweights": [],
                "coffee_shipping_fees": []
            }})
            this.handleSetDeleteCoffeeWindow(false)
            alert(data["answer"])
        })
    }


     /* HANDLE CHANGE ON FORM INPUT FIELDS OF  ADD COFFEE WEIGHT PRODUCT */
     handleWeightQuantity = (e) =>{
        var productQuantity = e.target.value 
        this.setState({activeWeight:{...this.state.activeWeight, quantity:productQuantity}})
    }
    handleWeightUnit = (e) =>{
        var productUnit = e.target.value 
        this.setState({activeWeight:{...this.state.activeWeight, unit:productUnit}})
    }
    handleWeightPrice = (e) =>{
        var productPrice = e.target.value 
        this.setState({activeWeight:{...this.state.activeWeight, 
            price:productPrice, coffee: this.state.activeCoffee.coffee_ID}})
    }


    /*  WORKING ON HANDLE WEIGHTS  */
    handleSubmitNewWeight = (event) =>{
        event.preventDefault()
        var url = `http://50.116.29.247/coffee/product/${this.state.activeWeight.coffee}/add/weight/`
        var csrfToken = this.getCookie('csrftoken')
        var method_allowed = "POST"
        var alertMessage = "Weight has been added, view weight again to see it!"

        if (this.state.editingCoffeeWeight){
            url = `http://50.116.29.247/coffee/product/update/weight/${this.state.activeWeight.id}/` 
            method_allowed = "PUT"
            alertMessage = "Weight has been updated, view weight again to see it!"
            this.setState({
                activeWeight: {
                    "id": 0,
                    "unit": "g",
                    "quantity":"",
                    "price": "",
                    "coffee": 0
                },
                editingCoffeeWeight: false
            })
        }

        fetch(url, {
            method: method_allowed,
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(this.state.activeWeight)
        }).then(repsonse => this.setState({
            activeWeight: {
                "id": 0,
                "unit": "g",
                "quantity":"",
                "price": "",
                "coffee": 0
            },
            showNewWeight: false,
            showWeight:false
        })).then(data => alert(alertMessage))
        .catch(errors => console.log("Errors :", errors))
    }

    startEditingWeight = (value, activeWeight) =>{
        this.setState({showNewWeight:value,
            editingCoffeeWeight:true,
            activeWeight: {...this.state.activeWeight,
                "id": activeWeight.unit_ID,
                "unit": activeWeight.unit,
                "quantity":activeWeight.quantity,
                "price": activeWeight.price,
                "coffee": activeWeight.coffee
            }})
    }

    deleteCoffeeWeight = (activeWeightItem) =>{
        var url = `http://50.116.29.247/coffee/product/delete/weight/${activeWeightItem.id}/`
        var csrfToken = this.getCookie('csrftoken')

        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type' : 'application/json',
                'X-CSRFToken': csrfToken,
            }
        }).then(response => this.setState({
            activeWeight: {
                "id": 0,
                "unit": "g",
                "quantity":"",
                "price": "",
                "coffee": 0
            },
            showWeight:false
        },
        alert("Weight has been deleted, view weight again to see it the action completed!")))

        this.handleSetDeleteWindow(false)
    
    }

    render() {
        if(this.state.showWeight){
            weightDiv = <Spring from={{opacity: 0, zIndex:-1}} to={{opacity: 1, zIndex:1}}>
                            {
                            props =>(
                            <div className="weight-div" style={props}>
                                <div className="addNewDiv_title">
                                    <h4>coffee weights and prices</h4>
                                    <button onClick={() => this.handleSetShowWeightDivSetShowNewWeight(false, false)}>x</button>
                                </div>
                                <div className="weight-div-body">
                                    {this.state.activeCoffee.coffeeweights.length !==0 ?
                                    <React.Fragment>
                                        <p>{`${this.state.activeCoffee.name}  ${this.state.activeCoffee.brand}  ${this.state.activeCoffee.classification} weights and prices`}</p>
                                        <div className="bind-weight-table">
                                            <table className="weight-div-table">
                                                <thead>
                                                    <tr>
                                                        <th>Quantity</th>
                                                        <th>Unit</th>
                                                        <th>Price</th>
                                                        <th>action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.activeCoffee.coffeeweights.map(weight =>(
                                                        <tr key={weight.quantity}>
                                                            <td>{weight.quantity}</td>
                                                            <td>{weight.unit}</td>
                                                            <td>{`${weight.price}  ${this.state.activeCoffee.currency}`}</td>
                                                            <td><button className="secondButton table-content-button" onClick={() => this.startEditingWeight(true, weight)}><FontAwesomeIcon icon={faEdit}/></button>
                                                            <button className="thirdButton  table-content-button" onClick={() => this.handleSetDeleteWindowItem(true, weight)}><FontAwesomeIcon icon={faTrash}/></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <p>no weights recorded for {`${this.state.activeCoffee.name}  ${this.state.activeCoffee.brand}  
                                    ${this.state.activeCoffee.classification}`}</p>
                                    }
                                    <button className="new-price-weight" onClick={() => this.handleSetShowNewWeight(true)}>New price weight</button>
                                </div>
                                <div>{addNewWeightDiv}</div>
                                <div>{deleteWindow}</div>
                            </div>
                            )}
            </Spring>        
        }
        else{
            weightDiv = <div className="weight-div">
                            
                        </div>
        }

        if(this.state.showNewWeight){
            addNewWeightDiv = <Spring from={{opacity: 0}} to={{opacity: 1}}>
                                {
                                props => (
                                <div style={props} className="new-weight-div">
                                    <div className="addNewDiv_title">
                                        {this.state.editingCoffeeWeight === false ?
                                            <h4>New weight price</h4>
                                        :
                                            <h4>Updating weight price</h4>
                                        }
                                        <button onClick={() => this.handleSetShowNewWeight(false)}>x</button>
                                    </div>
                                    <div className="new-weight-form">
                                        <form onSubmit={this.handleSubmitNewWeight}>
                                            <input type="number"  required name="quantiy_weight" placeholder="package quantity(ex: 250)" autoComplete="off" defaultValue={this.state.activeWeight.quantity}
                                            min={"0"}  onChange={this.handleWeightQuantity}/>
                                            <input type="text" name="unit_weight" required autoComplete="off" defaultValue={this.state.activeWeight.unit}
                                             onChange={this.handleWeightUnit} disabled/>
                                            <input type="number"  required name="price_weight" placeholder="package price" autoComplete="off" defaultValue={this.state.activeWeight.price}
                                             min={"0"} step={"0.01"} onChange={this.handleWeightPrice}/>
                                            <button>Save</button>
                                        </form>
                                    </div>
                                </div>
                                )}
            </Spring>
            
        }
        else{
            addNewWeightDiv = <div></div>
        }


        if (this.state.showDeleteWindow){
            deleteWindow = <Spring from={{opacity: 0, zIndex: -1}} to={{opacity: 1, zIndex: 1}}>
                {
                    props =>(
                    <div style={props} className="delete-window-div">
                        <div className="addNewDiv_title">
                            <h4>delete weight price</h4>
                            <button onClick={() => this.handleSetDeleteWindow(false)}>x</button>
                        </div>
                        <div className="delete-window-div_body">
                            <p>Do you want to this weight price ?</p>
                            <button onClick={() => this.deleteCoffeeWeight(this.state.activeWeight)}>Delete</button>
                            <button onClick={() => this.handleSetDeleteWindow(false)}>Cancel</button>
                        </div>
                    </div>
                    )
                }
            </Spring>
        }
        else{
            deleteWindow = <div></div>
        }




        if (this.state.showDeleteCoffeeWindow){
            deleteCoffeeWindow = <Spring from={{opacity: 0, zIndex: -1}} to={{opacity: 1, zIndex: 1}}>
                {
                    props =>(
                    <div style={props} className="delete-window-div">
                        <div className="addNewDiv_title">
                            <h4>deleting coffee product</h4>
                            <button onClick={() => this.handleSetDeleteCoffeeWindow(false)}>x</button>
                        </div>
                        <div className="delete-window-div_body">
                            <p>Do you want to this coffee product ?</p>
                            <button onClick={() => this.deleteCoffeeProduct(this.state.activeCoffee)}>Delete</button>
                            <button onClick={() => this.handleSetDeleteCoffeeWindow(false)}>Cancel</button>
                        </div>
                    </div>
                    )
                }
            </Spring>
        }
        else{
            deleteCoffeeWindow = <div></div>
        }

        if (this.state.showAddProduct){
            addProductDiv = <Spring from={{zIndex:-1, opacity: 0}} to={{zIndex:19, opacity:1}}>
                    {
                        props => (
                            <div className="addNewDiv" style={props}>
                                <div className="addNewDiv_title">
                                    {this.state.editingCoffee === false ? 
                                        <h4>Adding new product coffee</h4>
                                    :
                                        <h4>Updating product coffee</h4>
                                    }
                                    <button onClick={() =>this.handleSetShowAddProduct(false)}>x</button>
                                </div>
                                <div className="addNewDiv_body">
                                    <form className="addNewDiv_body_form" onSubmit={this.handleSubmitAddNewCoffee}>
                                        <input type="text" placeholder="product name" required name="product_name" autoComplete="off" defaultValue={this.state.activeCoffee.name}
                                        onChange={this.handleProductNameChange} maxLength={"30"}/>
                                        <input type="text" placeholder="product brand" required name="product_brand" autoComplete="off" defaultValue={this.state.activeCoffee.brand}
                                        onChange={this.handleProductBrandChange} maxLength={"30"}/>
                                        <input type="text" placeholder="product type" required name="product_type" autoComplete="off" defaultValue={this.state.activeCoffee.coffee_type}
                                        onChange={this.handleProductTypeChange} maxLength={"30"}/>
                                        <select name="product_status" defaultValue={this.state.activeCoffee.status}onChange={this.handleProductStatusChange}>
                                            <option>Active</option>
                                            <option>Deactive</option>
                                        </select>
                                        <textarea placeholder="product description"  name="product_description" defaultValue={this.state.activeCoffee.description}
                                        onChange={this.handleProductDescriptionChange} required minLength={"100"}></textarea>
                                        {!this.state.editingCoffee && 
                                        <React.Fragment>
                                        <p>Product image to appear to customers</p>
                                        <input type="file" required name="coffee_profile_image" onChange={this.handleProductImageChange}
                                        accept="image/*"/>
                                        </React.Fragment>
                                        }
                                        {!this.state.editingCoffee?
                                        <button>Save</button>
                                        :
                                        <button style={{marginTop: "30px"}}>Save Changes</button>
                                        }
                                    </form>
                                </div>
                            </div>
                        )
                    }
            </Spring>
        }
        else{
            addProductDiv = <div></div>                               
        }

        if(this.props.OnAnimate){
            productDiv = <div>
                            <div>
                                <Title title={"Products - Coffee"} title2={" / products / coffee"}  OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Product"} onSetShowAddProduct = {this.handleSetShowAddProduct} 
                                onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentCoffeePosts} searchingCoffee={this.props.searchingCoffee}
                                searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer} 
                                searchingSpecialOrder={this.props.searchingSpecialOrder} category={"coffee"}
                                searchingInvoice={this.props.searchingInvoice}/>
                                <div className="clearboth"></div>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Category<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>type</th>
                                                <th>Added Date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Sell Price</th>
                                                <th>Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.currentCoffeePosts.map(coffee_item =>(
                                                <tr key={coffee_item.coffee_ID}>
                                                    <td><img src={"http://50.116.29.247" + coffee_item.image} alt="coffee"/> {coffee_item.name}</td>
                                                    <td>{coffee_item.classification}</td>
                                                    <td>{coffee_item.coffee_type}</td>
                                                    <td>{coffee_item.added_date}</td>
                                                    <td><button className="view-sell-price" onClick={() => this.handleSetShowWeight(true, coffee_item)}>view</button></td>          
                                                    <td><span className={coffee_item.status}>{coffee_item.status}</span></td>
                                                    <td className="action-buttons">
                                                        <Link to={`/admin/kwetu-trade/panel/coffee/detail/${coffee_item.coffee_ID}`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                        <button className="secondButton table-content-button" onClick={() => this.startEditingCoffeeProduct(true, false, coffee_item)}><FontAwesomeIcon icon={faEdit}/></button>
                                                        <button className="thirdButton  table-content-button" onClick={() => this.handleSetShowAddProductSetDeleteCoffeeWindow(false, true, coffee_item)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {deleteCoffeeWindow}
                                <Pagination postsPerpage={this.props.coffeePostsPerPage} totalPosts={this.props.totalCoffeePost} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
            productDiv = <div>
                            <div>
                                <Title title={"Products - Coffee"} title2={" / products / coffee"}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}>
                                {
                                    props => (
                                    <div className="main-load-data" style={props}>
                                        <ShowEntryAddSearch btnTitle={"Product"} onSetShowAddProduct = {this.handleSetShowAddProduct}
                                        onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                        setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentCoffeePosts} searchingCoffee={this.props.searchingCoffee}
                                        searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal} 
                                        searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer} 
                                        searchingSpecialOrder={this.props.searchingSpecialOrder} category={"coffee"}
                                        searchingInvoice={this.props.searchingInvoice}/>
                                        <div className="clearboth"></div>
                                        <div className="content">
                                        <table className="table-content">
                                                <thead>
                                                    <tr>
                                                        <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Category<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>type</th>
                                                        <th>Added Date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Sell Price</th>
                                                        <th>Status</th>
                                                        <th className="action-buttons">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.currentCoffeePosts.map(coffee_item =>(
                                                        <tr key={coffee_item.coffee_ID}>
                                                            <td><img src={"http://50.116.29.247" + coffee_item.image} alt="profile"/> {coffee_item.name}</td>
                                                            <td>{coffee_item.classification}</td>
                                                            <td>{coffee_item.coffee_type}</td>
                                                            <td>{coffee_item.added_date}</td>
                                                            <td><button className="view-sell-price" onClick={() => this.handleSetShowWeight(true, coffee_item)}>view</button></td>          
                                                            <td><span className={coffee_item.status}>{coffee_item.status}</span></td>
                                                            <td className="action-buttons">
                                                                <Link to={`/admin/kwetu-trade/panel/coffee/detail/${coffee_item.coffee_ID}`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                                <button className="secondButton table-content-button" onClick={() => this.startEditingCoffeeProduct(true, false, coffee_item)}><FontAwesomeIcon icon={faEdit}/></button>
                                                                <button className="thirdButton  table-content-button" onClick={() => this.handleSetShowAddProductSetDeleteCoffeeWindow(false, true, coffee_item)}><FontAwesomeIcon icon={faTrash}/></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                        {deleteCoffeeWindow}
                                        <Pagination postsPerpage={this.props.coffeePostsPerPage} totalPosts={this.props.totalCoffeePost} paginate={this.props.paginate}/>
                                    </div>
                                    )
                                }

                            </Spring>
                            
                        </div>
        }
        return ( 
            <div>
                {productDiv}
                {addProductDiv}
                {weightDiv}
            </div>
         );
    }
}
 
export default Coffee;

