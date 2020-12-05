import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import ShoppingCartItem from './ShoppingCartItem';
import {Spring} from 'react-spring/renderprops';
import AllShippingCountries from "./AllShippingCountries";

class ViewShoppingCart extends Component {
    state = {
        showProceedTocheckout : false,
        animalShippingList: [],
        coffeeShippingList: [],
        materialShippingList: [],
        cartIAnimalContinue: false,
        cartCoffeeContinue: false,
        cartMaterialContinue: false,
        cartIncludedAnimal: false,
        cartIncludedCoffee: false,
        cartIncludedMaterial: false,
        showWarningMessage: false,
        shippingAdress: {
            country:"",
            stateProvince:"",
            zipCode: ""
        },
        countrySelected: "",
        animalShippingPrice: 0,
        coffeeShippingPrice: 0,
        materialShippingPrice: 0,
        found: false
    }
    componentDidMount(){
        this.fetchAnimalShippingfee()
        this.fetchCoffeeShippingfee()
        this.fetchMaterialShippingfee()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.shoppingCart.items.length !== this.props.shoppingCart.items.length){
            this.setState({
                cartIAnimalContinue: false,
                cartCoffeeContinue: false,
                cartMaterialContinue: false,
                cartIncludedAnimal: false,
                cartIncludedCoffee: false,
                cartIncludedMaterial: false,
                animalShippingPrice: 0,
                coffeeShippingPrice: 0,
                materialShippingPrice: 0,
                showWarningMessage: false
            })
        }

        if(prevState.coffeeShippingPrice !== this.state.coffeeShippingPrice || prevState.animalShippingPrice !== this.state.animalShippingPrice || prevState.materialShippingPrice !== this.state.materialShippingPrice){
            const shippingFee = Number(this.state.coffeeShippingPrice) + Number(this.state.animalShippingPrice) + Number(this.state.materialShippingPrice)
            this.props.addingShippingFee(0)
            if(localStorage.getItem("ShippingFeeData")){
                localStorage.setItem("ShippingFeeData", 0.00)
            }
            this.props.addingShippingFee(shippingFee)
        }
    }

    fetchAnimalShippingfee = () =>{
        var url = "http://50.116.29.247/animal/product/shipping/list/"

        fetch(url).then(response => response.json())
        .then(data => this.setState({animalShippingList: data}))
    }
    fetchCoffeeShippingfee = () =>{
        var url = "http://50.116.29.247/coffee/product/shipping/list/"

        fetch(url).then(response => response.json())
        .then(data => this.setState({coffeeShippingList: data}))
    }
    fetchMaterialShippingfee = () =>{
        var url = "http://50.116.29.247/material/product/shipping/list/"

        fetch(url).then(response => response.json())
        .then(data => this.setState({materialShippingList: data}))
    }

    handleCalculateShipping = () =>{
        var materialShippingPrice = 0
        var animalShippingPrice = 0
        var coffeeShippingPrice = 0
        var countMaterialCountry = 0
        var countAnimalCountry = 0
        var countCoffeeCountry = 0
        var animalCountryFound = false
        var materialCountryFound = false
        var coffeeCountryFound = false
        var cartIncludedAnimal = false
        var cartIncludedMaterial = false
        var cartIncludedCoffee = false
        var countShippingFoundTimes
        var countShippingFoundTimesProvince

        var materialsNumber = 0
        var coffeeNumber = 0
        var animalNumber = 0

        this.props.shoppingCart.items.map(item => {
            if(item.classification === "coffee"){
                return coffeeNumber +=1
            }
            else if(item.classification === "material"){
                return materialsNumber +=1
            }
            else if(item.classification === "animal"){
                return animalNumber +=1
            }
            else{
                return 0
            }
        })

        this.props.shoppingCart.items.map(item => {
            if(item.classification === "coffee"){
                countShippingFoundTimesProvince = 0
                countShippingFoundTimes = 0
                cartIncludedCoffee = true
                this.state.coffeeShippingList.map(shippingfee => {
                    if(Number(Number(item.weight) * Number(item.quantity)) >= Number(shippingfee.min_weight) && 
                    Number(Number(item.weight) * Number(item.quantity) < Number(shippingfee.max_weight))){
                        if(Number(shippingfee.coffee) === Number(item.productId)){
                            if(countShippingFoundTimesProvince === 0){
                                shippingfee.coffeeshippingcountryprices.map(countryprice =>{
                                    if(countryprice.country.toLowerCase() === this.state.shippingAdress.country.toLowerCase() &&
                                    countryprice.state_province.toLowerCase() === this.state.shippingAdress.stateProvince.toLowerCase()){
                                        coffeeCountryFound = true
                                        countShippingFoundTimes +=1
                                        if(countShippingFoundTimes === 1){
                                            coffeeShippingPrice = Number(coffeeShippingPrice) + Number(countryprice.price)
                                            countCoffeeCountry += 1
                                        }
                                    }
                                    return 0
                                })
                            }
                            /* if there is no shipping fee for country till to proivnce or state then search for country only */
                            if(countShippingFoundTimes === 0){
                                shippingfee.coffeeshippingcountryprices.map(countryprice =>{
                                    if(countryprice.country.toLowerCase() === this.state.shippingAdress.country.toLowerCase()){
                                        coffeeCountryFound = true
                                        countShippingFoundTimesProvince +=1
                                        if(countShippingFoundTimesProvince === 1){
                                            coffeeShippingPrice = Number(coffeeShippingPrice) + Number(countryprice.price)
                                            countCoffeeCountry += 1
                                        }
                                    }
                                    return 0
                                })
                            }
                        }
                        }
                        return 0
                        })
            }
            else if (item.classification === "material"){
                cartIncludedMaterial = true
                countShippingFoundTimesProvince = 0
                countShippingFoundTimes = 0
                this.state.materialShippingList.map(shippingfee => {
                    if(Number(Number(item.weight) * Number(item.quantity)) >= Number(shippingfee.min_weight) && Number(Number(item.weight) * Number(item.quantity) < Number(shippingfee.max_weight))){
                        if(Number(shippingfee.material) === Number(item.productId)){
                            if(countShippingFoundTimesProvince === 0){
                                shippingfee.materialshippingcountryprices.map(countryprice =>{
                                    if(countryprice.country.toLowerCase() === this.state.shippingAdress.country.toLowerCase() &&
                                    countryprice.state_province.toLowerCase() === this.state.shippingAdress.stateProvince.toLowerCase())
                                    {
                                        materialCountryFound = true
                                        countShippingFoundTimes += 1
                                        if(countShippingFoundTimes === 1){
                                            materialShippingPrice = Number(materialShippingPrice) + Number(countryprice.price)
                                            countMaterialCountry += 1
                                        }
                                    }
                                    return 0
                                })
                            }

                            /* shipping fee for material products not found at province or state level look for country only */
                            if(countShippingFoundTimes === 0){
                                shippingfee.materialshippingcountryprices.map(countryprice =>{
                                        if(countryprice.country.toLowerCase() === this.state.shippingAdress.country.toLowerCase())
                                        {
                                            materialCountryFound = true
                                            countShippingFoundTimesProvince += 1
                                            if(countShippingFoundTimesProvince === 1){
                                                materialShippingPrice = Number(materialShippingPrice) + Number(countryprice.price)
                                                countMaterialCountry += 1
                                            }
                                        }
                                        return 0
                                })
                            }
                        }
                    }
                    return 0
                })
            }
            else{
                cartIncludedAnimal = true
                countShippingFoundTimesProvince = 0
                countShippingFoundTimes = 0
                this.state.animalShippingList.map(shippingfee => {
                    if(Number(Number(item.weight) * Number(item.quantity)) >= Number(shippingfee.min_weight) && Number(Number(item.weight) * Number(item.quantity) < Number(shippingfee.max_weight))){
                        if(Number(shippingfee.animal) === Number(item.productId)){
                            if(countShippingFoundTimesProvince === 0){
                                shippingfee.animalshippingcountryprices.map(countryprice =>{
                                    if(countryprice.country.toLowerCase() === this.state.shippingAdress.country.toLowerCase() &&
                                    countryprice.state_province.toLowerCase() === this.state.shippingAdress.stateProvince.toLowerCase()){
                                        animalCountryFound = true
                                        countShippingFoundTimes += 1
                                        if(countShippingFoundTimes === 1){
                                            animalShippingPrice = Number(animalShippingPrice) + Number(countryprice.price)
                                            countAnimalCountry += 1
                                        }
                                    }
                                    return 0
                                })
                            }

                                 /* shipping fee for material products not found at province or state level look for country only */
                            if(countShippingFoundTimes === 0){ 
                                shippingfee.animalshippingcountryprices.map(countryprice =>{
                                    if(countryprice.country.toLowerCase() === this.state.shippingAdress.country.toLowerCase()){
                                        animalCountryFound = true
                                        countShippingFoundTimesProvince += 1
                                        if(countShippingFoundTimesProvince === 1){
                                            animalShippingPrice = Number(animalShippingPrice) + Number(countryprice.price)
                                            countAnimalCountry += 1
                                        }
                                    }
                                    return 0
                                })
                            }   
                        }
                    }
                    return 0
                })
            }
            return 0
        })
    
        if(cartIncludedMaterial === true){
            this.setState({cartIncludedMaterial: true})
            if(materialCountryFound === true){
                if(materialsNumber === countMaterialCountry){
                    this.setState({materialShippingPrice: materialShippingPrice, cartMaterialContinue: true})
                }
            }
            else{
                // console.log("No material country was found, we are not shipping to your country materials you have on your shopping cart")
                this.setState({cartMaterialContinue: false})
            }
        }
        else{
            this.setState({cartMaterialContinue: true})
        }


        if(cartIncludedAnimal === true){
            this.setState({cartIncludedAnimal: true})
            if(animalCountryFound === true){
                if(animalNumber === countAnimalCountry){
                    this.setState({animalShippingPrice: animalShippingPrice, cartAnimalContinue: true})
                }
            }
            else{
                // console.log("No animal country was not found, we are not shipping to your country animals you have on your shopping cart")
                this.setState({cartAnimalContinue: false})
            }
        }
        else{
            this.setState({cartAnimalContinue: true})

        }

        if(cartIncludedCoffee === true){
            this.setState({cartIncludedCoffee: true})
            if(coffeeCountryFound === true){
                if(coffeeNumber === countCoffeeCountry){
                    this.setState({coffeeShippingPrice: coffeeShippingPrice, cartCoffeeContinue: true})
                }
            }
            else{
                // console.log("No coffee country was found, we are not shipping to your country coffee you have on your shopping cart")
                this.setState({cartCoffeeContinue: false})
            }
        }
        else{
            this.setState({cartCoffeeContinue: true})
        }

        this.setState({showWarningMessage:true})
        this.handleVerifyDecisionForwarningMessage()

    }

    handleVerifyDecisionForwarningMessage = () =>{
        this.setState({found: true})
    }

    handleChangeOnCountry = (e) =>{
        this.setState({shippingAdress: {...this.state.shippingAdress, country: e.target.value}, countrySelected: true,
            cartIAnimalContinue: false,
            cartCoffeeContinue: false,
            cartMaterialContinue: false, 
            cartIncludedAnimal: false,
            cartIncludedCoffee: false,
            cartIncludedMaterial: false,
            animalShippingPrice: 0,
            coffeeShippingPrice: 0,
            materialShippingPrice: 0,
            showWarningMessage: false})
            this.props.addingShippingFee(0)

    }
    handleChangeOnStateProvince = (e) =>{
        this.setState({shippingAdress: {...this.state.shippingAdress, stateProvince: e.target.value},
            cartIAnimalContinue: false,
            cartCoffeeContinue: false,
            cartMaterialContinue: false, 
            animalShippingPrice: 0,
            coffeeShippingPrice: 0,
            materialShippingPrice: 0,
            showWarningMessage: false})
            this.props.addingShippingFee(0)
    }
    handleChangeOnZipCode = (e) =>{
        this.setState({shippingAdress: {...this.state.shippingAdress, zipCode: e.target.value},
            cartIAnimalContinue: false,
            cartCoffeeContinue: false,
            cartMaterialContinue: false, 
            cartIncludedAnimal: false,
            cartIncludedCoffee: false,
            cartIncludedMaterial: false,
            animalShippingPrice: 0,
            coffeeShippingPrice: 0,
            materialShippingPrice: 0,
            showWarningMessage: false})
            this.props.addingShippingFee(0)
    }

    handleSubmitShipping = (e) =>{
        e.preventDefault()
        if (this.state.countrySelected === true){
            this.setState({
                showProceedTocheckout: true
            })
            
            this.handleCalculateShipping()
        }
        else{
            this.setState({
                countrySelected:false
            })
        }
    }
    
    render() {
        const cart = this.props.shoppingCart
        const items = cart.items
        const shippingFee = this.props.shippingFee

        var numberOfItems = 0
        items.map(item => numberOfItems += item.quantity)
        

        return (
        <div> 
            <div className="cart-items-div">
                { items.length === 0 ? <p>Your shopping cart is currently empty go to <Link to={"/in-the-shop/"}>shop</Link></p> : 
                <React.Fragment>
                 <div className="cart-items">
                     {numberOfItems > 1 ? 
                     <h5>currently you have <span style={{backgroundColor: "orange", padding: "5px 10px", fontWeight: "bold"}}>{numberOfItems} items</span> on your shopping cart with details below, <Link to={"/in-the-shop/"}>continue shopping</Link></h5>
                     :
                     <h5>currently you have <span style={{backgroundColor: "orange", padding: "5px 10px", fontWeight: "bold"}}>{numberOfItems} item </span>on your shopping cart with details below <Link to={"/in-the-shop/"}>continue shopping</Link></h5>
                    }
                    {!(this.state.cartCoffeeContinue === true && this.state.cartMaterialContinue === true && this.state.cartAnimalContinue === true) &&
                    <table className="cart-items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th colSpan="3" className="text-center">Quantity</th>
                                <th>Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <ShoppingCartItem 
                                key={index} item={item} 
                                currency={cart.currency} {...this.props}/>
                            ))}
                            <tr className="ground-subtotal">
                                <td colSpan="5">Cart Subtotal Price</td>
                            <td colSpan="2">{cart.currency}{cart.subTotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    }
                </div>
                <div className="cart-shipping-fee-cart-total">
                {cart.subTotal !== 0.00 &&
                <React.Fragment>
                    <div className="cart-shipping-fee">
                        <h4>Calculating shipping fee</h4>
                        <form className="shipping-form-fee" onSubmit={this.handleSubmitShipping}>
                            <AllShippingCountries onhandleChangeOnCountry={this.handleChangeOnCountry}/>
                            {this.state.countrySelected === false &&
                            <p style={{fontSize: "13px",color: "red", clear: "both", display:"table", content: " ", marginTop: "-10px"}}>you didn't select country</p>}
                            <input  type="text" name="shipping_fee_state_province" placeholder="state/province" required onChange={this.handleChangeOnStateProvince}/>
                            <input type="text" name="shipping_fee_postcode_zip" placeholder="postcode/zip" className="shipping_fee_postcode_zip" required onChange={this.handleChangeOnZipCode}/>
                            <button><FontAwesomeIcon icon={faCheckCircle}/> Confirm for next step </button>
                        </form>
                    </div>
                    <div className="cart-total">
                        <h4>Cart totals</h4>
                        <table>
                            <tbody>                            
                                <tr>
                                    <th>Subtotal</th>
                                    <td>{cart.currency}{cart.subTotal.toFixed(2)}</td>
                                </tr>
                                {this.state.animalShippingPrice !== 0 && this.state.cartAnimalContinue === true ?
                                <tr>
                                    <th>Animal shipping fee</th>
                                    <td>${ this.state.animalShippingPrice }</td>
                                </tr>
                                :
                                <React.Fragment>
                                {this.state.animalShippingPrice === 0 && this.state.cartIncludedAnimal === true &&
                                <tr>
                                    <th>Animal shipping fee</th>
                                    <td>$0</td>
                                </tr>
                                }   
                                </React.Fragment>
                                }
                                {this.state.coffeeShippingPrice !== 0 && this.state.cartCoffeeContinue === true ?
                                <tr>
                                    <th>Coffee shipping fee</th>
                                    <td>${ this.state.coffeeShippingPrice }</td>
                                </tr>
                                :
                                <React.Fragment>
                                {this.state.coffeeShippingPrice === 0 && this.state.cartIncludedCoffee &&
                                <tr>
                                    <th>Coffee shipping fee</th>
                                    <td>$0</td>
                                </tr>
                                }
                                </React.Fragment>
                                }
                                {this.state.materialShippingPrice !== 0 && this.state.cartMaterialContinue === true ?
                                <tr>
                                    <th>electronics & furn shipping fee</th>
                                    <td>${ this.state.materialShippingPrice }</td>
                                </tr>
                                :
                                <React.Fragment>
                                {this.state.materialShippingPrice === 0 && this.state.cartIncludedMaterial &&
                                <tr>
                                    <th>electronics & furn shipping fee</th>
                                    <td>$0</td>
                                </tr>
                                }
                                </React.Fragment>
                                }
                                <tr className="ground-cart-total">
                                    <th>Ground total to pay</th>
                                    <td>{cart.currency}{(Number(cart.subTotal) + Number(shippingFee)).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        {this.state.cartCoffeeContinue === true && this.state.cartMaterialContinue === true && this.state.cartAnimalContinue === true ?
                            <React.Fragment>
                                { this.state.showProceedTocheckout && 
                                    <Spring 
                                    from={{opacity: 0}}
                                    to={{opacity: 1}}
                                    config={{delay: 1000, duration: 1000}}
                                    >
                                        {
                                            props =>(
                                                <Link to={'/checkout'} style={props}><FontAwesomeIcon icon={faCheckSquare}/>  Proceed to check out</Link>
                                            )
                                        }
                                    </Spring>
                                }
                            </React.Fragment>
                        :
                        <React.Fragment>
                        {this.state.showWarningMessage === true &&
                            <React.Fragment>
                                <p className="shipping-fee-warning-message">We are unable to process all products shipping fee on your shopping cart because we are not shipping some products to your shipping country! check products with shipping fee 
                                which is zero on your cart total summary, remove them and click confirm for next step button!</p>
                            </React.Fragment>
                        }
                        </React.Fragment>
                        }
                        
                    </div>
                </React.Fragment>
                }
                </div>
                </React.Fragment>
                }
            </div>
            <div className="clearboth"></div>
            <br/><br/><br/>
        </div>
        );
    }
}
 
export default ViewShoppingCart;