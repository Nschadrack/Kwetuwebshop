import React, { Component } from 'react';




class SingleCoffeeDetail extends Component {
    state = { 
        coffeeDetail: null,
        cartItem: {
            itemId: 0,
            itemName: "",
            image: null,
            quantity: 1,
            price: 0,
            classification: "",
            description: "",
            productId: 0,
            weight: 0
        },
        selected: false
     }


    componentDidMount(){
        this.fetchCoffeeDetail()
        this.props.onHandleActiveCoffeId(this.props.match.params.id)
    }

    componentDidUpdate (prevProps, prevState){
        if(prevState === this.state){
            this.fetchCoffeeDetail()
        }
    }

    
    /* updating the state before adding item to the shopping cart */
    updateStateForAddingItemToTheCart = (e) =>{
            var price =[]
            this.state.coffeeDetail.coffeeweights.map(weight => Number(weight.quantity) === Number(e.target.value) && price.push(weight.price))
            this.setState({
                ...this.state, cartItem: {...this.state.cartItem,
                itemId: 1,
                itemName: `${this.state.coffeeDetail.name}(${this.state.coffeeDetail.brand} ${this.state.coffeeDetail.classification}, ${this.state.coffeeDetail.coffee_type}, ${e.target.value}${this.state.coffeeDetail.coffeeweights[0].unit})`,
                image: this.state.coffeeDetail.image,
                price: Number(price[0]),
                classification: this.state.coffeeDetail.classification,
                description: this.state.coffeeDetail.description,
                productId: this.state.coffeeDetail.coffee_ID,
                weight: e.target.value},
                selected: true
            })
        }
    handleSubmitData = (e) =>{
        e.preventDefault()
        if(this.state.selected === true){
            this.props.addingShoppingCartItem(this.state.cartItem)
            this.setState({selected: false})

        }
        else{
            alert("You didn't check weight option, choose weight(g)")
        }
    }


    /* fetching data from the server */
    fetchCoffeeDetail = () =>{
        fetch(`http://50.116.29.247/coffee/product/detail/${this.props.match.params.id}/`)
        .then(response => response.json())
        .then(data => this.setState({coffeeDetail: data}))
        .catch(errors => console.log(errors))
    }
    render() {
        const coffee = this.state.coffeeDetail
        return ( 
            <div className="single-coffe-detail">
                {coffee !== undefined && coffee !== null &&
                <React.Fragment>
                    <div className="single-coffee-detail-image-description">
                        <div className="single-coffee-detail-image">
                            <img src={"http://50.116.29.247" + coffee.image} alt="product"/>
                        </div>
                        <div className="single-coffee-detail-description">
                            <h5>{coffee.name}</h5>
                            <div className="division-one">
                                <h6>{`${coffee.currency}${coffee.coffeeweights[0].price} - ${coffee.currency}${coffee.coffeeweights.slice(-1)[0].price}`}</h6>
                                <p style={{fontWeight: "bold"}}>Type: <span style={{marginLeft: "10px"}}>{coffee.coffee_type}</span></p>
                                <p style={{fontWeight: "bold"}}>Brand: <span style={{marginLeft: "10px"}}>{coffee.brand}</span></p>
                                <form onSubmit={this.handleSubmitData}>
                                    <label>Choose Weight( g )</label>
                                    <select name="coffee_weight_order_option" defaultValue={"choose option"} onChange={this.updateStateForAddingItemToTheCart}>
                                        <option>choose option</option>
                                        {coffee.coffeeweights.map((weight,index)=>(
                                            <option key={index}>{weight.quantity}</option>
                                        ))}
                                    </select>
                                    <button>Add to cart</button>
                                </form>
                            </div>
                            <div className="division-two">
                                <p style={{textAlign: "justify"}}>{coffee.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="single-coffee-datail-additional-description">
                        <h5>Product information</h5>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Type</th>
                                    <td>{coffee.coffee_type}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{coffee.brand}</td>
                                </tr>
                                <tr>
                                <th rowSpan={coffee.coffeeweights.length}>Weights & Prices</th>
                                            <td>{`${coffee.coffeeweights[0].quantity}${coffee.coffeeweights[0].unit} => ${coffee.currency}${coffee.coffeeweights[0].price}`}</td>
                                </tr>
                                {
                                    coffee.coffeeweights.length > 0 &&
                                    <React.Fragment>
                                    {
                                        coffee.coffeeweights.slice(1).map((weight, index) =>(
                                            <tr key={index}>
                                                <td>{`${weight.quantity}${weight.unit} => ${coffee.currency}${weight.price}`}</td>
                                            </tr>
                                        ))
                                    }
                                    </React.Fragment>
                                }
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
                }
            </div>
         );
    }
}
 
export default SingleCoffeeDetail;