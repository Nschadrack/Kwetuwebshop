import React, {useState} from "react";
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'




const DiscoverMoreProducts = (props) => {
    let verifiedMaterialProducts = []
    let materialsToDisplay = []
    let allproductsToDiscover = []
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    if (props.materialList.length !==0){
        for(let i=0; i < props.materialList.length; i++){
            if(props.materialList[i].status === "Active" && props.materialList[i].material_shipping_fees.length !==0 && props.materialList[i].material_shipping_fees[0].materialshippingcountryprices.length !==0){
                verifiedMaterialProducts.push(props.materialList[i])
            }
        }
    }
    let i,j
    let firstIndex = 0
    let lastIndex = 5
    let lengthEnds = false
    for (i=0; i < 5; i++){
        materialsToDisplay = []
        for( j=firstIndex; j < lastIndex; j++){
            if (j < verifiedMaterialProducts.length){
                materialsToDisplay.push(verifiedMaterialProducts[j])
                firstIndex += 1
                if(materialsToDisplay.length === 5){
                    break
                }
            }
            else{
                lengthEnds=true
                break
            }
        }
        if(firstIndex <=  verifiedMaterialProducts.length){
            allproductsToDiscover.push(materialsToDisplay)
        }
        if(lengthEnds === true){
            break
        }
        lastIndex += 5
        if(lastIndex === 25){
            break
        }
    }
    return (
            <div className="discover-more-products">
                <h6>Discover kwetu trade { allproductsToDiscover[0].length ===0 ?
                "later for new coming products from other categories"
                :<Link to={'/in-the-shop'}>with more products of other categories</Link>}</h6>
                <div className="discover-more-products-grid">
                        { allproductsToDiscover[0].length ===0 ?
                        <p>There are no products from other categories, but there are coming soon. Discover later, we are happy to see you happy.</p> : 
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {allproductsToDiscover.map((materialToDisplay, index) =>
                                materialToDisplay.length !== 0 &&
                                    <Carousel.Item key={index}>
                                        <div>
                                            {materialToDisplay.map((material, index2) => (
                                            <div className="four-products-discovered" key={index2}>
                                                <Link to={`/material/product/detail/${material.material_ID}`}><img src={"http://50.116.29.247" + material.image} alt="product"/></Link>
                                                <Link to={`/material/product/detail/${material.material_ID}/`}><span style={{color: "red"}}>{`${material.currency}${material.price}`}</span><br/>
                                                <span style={{color: "black", marginBottom: "5px"}}>{material.name}</span><br></br>
                                                {`${material.description.slice(0,40)}...`}</Link>
                                            </div>
                                            ))}
                                        </div>
                                    </Carousel.Item>
                            )}
                        </Carousel>
                        }
                </div>  
            </div>
     );
}
 
export default DiscoverMoreProducts;