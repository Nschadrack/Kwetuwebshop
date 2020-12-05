import React, {Component} from 'react'
import {Spring} from "react-spring/renderprops"
import Title from "./Title"
import AllCountries from '../Visitor/AllCountries'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


var productDetailDiv
var coffeeShippingDiv

class CoffeeDetail extends Component {
    state = { 
        coffeeDetail: null,
        activeShippingFee:{
            "shippingfee_ID": 0,
            "unit": "g",
            "min_weight": "",
            "max_weight": "",
            "currency": "$",
            "coffee": "",
            "coffeeshippingcountryprices": []
        },
        showShippingDiv: false,
        showAddNewShippingPrice: false,
        showDeleteShippingFee: false,
        showDeleteShippingPrice: false,
        showAddNewShippingFee: false,
        editingShippingFee : false,
        activeShippingPrice: {
            "shippingcountryprice_ID": 0,
            "country": "",
            "state_province": "state/province(not requred)",
            "price": "",
            "coffee_shipping_fee": ""
        },
        editingShippingPrice: false
     }

     componentDidMount() {
         this.fetchCoffeeDetail()
     }

     /* handle shipping country prices */
     handleSetShowShippingPrice = (value) => {
         this.setState({showAddNewShippingPrice:value,activeShippingPrice: {
            "shippingcountryprice_ID": 0,
            "country": "",
            "state_province": "state/province(not requred)",
            "price": "",
            "coffee_shipping_fee": ""
        } })
     }
     handleshowDeleteShippingPrice = (value) =>{
        this.setState({showDeleteShippingFee: false, showDeleteShippingPrice:value})
    }

    handleShippingPrice = (shipping_price) =>{
        this.setState({activeShippingPrice: shipping_price, showDeleteShippingPrice: true})
        
    }

     /* handle shipping fee */
     handleShowShippingDiv = (shipping_fee) =>{
        this.setState({showShippingDiv: true, activeShippingFee: shipping_fee})
    }

    handleSetShowShippingDiv = (value) =>{
       this.setState({showShippingDiv: value, showAddNewShippingPrice:false, showDeleteShippingPrice: false, showAddNewShippingFee:false})
    }
     handleshowDeleteShippingFee = (value) =>{
         this.setState({showDeleteShippingFee: value, showDeleteShippingPrice:false})
     }

     handleDeleteShippingFee = (activeShippingFeeItem) =>{
        this.setState({showDeleteShippingFee: true, showDeleteShippingPrice:false, activeShippingFee:activeShippingFeeItem})
     }
     handleSetShowNewShippingFee = (value) =>{
        this.setState({showAddNewShippingFee: value,
            activeShippingFee:{
                "shippingfee_ID": 0,
                "unit": "g",
                "min_weight": "",
                "max_weight": "",
                "currency": "$",
                "coffee": "",
                "coffeeshippingcountryprices": []
            }
        })
     }

    
     /* csrftoken cookie */
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

    /* fetching data from the server */
    fetchCoffeeDetail = () =>{
        fetch(`http://50.116.29.247/coffee/product/detail/${this.props.match.params.id}/`)
        .then(response => response.json())
        .then(data => this.setState({coffeeDetail: data}))
        .catch(errors => console.log(errors))
    }

    /* handle changes on shipping fee form input fields */
    handleMinWeightChange = (e) =>{
        this.setState({activeShippingFee:{...this.state.activeShippingFee,
            "coffee": this.state.coffeeDetail.coffee_ID,
            "min_weight": e.target.value

        }})

    }
    handleMaxWeightChange = (e) =>{
        this.setState({activeShippingFee:{...this.state.activeShippingFee,
            "max_weight": e.target.value

        }})
    }

    /* submitting shipping fee form data to the server */
    handleSubmitShippingFeeForm = (e) =>{
        e.preventDefault()
        var url = `http://50.116.29.247/add/coffee/product/${this.state.activeShippingFee.coffee}/shipping-fee/`
        var csrfToken = this.getCookie('csrftoken')
        var method_allowed = "POST"
        var alertMessage = "Shipping fee has been added"

        if (this.state.editingShippingFee){
            url=`http://50.116.29.247/update/coffee/product/shipping-fee/${this.state.activeShippingFee.shippingfee_ID}/`
            method_allowed = "PUT"
            alertMessage = "Shipping fee has been updated!"

            this.setState({editingShippingFee: false})
        }

        fetch(url,{
            method: method_allowed,
            headers:{
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
              },
            body: JSON.stringify(this.state.activeShippingFee)
        }).then(response => {
            this.setState({
            activeShippingFee:{
                "shippingfee_ID": 0,
                "unit": "g",
                "min_weight": "",
                "max_weight": "",
                "currency": "$",
                "coffee": "",
                "coffeeshippingcountryprices": []
            },
            showAddNewShippingFee:false
        })
        alert(alertMessage)}).catch(errors => console.log(errors))
        this.fetchCoffeeDetail()
    }
    
    /* activating editing shipping fee */
    startEditingShippingFee = (activeShippingFeeItem) =>{
        this.setState({
            activeShippingFee: activeShippingFeeItem,
            editingShippingFee: true,
            showAddNewShippingFee: true
        })
    }

    /*deleting shipping fee */
    deleteShippingFee = (activeShippingFeeItem) =>{
        var url = `http://50.116.29.247/delete/coffee/product/shipping-fee/${activeShippingFeeItem.shippingfee_ID}/`
        var csrfToken = this.getCookie('csrftoken')

        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            }
        }).then(response => {
            this.setState({showDeleteShippingFee: false, showDeleteShippingPrice:false,
                activeShippingFee:{
                    "shippingfee_ID": 0,
                    "unit": "g",
                    "min_weight": "",
                    "max_weight": "",
                    "currency": "$",
                    "coffee": "",
                    "coffeeshippingcountryprices": []
                }
            })
            alert("Shipping fee has been deleted successfully!")
            this.fetchCoffeeDetail()
        })

    }

    /* working shipping country prices */
    /* handling form input changes on shipping fee country prices */
    handleChangeOnCountry = (e) =>{
        console.log(e.target.value)
        this.setState({activeShippingPrice: {...this.state.activeShippingPrice,
            coffee_shipping_fee: this.state.activeShippingFee.shippingfee_ID,
            country: e.target.value}
        })
    }
    handleChangeOnState = (e) =>{
        this.setState({activeShippingPrice: {...this.state.activeShippingPrice,state_province: e.target.value}
        })
    }
    handleChangeOnPrice = (e) =>{
        this.setState({activeShippingPrice: {...this.state.activeShippingPrice,price: e.target.value,
            coffee_shipping_fee: this.state.activeShippingFee.shippingfee_ID}
        })
    }
    /* handle submtting data to the server */
    handleSubmitOnCountryPriceForm = (e) =>{
        e.preventDefault()

        var url = `http://50.116.29.247/coffee/product/shipping-fee/${this.state.activeShippingPrice.coffee_shipping_fee}/add/country-price/`
        var csrfToken = this.getCookie('csrftoken') 
        var method_allowed = "POST"
        var alertMessage = "Price has been added! close the window and view prices again"

        if (this.state.editingShippingPrice){
            url = `http://50.116.29.247/coffee/product/shipping-fee/update/country-price/${this.state.activeShippingPrice.shippingcountryprice_ID}/`
            method_allowed = "PUT"
            alertMessage = "Price has been updated! close the window and view prices again"
            this.setState({editingShippingPrice: false})
        }

        fetch(url, {
            method: method_allowed,
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(this.state.activeShippingPrice)
        }).then(response =>{
            this.setState({
                activeShippingPrice: {
                    "shippingcountryprice_ID": 0,
                    "country": "",
                    "state_province": "state/province(not requred)",
                    "price": "",
                    "coffee_shipping_fee": ""
                },
                showAddNewShippingPrice:false,
                showShippingDiv: false
            })
            this.fetchCoffeeDetail()
            alert(alertMessage)
        })
    }
    startEditingShippingPrice = (shipping_price) =>{
        this.setState({
            activeShippingPrice: shipping_price,
            editingShippingPrice: true,
            showAddNewShippingPrice: true
        })
    }
    /*deleting shipping price */
    deleteShippingPrice = (activeShippingPriceItem) =>{
        var url = `http://50.116.29.247/coffee/product/shipping-fee/delete/country-price/${activeShippingPriceItem.shippingcountryprice_ID}/`
        var csrfToken = this.getCookie('csrftoken')

        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            }
        }).then(response => {
            this.setState({showDeleteShippingFee: false, showDeleteShippingPrice:false,
                showShippingDiv:false,
                activeShippingPrice: {
                    "shippingcountryprice_ID": 0,
                    "country": "",
                    "state_province": "state/province(not requred)",
                    "price": "",
                    "coffee_shipping_fee": ""
                }
            })
            alert("Shipping price has been deleted successfully!")
            this.fetchCoffeeDetail()
        })

    }
    render() { 
        var coffee = this.state.coffeeDetail
        if(this.props.OnAnimate){
            productDetailDiv = <div>
                            <div>
                                <Title title={"Product Detail"} title2={" / product / product-detail"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                {coffee !== undefined && coffee !== null &&
                                <React.Fragment>
                                    <div className="bind-product-image-and-specifications">
                                        <div className="product-image">
                                            <img src={"http://50.116.29.247" + coffee.image} alt="coffee"/>
                                        </div>
                                        <div className="product-specifications single-coffee-detail-description">
                                            <h5>{`${coffee.name} ${coffee.brand}  ${coffee.classification}`}</h5>
                                            {coffee.coffeeweights.length !== 0 ?
                                            <React.Fragment>
                                                <h6>{`price range:  ${coffee.currency} ${coffee.coffeeweights[0].price} - ${coffee.currency} ${coffee.coffeeweights.slice(-1)[0].price}`}</h6>
                                                <p className="text-dark mb-1 text-center font-weight-bold">{`${coffee.name} ${coffee.brand}  ${coffee.classification}  weights`}</p>
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>quantity</th>
                                                            <th>Unit</th>
                                                            <th>price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {   
                                                        coffee.coffeeweights.map(weight =>(
                                                            <tr key={weight.unit_ID}>
                                                                <td>{weight.quantity}</td>
                                                                <td>{weight.unit}</td>
                                                                <td>{` ${coffee.currency} ${weight.price}`}</td>
                                                            </tr>
                                                        ))
                                                    } 
                                                    </tbody>
                                                </table>
                                            </React.Fragment>
                                            :
                                            <p style={{fontWeight: "bold", margin: "10px 5px"}}>
                                                <FontAwesomeIcon icon={faExclamationCircle} size="lg" style={{backgroundColor: "red", color: "white", marginRight: "3px"}}/> Please add coffee weights and prices, go back to list of coffee and click <span style={{backgroundColor: "orange", padding: "0px 5px"}}>view button</span>.
                                                coffee with no weights can not be appeared to customers.</p>
                                            }
                                            <br/>
                                            <br/>
                                            {coffee.coffee_shipping_fees.length !== 0 ?
                                            <React.Fragment>
                                                <p className="text-dark mb-1 text-center font-weight-bold">{`${coffee.name} ${coffee.brand}  ${coffee.classification}  shipping fee list`}</p>
                                                <table className="table table-bordered" style={{whiteSpace: "nowrap"}}>
                                                    <thead>
                                                        <tr>
                                                            <th>From</th>
                                                            <th>To</th>
                                                            <th colSpan="3" style={{textAlign: 'center'}}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {   
                                                        coffee.coffee_shipping_fees.map(shipping_fee =>(
                                                            <tr key={shipping_fee.shippingfee_ID}>
                                                                <td>{`${shipping_fee.min_weight} ${shipping_fee.unit}`}</td>
                                                                <td>{`${shipping_fee.max_weight} ${shipping_fee.unit}`}</td>
                                                                <td style={{padding: "5px"}}>
                                                                <button style={{backgroundColor: "grey", padding: "4px", 
                                                                width: "100%", margin:"0px", fontWeight: "normal", }} onClick={() => this.handleShowShippingDiv(shipping_fee)}>prices</button>
                                                                </td>
                                                                <td style={{padding: "5px"}}>
                                                                <button style={{backgroundColor: "rgba(255,10,10,0.9)", padding: "4px", 
                                                                width: "100%", margin:"0px", fontWeight: "normal", }} onClick={() => this.handleDeleteShippingFee(shipping_fee)}>delete</button>
                                                                </td>
                                                                <td style={{padding: "5px"}}>
                                                                <button style={{backgroundColor: "rgba(255, 153, 80, 1)", padding: "4px", 
                                                                width: "100%", margin:"0px", fontWeight: "normal", }} onClick={() => this.startEditingShippingFee(shipping_fee)}>update</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody> 
                                                </table>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                            <p style={{fontWeight: "bold", margin: "10px 5px"}}>
                                                <FontAwesomeIcon icon={faExclamationCircle} size="lg" style={{backgroundColor: "red", color: "white", marginRight: "3px"}}/> Please add coffee shipping quantity range and prices.
                                                coffee with no shipping quantity range and prices can not be appeared to customers.</p>
                                            </React.Fragment>
                                            }
                                            <button style={{backgroundColor: "rgba(20, 20, 255, 0.8)", padding: "5px", 
                                                                width: "100%", fontWeight: "normal", margin: "20px 0px"}} onClick={() => this.handleSetShowNewShippingFee(true)}>Add new shipping fee range</button>
                                            
                                        </div>
                                    </div>
                                    <div className="product-description-div">
                                    <h2>product additional description</h2>
                                    <p>{coffee.description}</p> 
                                    </div>
                                </React.Fragment>
                                }
                                {coffeeShippingDiv}
                                {this.state.showAddNewShippingFee ?
                                <Spring
                                from={{opacity: 0}}
                                to={{opacity: 1}}
                                config={{delay: 400, duration: 1000}}
                                >
                                    {
                                        props =>(
                                            <div className="new-shipping-price" style={props}>
                                                <p style={{textAlign: "center", fontWeight: "bold", marginTop: "20px", borderBottom: "2px solid black", paddingBottom: "10px"}}>
                                                    Adding new shipping range quantity (in grams)</p>
                                                <form onSubmit={this.handleSubmitShippingFeeForm}>
                                                    <label>From quantity (g): </label>
                                                    <input type="number" required autoComplete="off" defaultValue={this.state.activeShippingFee.min_weight} min={"0"} step={"0.01"} onChange={this.handleMinWeightChange}/>
                                                    <label>To quantity (g): </label>
                                                    <input type="number" required autoComplete="off" defaultValue={this.state.activeShippingFee.max_weight} min={"0"} step={"0.01"} onChange={this.handleMaxWeightChange}/>
                                                    <button style={{padding: "10px", float:"left", border:"none", borderRadius: "5px",
                                                    fontSize: "14px", width: "200px", backgroundColor: "rgba(50, 250, 50, 0.8)", fontWeight: "bold"}}>save fee range</button>
                                                </form>
                                                <button style={{padding: "10px", float:"right", border: "none", borderRadius: "5px", backgroundColor: "rgba(250, 180, 100, 0.8)", 
                                                fontWeight: "bold", marginRight: " 35px", marginTop:"-5px",fontSize: "14px"}}
                                                onClick={() => this.handleSetShowNewShippingFee(false)}>cancel</button>                                        
                                            </div>
                                        )
                                    }
                                </Spring>
                                :
                                <div></div>
                                }
                                { this.state.showDeleteShippingFee ? 
                                <Spring
                                    from={{opacity: 0}}
                                    to={{opacity: 1, width: "60%", height: "250px", backgroundColor: "white", borderRadius: "10px",
                                position: "absolute", top: "100px", left: "17%", border: "2px solid rgba(20, 20, 20, 0.7)", padding: "20px"}}
                                    config={{delay: 400, duration: 1000}}
                                >
                                    {
                                        props =>(
                                            <div style={props}>
                                                <p style={{lineHeight: "2",textAlign:"justify", fontWeight: "normal", fontFamily: "verdana", fontSize: "16px"}}><span style={{fontWeight: "bold", fontSize: "18px"}}>Do you want to delete this shipping quantity range?</span><br/>Remember that all countries price for this range will be deleted too and can not be recovered.
                                                    that's why we recommend you to update this range instead of deleting if countries price have no bad records.
                                                </p>
                                                <button style={{backgroundColor: "rgba(255,10,10,0.9)", padding: "4px", 
                                                            width: "20%", margin:"0px", fontWeight: "normal", marginLeft: "160px", marginTop: "20px" }} onClick={() => this.deleteShippingFee(this.state.activeShippingFee)}>Delete</button>
                                                <button style={{backgroundColor: "rgba(255, 153, 80, 1)", padding: "4px", 
                                                            width: "20%", margin:"0px", fontWeight: "normal", marginLeft: "30px", marginTop: "20px" }} onClick={() => this.handleshowDeleteShippingFee(false)}>Cancel</button>
                                            </div>
                                        )
                                    }

                                </Spring>
                                :
                                <div></div>
                                }
                            </div>
                        </div>
        }
        else{
            productDetailDiv = <div>
                            <div>
                                <Title title={"Product Detail"} title2={" / product / coffee-detail"}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            >
                                {
                                    props => (
                                    <div className="main-load-data" style={props}>
                                        {coffee !== undefined && coffee !== null &&
                                        <React.Fragment>
                                        <div className="bind-product-image-and-specifications">
                                            <div className="product-image">
                                                <img src={"http://50.116.29.247" + coffee.image} alt="coffee"/>
                                            </div>
                                            <div className="product-specifications single-coffee-detail-description">
                                                <h5>{`${coffee.name} ${coffee.brand}  ${coffee.classification}`}</h5>
                                                {coffee.coffeeweights.length !== 0 ?
                                                <React.Fragment>
                                                    <h6>{`price range:  ${coffee.currency} ${coffee.coffeeweights[0].price} - ${coffee.currency} ${coffee.coffeeweights.slice(-1)[0].price}`}</h6>
                                                    <p className="text-dark mb-1 text-center font-weight-bold">{`${coffee.name} ${coffee.brand}  ${coffee.classification}  weights`}</p>
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>quantity</th>
                                                                <th>Unit</th>
                                                                <th>price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {   
                                                            coffee.coffeeweights.map(weight =>(
                                                                <tr key={weight.unit_ID}>
                                                                    <td>{weight.quantity}</td>
                                                                    <td>{weight.unit}</td>
                                                                    <td>{` ${coffee.currency} ${weight.price}`}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody> 
                                                    </table>
                                                </React.Fragment>
                                                :
                                                <p style={{fontWeight: "bold", margin: "10px 5px"}}>
                                                    <FontAwesomeIcon icon={faExclamationCircle} size="lg" style={{backgroundColor: "red", color: "white", marginRight: "3px"}}/> Please add coffee weights and prices, go back to list of coffee and click <span style={{backgroundColor: "orange", padding: "0px 5px"}}>view button</span>.
                                                coffee with no weights can not be appeared to customers.</p>
                                                }
                                                <br/>
                                                <br/>
                                                {coffee.coffee_shipping_fees.length !== 0 ?
                                                <React.Fragment>
                                                    <p className="text-dark mb-1 text-center font-weight-bold">{`${coffee.name} ${coffee.brand}  ${coffee.classification}  shipping fee list`}</p>
                                                    <table className="table table-bordered" style={{whiteSpace: "nowrap", fontSize: "12px"}}>
                                                        <thead>
                                                            <tr>
                                                                <th>From</th>
                                                                <th>To</th>
                                                                <th colSpan="3" style={{textAlign: 'center'}}>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {   
                                                            coffee.coffee_shipping_fees.map(shipping_fee =>(
                                                                <tr key={shipping_fee.shippingfee_ID}>
                                                                    <td>{`${shipping_fee.min_weight} ${shipping_fee.unit}`}</td>
                                                                    <td>{`${shipping_fee.max_weight} ${shipping_fee.unit}`}</td>
                                                                    <td style={{padding: "5px"}}>
                                                                    <button style={{backgroundColor: "grey", padding: "4px", 
                                                                    width: "100%", margin:"0px", fontWeight: "normal", }} onClick={() => this.handleShowShippingDiv(shipping_fee)}>prices</button>
                                                                    </td>
                                                                    <td style={{padding: "5px"}}>
                                                                    <button style={{backgroundColor: "rgba(255,10,10,0.9)", padding: "4px", 
                                                                    width: "100%", margin:"0px", fontWeight: "normal", }} onClick={() => this.handleDeleteShippingFee(shipping_fee)}>delete</button>
                                                                    </td>
                                                                    <td style={{padding: "5px"}}>
                                                                    <button style={{backgroundColor: "rgba(255, 153, 80, 1)", padding: "4px", 
                                                                    width: "100%", margin:"0px", fontWeight: "normal", }} onClick={() => this.startEditingShippingFee(shipping_fee)}>update</button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody> 
                                                    </table>
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                <p style={{fontWeight: "bold", margin: "10px 5px"}}>
                                                    <FontAwesomeIcon icon={faExclamationCircle} size="lg" style={{backgroundColor: "red", color: "white", marginRight: "3px"}}/> Please add coffee shipping quantity range and prices.
                                                    coffee with no shipping quantity range and prices can not be appeared to customers.</p>
                                                </React.Fragment>
                                                }
                                                <button style={{backgroundColor: "rgba(20, 20, 255, 0.8)", padding: "5px", 
                                                                width: "100%", fontWeight: "normal", margin: "20px 0px"}} onClick={() => this.handleSetShowNewShippingFee(true)}>Add new shipping fee range</button>
                                                <br/>
                                                <br/>
                                                <br/>
                                                
                                            </div>
                                        </div>
                                        <div className="clearboth"></div>
                                        <div className="product-description-div">
                                        <h2>product additional description</h2>
                                        <p>{coffee.description}</p>
                                        </div>
                                    </React.Fragment>
                                    }  
                                    {coffeeShippingDiv}
                                    {this.state.showAddNewShippingFee ?
                                    <Spring
                                    from={{opacity: 0}}
                                    to={{opacity: 1}}
                                    config={{delay: 400, duration: 1000}}
                                    >
                                        {
                                            props =>(
                                                <div className="new-shipping-price" style={props}>
                                                    <p style={{textAlign: "center", fontWeight: "bold", marginTop: "20px", borderBottom: "1px solid black", paddingBottom: "10px"}}>
                                                        Adding new shipping range quantity (in grams)</p>
                                                    <form onSubmit={this.handleSubmitShippingFeeForm}>
                                                        <label>From quantity (g): </label>
                                                        <input type="number" required autoComplete="off" defaultValue={this.state.activeShippingFee.min_weight} min={"0"} step={"0.01"} onChange={this.handleMinWeightChange}/>
                                                        <label>To quantity (g): </label>
                                                        <input type="number" required autoComplete="off" defaultValue={this.state.activeShippingFee.max_weight} min={"0"} step={"0.01"} onChange={this.handleMaxWeightChange}/>
                                                        <button style={{padding: "10px", float:"left", border:"none", borderRadius: "10px",
                                                        fontSize: "20px", width: "200px", backgroundColor: "rgba(50, 250, 50, 0.8)", fontWeight: "bold"}}>save fee range</button>
                                                    </form>
                                                    <button style={{padding: "10px", float:"right", border: "none", borderRadius: "10px", backgroundColor: "rgba(250, 180, 100, 0.8)", 
                                                    fontWeight: "bold", marginRight: " 35px", marginTop:"-5px",fontSize: "20px"}}
                                                    onClick={() => this.handleSetShowNewShippingFee(false)}>cancel</button>                                        
                                                </div>
                                            )
                                        }
                                    </Spring>
                                    :
                                    <div></div>
                                    }
                                    { this.state.showDeleteShippingFee ? 
                                    <Spring
                                        from={{opacity: 0}}
                                        to={{opacity: 1, width: "60%", height: "250px", backgroundColor: "white", borderRadius: "10px",
                                    position: "absolute", top: "100px", left: "17%", border: "2px solid rgba(20, 20, 20, 0.7)", padding: "20px"}}
                                        config={{delay: 400, duration: 1000}}
                                    >
                                        {
                                            props =>(
                                                <div style={props}>
                                                    <p style={{lineHeight: "2",textAlign:"justify", fontWeight: "normal", fontFamily: "verdana", fontSize: "12px"}}><span style={{fontWeight: "bold", fontSize: "14px"}}>
                                                        Do you want to delete this shipping quantity range?</span><br/>Remember that all countries price for this range will be deleted too and can not be recovered.
                                                        that's why we recommend you to update this range instead of deleting if countries price have no bad records.
                                                    </p>
                                                    <button style={{backgroundColor: "rgba(255,10,10,0.9)", padding: "4px", 
                                                                width: "20%", margin:"0px", fontWeight: "normal", marginLeft: "160px", marginTop: "20px" }} onClick={() => this.deleteShippingFee(this.state.activeShippingFee)}>Delete</button>
                                                    <button style={{backgroundColor: "rgba(255, 153, 80, 1)", padding: "4px", 
                                                                width: "20%", margin:"0px", fontWeight: "normal", marginLeft: "30px", marginTop: "20px" }} onClick={() => this.handleshowDeleteShippingFee(false)}>Cancel</button>
                                                </div>
                                            )
                                        }

                                    </Spring>
                                    :
                                    <div></div>
                                    }
                                    </div>
                                    )
                                }
                            </Spring>
                            
                        </div>
        }
        if (this.state.showShippingDiv){
            coffeeShippingDiv = <Spring
            from={{opacity: 0}}
            to={{opacity: 1}}
            config={{delay: 500, duration:1000}}
            >
                {
                    props => (
                        <div className="shipping-price-div" style={props}>
                            <p style={{textAlign: 'center', fontWeight: 'bold', borderBottom:'1px solid black', fontSize:'16px', paddingBottom:'10px'}}
                            >{`shipping fee price for quantity range of ${this.state.activeShippingFee.min_weight} g - ${this.state.activeShippingFee.max_weight} g `} <button style={{fontSize: "20px", float:"right", 
                            fontWeight: "bold", backgroundColor:"white", border: "none", outline: "none" }} onClick={() => this.handleSetShowShippingDiv(false)}>X</button></p>
                            {this.state.activeShippingFee.coffeeshippingcountryprices.length !== 0 ?
                            <React.Fragment>
                                <table className="table table-bordered" style={{whiteSpace: "nowrap"}}>
                                    <thead>
                                        <tr>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Country</th>
                                            <th>state/province</th>
                                            <th>price</th>
                                            <th colSpan="2" style={{textAlign: 'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.activeShippingFee.coffeeshippingcountryprices.map(country_price =>(

                                            <tr key={country_price.shippingcountryprice_ID}>
                                                <td>{`${this.state.activeShippingFee.min_weight} ${this.state.activeShippingFee.unit}`}</td>
                                                <td>{`${this.state.activeShippingFee.max_weight} ${this.state.activeShippingFee.unit}`}</td>
                                                <td>{country_price.country}</td>
                                                <td>{country_price.state_province}</td>
                                                <td>{`${this.state.activeShippingFee.currency} ${country_price.price}`}</td>
                                                <td style={{padding: "10px 5px"}}><button style={{backgroundColor: "rgba(255,10,10,0.9)", padding: "4px", 
                                                width: "100%", margin:"0px", fontWeight: "normal", border:"none" }} onClick={() => this.handleShippingPrice(country_price)}>delete</button></td>
                                                <td style={{padding: "10px 5px"}}><button style={{backgroundColor: "rgba(255, 153, 80, 1)", padding: "4px", 
                                                width: "100%", margin:"0px", fontWeight: "normal", border:"none"}} onClick={() => this.startEditingShippingPrice(country_price)}>update</button></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </React.Fragment>
                            :
                                <p style={{fontSize: "14px", margin: "20px 0px"}}>no shipping countries prices this range {`${this.state.activeShippingFee.min_weight} ${this.state.activeShippingFee.unit} - ${this.state.activeShippingFee.max_weight} ${this.state.activeShippingFee.unit}`}</p>
                            }
                            <button style={{backgroundColor:"darkolivegreen", display: "block", margin: "10px auto", "outline": "none",
                            padding: "5px", width: "300px", fontWeight: 'bold', fontSize: '14px', border: "none", borderRadius: "10px"}}
                            onClick={() => this.handleSetShowShippingPrice(true)}>add new price</button>
                            
                            {this.state.showAddNewShippingPrice ?
                                <Spring
                                from={{opacity: 0}}
                                to={{opacity: 1}}
                                config={{delay: 400, duration: 1000}}
                                >
                                    {
                                        props =>(
                                            <div className="new-shipping-price" style={props}>
                                                <form onSubmit={this.handleSubmitOnCountryPriceForm}>
                                                    <label>Country: </label>
                                                    <AllCountries onHandleChangeOnCountry={this.handleChangeOnCountry} onDefault={this.state.activeShippingPrice.country}/>
                                                    <label>State/province: </label>
                                                    <input type="text" maxLength={"50"} autoComplete="off" placeholder="state/province(not required)" 
                                                    defaultValue={this.state.activeShippingPrice.state_province} onChange={this.handleChangeOnState}/>
                                                    <label>Price: </label>
                                                    <input type="number" required autoComplete="off" min={"0"} step={"0.01"} 
                                                    defaultValue={this.state.activeShippingPrice.price} onChange={this.handleChangeOnPrice}/>
                                                    <button style={{padding: "5px", float:"left", border:"none", borderRadius: "5px",
                                                    fontSize: "14px", width: "200px", backgroundColor: "rgba(50, 250, 50, 0.8)", fontWeight: "bold"}}>save price</button>
                                                </form>
                                                <button style={{padding: "5px", float:"right", border: "none", borderRadius: "5px", backgroundColor: "rgba(250, 180, 100, 0.8)", 
                                                fontWeight: "bold", marginRight: " 35px", marginTop:"-5px",fontSize: "14px"}}
                                                onClick={() => this.handleSetShowShippingPrice(false)}>cancel</button>                                        </div>
                                        )
                                    }
                                </Spring>
                            :
                            <div></div>
                            }
                            { this.state.showDeleteShippingPrice ? 
                            <Spring
                                from={{opacity: 0}}
                                to={{opacity: 1, width: "60%", height: "200px", backgroundColor: "white", borderRadius: "10px",
                            position: "absolute", top: "100px", left: "17%", border: "2px solid rgba(20, 20, 20, 0.7)", padding: "20px"}}
                                config={{delay: 400, duration: 1000}}
                            >
                                {
                                    props =>(
                                        <div style={props}>
                                            <p style={{lineHeight: "2",textAlign:"justify", fontWeight: "normal", fontFamily: "verdana", fontSize: "16px"}}>
                                                <span style={{fontWeight: "bold", fontSize: "14px"}}>Do you want to delete this shipping country price?</span><br/>
                                            </p>
                                            <button style={{backgroundColor: "rgba(255,10,10,0.9)", padding: "4px", 
                                                        width: "20%", margin:"0px", fontWeight: "normal", marginLeft: "160px", marginTop: "20px" }} onClick={() => this.deleteShippingPrice(this.state.activeShippingPrice)}>Delete</button>
                                            <button style={{backgroundColor: "rgba(255, 153, 80, 1)", padding: "4px", 
                                                        width: "20%", margin:"0px", fontWeight: "normal", marginLeft: "30px", marginTop: "20px" }} onClick={() => this.handleshowDeleteShippingPrice(false)}>Cancel</button>
                                        </div>
                                    )
                                }

                            </Spring>
                            :
                            <div></div>
                            }
                        </div>
                    )
                }

            </Spring>
        }
        else{
            coffeeShippingDiv = <div></div>
        }
        
        return ( <div> 
            {productDetailDiv}
            </div> );
    }
}
 
export default CoffeeDetail;

