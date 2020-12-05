import React, {Component} from 'react'
import {Spring} from "react-spring/renderprops"
import Title from "./Title"


var productDetailDiv

class AdvertDetail extends Component {
    state = { 
        advertDetail: null,
     }

     componentDidMount() {
         this.fetchAdvertDetail()
     }

     fetchAdvertDetail = () =>{
         const id = this.props.match.params.id
         const url =`http://50.116.29.247/advert/${id}/detail/`

         fetch(url).then(response => response.json())
         .then(data => this.setState({advertDetail: data}))
     }

    render() { 
        var advert = this.state.advertDetail
        if(this.props.OnAnimate){
            productDetailDiv = <div>
                            <div>
                                <Title title={"Advert Detail"} title2={" / advert / advert-detail"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                {advert !== undefined && advert !== null &&
                                <React.Fragment>
                                    <div className="bind-product-image-and-specifications">
                                        <div className="product-image">
                                            <img src={"http://50.116.29.247" + advert.image} alt="advert"/>
                                        </div>
                                        <div className="product-specifications single-coffee-detail-description">
                                            <h5>{`${advert.name}`}</h5>
                                            <br/>
                                            <div>
                                            <h2>An advert caption</h2>
                                            <p>{advert.caption}</p> 
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                }
                            </div>
                        </div>
        }
        else{
            productDetailDiv = <div>
                            <div>
                                <Title title={"Advert Detail"} title2={" / advert / advert-detail"}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            >
                                {
                                    props => (
                                    <div className="main-load-data" style={props}>
                                    {advert !== undefined && advert !== null &&
                                        <React.Fragment>
                                            <div className="bind-product-image-and-specifications">
                                                <div className="product-image">
                                                    <img src={"http://50.116.29.247" + advert.image} alt="advert"/>
                                                </div>
                                                <div className="product-specifications single-coffee-detail-description">
                                                    <h5>{`${advert.name}`}</h5>
                                                    <div>
                                                    <h2>An advert caption</h2>
                                                    <p>{advert.caption}</p> 
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    }
                                    </div>
                                    )
                                }
                            </Spring>
                            
                        </div>
        }
        
        return ( 
        <div> 
            {productDetailDiv}
        </div> );
    }
}
 
export default AdvertDetail;

