import React from 'react';
import {Link} from 'react-router-dom'


const FirstFourProducts = (props) => {
    var firstFourCoffeeList =[]
    var verifiedFourProductsCoffee =[]

    if (props.coffeeList.length !==0){
        for(let i=0; i < props.coffeeList.length; i++){
            if(props.coffeeList[i].status === "Active" && props.coffeeList[i].coffeeweights.length !==0 && props.coffeeList[i].coffee_shipping_fees.length !==0 && props.coffeeList[i].coffee_shipping_fees[0].coffeeshippingcountryprices.length !==0){
                verifiedFourProductsCoffee.push(props.coffeeList[i])
            }
        }
    }

    if(verifiedFourProductsCoffee.length !==0){
        if (verifiedFourProductsCoffee.length <=8){
            if (verifiedFourProductsCoffee.length <=4 && verifiedFourProductsCoffee.length !==1){
                firstFourCoffeeList = verifiedFourProductsCoffee
                if(verifiedFourProductsCoffee.length === 2 ){
                    firstFourCoffeeList.push(verifiedFourProductsCoffee[0])
                    firstFourCoffeeList.push(verifiedFourProductsCoffee[1])
                }
                else if(verifiedFourProductsCoffee.length === 3){
                    firstFourCoffeeList.push(verifiedFourProductsCoffee[0])
                }
            }
            else{
                if(verifiedFourProductsCoffee.length !==1){
                    firstFourCoffeeList = verifiedFourProductsCoffee
                    if(verifiedFourProductsCoffee.length === 5 ){
                        firstFourCoffeeList.push(verifiedFourProductsCoffee[3])
                        firstFourCoffeeList.push(verifiedFourProductsCoffee[2])
                        firstFourCoffeeList.push(verifiedFourProductsCoffee[1])
                    }
                    else if(verifiedFourProductsCoffee.length === 6){
                        firstFourCoffeeList.push(verifiedFourProductsCoffee[0])
                        firstFourCoffeeList.push(verifiedFourProductsCoffee[1])
                    }
                    else if(verifiedFourProductsCoffee.length === 7){
                        firstFourCoffeeList.push(verifiedFourProductsCoffee[0])
                    }
                }
                }
            }
        }
        else{
            firstFourCoffeeList = verifiedFourProductsCoffee.slice(0, 8)
        }
    
    return (
        <div>
            <div className="first-four-products">
                {firstFourCoffeeList.length !== 0 &&
                <React.Fragment>
                    {firstFourCoffeeList.map((coffee, index) => (
                        <div  key={index} className="first-four-products-divs">
                            <div className="product-image-in-div">
                                <img src={"http://50.116.29.247" + coffee.image} alt="product" className=""/>
                            </div>
                            <div className="product-description-in-div">
                                <Link to={`/coffee/product/detail/${coffee.coffee_ID}/`}><span style={{color: "black", marginBottom: "5px"}}>{`${coffee.name} `}</span>
                                <p className="product-price-in-div">{`${coffee.currency}${coffee.coffeeweights[0].price} - ${coffee.currency}${coffee.coffeeweights.slice(-1)[0].price}`}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
                }
            </div>
            <div className="clearboth"></div>
        </div>
     );
}
 
export default FirstFourProducts;