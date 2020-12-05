import React, {Component} from 'react';
import {Link} from 'react-router-dom';



class RecommendSimilarProduct extends Component {
    state = {  }
    render() {
        const {coffeeList, materialList, animalList, activeCoffee, activeMaterial, activeAnimal} = this.props
        let recommendMaterial = []
        let recommendCoffee = []
        let recommendAnimal = []

        if (materialList.length !==0){
            for(let i=0; i < materialList.length; i++){
                if(materialList[i].status === "Active" && materialList[i].material_shipping_fees.length !==0 && materialList[i].material_shipping_fees[0].materialshippingcountryprices.length !==0){
                    recommendMaterial.push(materialList[i])
                }
            }
        }
        if(recommendMaterial.length !==0){
            recommendMaterial = recommendMaterial.filter(material => Number(material.material_ID) !== Number(activeMaterial))
            recommendMaterial = recommendMaterial.slice(0, 12)
        }

        if (coffeeList.length !==0){
            for(let i=0; i < coffeeList.length; i++){
                if(coffeeList[i].status === "Active" && coffeeList[i].coffeeweights.length !==0 && coffeeList[i].coffee_shipping_fees.length !==0 && coffeeList[i].coffee_shipping_fees[0].coffeeshippingcountryprices.length !==0){
                    recommendCoffee.push(coffeeList[i])
                }
            }
        }

        if (recommendCoffee.length !== 0){
            recommendCoffee = recommendCoffee.filter(coffee => Number(coffee.coffee_ID) !== Number(activeCoffee))
            recommendCoffee = recommendCoffee.slice(0, 12)
        }
        if (animalList.length !==0){
            for(let i=0; i < animalList.length; i++){
                if(animalList[i].status === "Active"  && animalList[i].animal_shipping_fees.length !==0 && animalList[i].animal_shipping_fees[0].animalshippingcountryprices.length !==0){
                    recommendAnimal.push(animalList[i])
                }
            }
        }

        if (recommendAnimal.length !== 0){
            recommendAnimal = recommendAnimal.filter(animal => Number(animal.animal_ID) !== Number(activeAnimal))
            recommendAnimal = recommendAnimal.slice(0, 12)
        }

        return ( 
            <React.Fragment>
                {activeAnimal !== undefined ?
                <React.Fragment>
                    <div className="similar-more-products">
                        {recommendAnimal.length !== 0 &&
                        <h6>You may also be interested in these products</h6>
                        }
                        <div className="main-products-page-load-products-similar">
                            {recommendAnimal.map((animal, index) => (
                            <div  key={index} className="main-products-page-products-list">
                                <div className="main-products-page-image-in-div">
                                    <img src={"http://50.116.29.247" + animal.image} alt="product"/>
                                </div>
                                <div className="main-products-page-description">
                                    <p className="product-price-in-div">{`${animal.currency}${animal.price}`}<br/><br/>
                                    <Link to={`/animal/product/detail/${animal.animal_ID}/`} onClick={() => this.props.onHandleActiveCoffeId(animal.animal_ID)}>
                                        <span style={{color: "black", marginBottom: "5px"}}>{animal.name}</span><br></br>
                                    {`${animal.description.slice(0, 80)}...`}</Link></p>
                                    <Link to={`/animal/product/detail/${animal.animal_ID}/`} className="button" onClick={() => this.props.onHandleActiveCoffeId(animal.animal_ID)}>View this product</Link>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    {activeCoffee !== undefined?
                    <React.Fragment>
                        <div className="similar-more-products">
                            {recommendCoffee.length !== 0 &&
                            <h6>You may also be interested in these products</h6>
                            }
                            <div className="main-products-page-load-products-similar">
                                {recommendCoffee.map((coffee, index) => (
                                <div  key={index} className="main-products-page-products-list">
                                    <div className="main-products-page-image-in-div">
                                        <img src={"http://50.116.29.247" + coffee.image} alt="product"/>
                                    </div>
                                    <div className="main-products-page-description">
                                        <p className="product-price-in-div">{`${coffee.currency}${coffee.coffeeweights[0].price} - ${coffee.currency}${coffee.coffeeweights.slice(-1)[0].price}`}<br/><br/>
                                        <Link to={`/coffee/product/detail/${coffee.coffee_ID}/`} onClick={() => this.props.onHandleActiveCoffeId(coffee.coffee_ID)}>
                                            <span style={{color: "black", marginBottom: "5px"}}>{coffee.name}</span><br></br>
                                        {`${coffee.description.slice(0, 80)}...`}</Link></p>
                                        <Link to={`/coffee/product/detail/${coffee.coffee_ID}/`} className="button" onClick={() => this.props.onHandleActiveCoffeId(coffee.coffee_ID)}>View this product</Link>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="similar-more-products">
                            {recommendMaterial.length !==0 &&
                            <h6>You may also be interested in these  products</h6>
                            }
                            <div className="main-products-page-load-products-similar">
                                {recommendMaterial.map((material, index) => (
                                <div  key={index} className="main-products-page-products-list">
                                    <div className="main-products-page-image-in-div">
                                        <img src={"http://50.116.29.247" + material.image} alt="product"/>
                                    </div>
                                    <div className="main-products-page-description">
                                        <p href="" className="product-price-in-div">{`${material.currency}${material.price}`}<br/><br/>
                                        <Link to={`/material/product/detail/${material.material_ID}/`} onClick={() => this.props.onHandleActiveMaterialId(material.material_ID)}>
                                        <span style={{color: "black", marginBottom: "5px"}}>{material.name}</span><br></br>
                                        {`${material.description.slice(0, 80)}...`}</Link></p>
                                        <Link to={`/material/product/detail/${material.material_ID}/`} className="button" onClick={() => this.props.onHandleActiveMaterialId(material.material_ID)}>View this product</Link>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                    }
                </React.Fragment>
                }
            </React.Fragment>
     );
    }
}


 
export default RecommendSimilarProduct;

