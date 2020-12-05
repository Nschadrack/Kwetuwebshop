import React, { Component } from 'react';



class SingleProductDetail extends Component {
    state = { 
        materialDetail: null,
        cartItem: {
            itemId: 0,
            itemName: "",
            image: null,
            quantity: 1,
            price: 0,
            classification: "",
            description: "",
            productId: 0,
            weight : 0
        }
    }

    componentDidMount(){
        this.fetchMaterialDetail()
        this.props.onHandleActiveMaterialId(this.props.match.params.id)
    }

    componentDidUpdate (prevProps, prevState){
        if(prevState === this.state){
            this.fetchMaterialDetail()
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
                weight:item.weight}
            })
        }
    }


     /* fetching data from the server */
    fetchMaterialDetail = () =>{
        fetch(`http://50.116.29.247/material/product/detail/${this.props.match.params.id}/`)
        .then(response => response.json())
        .then(data => this.setState({materialDetail: data}))
        .catch(errors => console.log(errors))
    }
    render() { 
        const material = this.state.materialDetail
        return ( 
            <div className="single-coffe-detail">
                {material !== undefined && material !== null &&
                <React.Fragment>
                    <div className="single-coffee-detail-image-description">
                        <div className="single-coffee-detail-image">
                            <img src={"http://50.116.29.247" + material.image} alt="product"/>
                        </div>
                        <div className="single-coffee-detail-description">
                            <h5>{material.name}</h5>
                            <h6>{` ${material.currency}${material.price}`}</h6>
                            <div className="product-description-order">
                                <p>{material.description}</p>
                                <button onClick={() => this.updateStateForAddingItemToTheCart(material)}>Add to cart</button>
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
 
export default SingleProductDetail;