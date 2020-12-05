import React, { Component } from 'react';



class SingleAnimalDetail extends Component {
    state = { 
        AnimalDetail: null,
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
        }
    }

    componentDidMount(){
        this.fetchAnimalDetail()
        this.props.onHandleActiveAnimalId(this.props.match.params.id)
    }

    componentDidUpdate (prevProps, prevState){
        if(prevState === this.state){
            this.fetchAnimalDetail()
        }

        if(prevState.cartItem !== this.state.cartItem){
            this.props.addingShoppingCartItem(this.state.cartItem)
        }
    }

     /* updating the state before adding item to the shopping cart */
     updateStateForAddingItemToTheCart = (item) =>{
        if(item.classification === "coffee"){
            this.setState({
                ...this.state, cartItem: {...this.state.cartItem,
                itemId: 1,
                itemName: `${item.name}(${item.brand} ${item.classification}, ${item.coffee_type})`,
                image: item.image,
                price: item.price,
                classification: item.classification,
                description: item.description,
                productId: item.coffee_ID,
                weight: item.weight}
            })
        }
        else if(item.classification === "animal"){
            this.setState({
                ...this.state, cartItem: {...this.state.cartItem,
                itemId: 1,
                itemName: item.name,
                image: item.image,
                price: item.price,
                classification: item.classification,
                description: item.description,
                productId: item.animal_ID,
                weight: item.weight}
            })
        }
        else{
            this.setState({
                ...this.state, cartItem: {...this.state.cartItem,
                itemId: 1,
                itemName: item.name,
                image: item.image,
                price: item.price,
                classification: item.classification,
                description: item.description,
                productId: item.material_ID,
                weight: item.weight}
            })
        }
    }


     /* fetching data from the server */
    fetchAnimalDetail = () =>{
        fetch(`http://50.116.29.247/animal/product/detail/${this.props.match.params.id}/`)
        .then(response => response.json())
        .then(data => this.setState({animalDetail: data}))
        .catch(errors => console.log(errors))
    }
    render() { 
        const animal = this.state.animalDetail
        return ( 
            <div className="single-coffe-detail">
                {animal !== undefined && animal !== null &&
                <React.Fragment>
                    <div className="single-coffee-detail-image-description">
                        <div className="single-coffee-detail-image">
                            <img src={"http://50.116.29.247" + animal.image} alt="product"/>
                        </div>
                        <div className="single-coffee-detail-description">
                            <h5>{animal.name}</h5>
                            <h6>{` ${animal.currency}${animal.price}`}</h6>
                            <div className="product-description-order">
                                <p>{animal.description}</p>
                                <button onClick={() => this.updateStateForAddingItemToTheCart(animal)}>Add to cart</button>
                            </div>

                        </div>
                    </div>
                    <div className="single-coffee-datail-additional-description">
                    </div>
                </React.Fragment>
            }
            </div>
         );
    }
}
 
export default SingleAnimalDetail;