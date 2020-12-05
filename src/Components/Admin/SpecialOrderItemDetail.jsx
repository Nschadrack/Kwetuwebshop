import React, {Component} from 'react'
import {Spring} from "react-spring/renderprops"


var productDetailDiv

class SpecialOrderItemDetail extends Component {
    state = { 
        itemDetail: null,
     }

     componentDidMount() {
         this.fetchOrderItemDetail()
     }

    /* fetching data from the server */
    fetchOrderItemDetail = () =>{
        fetch(`http://50.116.29.247/special-orders/item/${this.props.match.params.id}/detail/`)
        .then(response => response.json())
        .then(data => this.setState({itemDetail: data}))
        .catch(errors => console.log(errors))
    }

    render() { 
        var order = this.state.itemDetail
        if(this.props.OnAnimate){
            productDetailDiv = <div className="main-load-data">
                    {order !== undefined && order !== null &&
                        <React.Fragment>
                            <div className="bind-product-image-and-specifications">
                                <div className="product-image">
                                    <img src={"http://50.116.29.247" + order.image} alt="item"/>
                                </div>
                                <div className="product-specifications single-coffee-detail-description">
                                    <h5>{`${order.item_name}`}</h5>
                                    <h6>{`price : $${order.price} `}</h6>
                                    <h6>{`quantity : ${order.quantity} ${order.unit}`}</h6>
                                    <h6>{`total price : $${Number(order.quantity * order.price).toFixed(2)}`}</h6>
                                    <br/>
                                </div>
                            </div>
                            <div className="product-description-div">
                            <h2>product additional description</h2>
                            <p>{order.description}</p> 
                            </div>
                        </React.Fragment>
                        }
                </div>
        }
        else{
            productDetailDiv = <div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            >
                                {
                                    props => (
                                    <div className="main-load-data" style={props}>
                                         {order !== undefined && order !== null &&
                                            <React.Fragment>
                                                <div className="bind-product-image-and-specifications">
                                                    <div className="product-image">
                                                        <img src={"http://50.116.29.247" + order.image} alt="item"/>
                                                    </div>
                                                    <div className="product-specifications single-coffee-detail-description">
                                                        <h5>{`${order.item_name}`}</h5>
                                                        <h6>{`price : $${order.price} `}</h6>
                                                        <h6>{`quantity : ${order.quantity} ${order.unit}`}</h6>
                                                        <h6>{`total price : $${Number(order.quantity * order.price).toFixed(2)}`}</h6>
                                                        <br/>
                                                    </div>
                                                </div>
                                                <div className="product-description-div">
                                                <h2>product additional description</h2>
                                                <p>{order.description}</p> 
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
 
export default SpecialOrderItemDetail;

