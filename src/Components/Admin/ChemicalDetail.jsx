import React from 'react'
import {animated, useSpring} from "react-spring"
import Title from "./Title"

function ChemicalDetail(props){
        const animatedMenu = useSpring({
            from:{width:'77%'},
            to:{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}
        })

        var productDetailDiv

        if(props.OnAnimate){
            productDetailDiv = <div>
                            <div>
                                <Title title={"Product Detail"} title2={" / product / product-detail"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <div className="bind-product-image-and-specifications">
                                    <div className="product-image">
                                        product-image
                                    </div>
                                    <div className="product-specifications">
                                        product specifications
                                    </div>
                                </div>
                                <div className="product-description-div">
                                <p>Product descriptions</p>
                                </div>
                            </div>
                        </div>
        }
        else{
            productDetailDiv = <div>
                            <div>
                                <Title title={"Product Detail"} title2={" / product / coffee-detail"}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                                <div className="bind-product-image-and-specifications">
                                    <div className="product-image">

                                    </div>
                                    <div className="product-specifications">
                                        
                                    </div>
                                </div>
                                <div className="product-description-div">
                                     <p>Product descriptions</p>
                                </div>
                                
                            </animated.div>
                        </div>
        }
        return <div>{productDetailDiv}</div>
    }

export default ChemicalDetail