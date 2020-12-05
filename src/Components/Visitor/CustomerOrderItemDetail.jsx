import React, {Component} from 'react'


var productDetailDiv

class CustomerOrderItemDetail extends Component {
    state = { 
        itemDetail: null,
     }

     componentDidMount() {
         this.fetchOrderItemDetail()
     }

    /* fetching data from the server */
    fetchOrderItemDetail = () =>{
        var url

        if(this.props.onCategroy === "material"){
            url = `http://50.116.29.247/material/product/detail/${this.props.match.params.id}/`
        }
        else if(this.props.onCategroy === "animal"){
            url= `http://50.116.29.247/animal/product/detail/${this.props.match.params.id}/`
        }
        else{
            url = `http://50.116.29.247/coffee/product/detail/${this.props.match.params.id}/`
        }


        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({itemDetail: data}))
        .catch(errors => console.log(errors))
    }
    render() { 
        var item = this.state.itemDetail
        productDetailDiv = <div>
                    {item !== undefined && item !== null &&
                    <React.Fragment>
                        <div className="bind-product-image-and-specifications">
                            <div className="product-image">
                                <img src={"http://50.116.29.247" + item.image} alt="item"/>
                            </div>
                            <div className="product-specifications single-coffee-detail-description">
                                <h5>{`${item.name}`}</h5>
                                <br/>
                                <div>
                                    <h5>product additional description</h5>
                                    <p>{item.description}</p> 
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    }
                </div>
        return ( 
            <div> 
                {productDetailDiv}
            </div> );
    }
}
 
export default CustomerOrderItemDetail;

