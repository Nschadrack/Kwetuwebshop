import React, {Component} from "react";
import {Spring} from "react-spring/renderprops";
import ShowEntryAddSearch from "./ShowEntryAddSearch";
import {Link} from "react-router-dom";
import Title from "./Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import Pagination from "../Visitor/./Pagination";




 // variables declaration
 var productDiv
 var addProductDiv
 var deleteWindow

class Material extends Component {
    state = { 
        showDeleteWindow: false,
        showAddProduct: false,
        activeMaterial: {
            "material_ID": 0,
            "name": "",
            "classification": "material",
            "image": null,
            "status": "Deactive",
            "description": "",
            "currency": "$",
            "price": "",
            "unit": "kg",
            "weight": "",
            "material_shipping_fees": []
        },
        editingMaterial: false

     }

     componentDidUpdate(prevProps, prevState){
        if (prevProps.currentMaterialPosts === this.props.currentMaterialPosts){
                this.props.onFecthMaterialList()
        }
    }

     handleSetShowAddProductSetDeleteCoffeeWindow =(value1, value2, activeMaterial) =>{
        this.setState({showAddProduct: value1, showDeleteWindow:value2})
        if (activeMaterial !== null && value2) {
            this.setState({
                activeMaterial: {
                    ...this.activeMaterial,
                    "material_ID": activeMaterial.material_ID,
                    "name": activeMaterial.name,
                    "image": null,
                    "status": activeMaterial.status,
                    "description": activeMaterial.description,
                    "weight": activeMaterial.weight,
                    "price": activeMaterial.price
                }})    
        }
        else{
            this.setState({
                activeMaterial: {
                    "material_ID": 0,
                    "name": "",
                    "classification": "material",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "currency": "$",
                    "price": "",
                    "unit": "kg",
                    "weight": "",
                    "material_shipping_fees": []
                }
            })
        }
    }


     /* cookie for csrftoken */
     getCookie = (name) =>{
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }


    handleSetShowDeleteWindow = (value) =>{
        this.setState({showDeleteWindow:value, showAddProduct:false})
    }
    handleSetShowAddProduct = (value) =>{
        this.setState({showAddProduct:value, showDeleteWindow:false})
    }
    /* handle changes on input fields */
    handleChangeOnName = (e) =>{
        this.setState({
            activeMaterial:{
                ...this.state.activeMaterial, name:e.target.value
            }
        })
    }
    handleChangeOnImage = (e) =>{
        this.setState({
            activeMaterial:{
                ...this.state.activeMaterial, image: e.target.files[0]
            }
        })
    }
    handleChangeOnDescription = (e) =>{
        this.setState({
            activeMaterial:{
                ...this.state.activeMaterial, description:e.target.value
            }
        })
    }
    handleChangeOnStatus = (e) =>{
        this.setState({
            activeMaterial:{
                ...this.state.activeMaterial, status:e.target.value
            }
        })
    }
    handleChangeOnPrice = (e) =>{
        this.setState({
            activeMaterial:{
                ...this.state.activeMaterial, price:e.target.value
            }
        })
    }
    handleChangeOnWeight = (e) =>{
        this.setState({
            activeMaterial:{
                ...this.state.activeMaterial, weight:e.target.value
            }
        })
    }

    hundleSubmitMaterial = (e) =>{
        e.preventDefault()
        var csrfToken = this.getCookie('csrftoken')
        var url = "http://50.116.29.247/add-new/material/product/"

        let form_data = new FormData()
        form_data.append('name', this.state.activeMaterial.name)
        form_data.append('status', this.state.activeMaterial.status)
        form_data.append('description', this.state.activeMaterial.description)
        form_data.append('price', this.state.activeMaterial.price)
        form_data.append('weight', this.state.activeMaterial.weight)

        if (!this.state.editingMaterial === true){
            form_data.append('image', this.state.activeMaterial.image, this.state.activeMaterial.image.name)
        }

        if (this.state.editingMaterial === true){
            url = `http://50.116.29.247/update/material/product/${this.state.activeMaterial.material_ID}/`
            this.setState({
                editingMaterial: false
            })
            fetch(url,{
                method: "PUT",
                headers:{
                    'content-type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                  body: JSON.stringify(this.state.activeMaterial)
            }).then(response =>{
                this.setState(
                {activeMaterial: {
                    "material_ID": 0,
                    "name": "",
                    "classification": "material",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "currency": "$",
                    "price": "",
                    "unit": "kg",
                    "weight": "",
                    "material_shipping_fees": []
                }})})
            .catch(errors => console.log("ERRORS:", errors))
            this.handleSetShowAddProduct(false)
        }
        else{
            axios.post(url, form_data,{
                headers:{
                    'content-type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                }
            }).then(response =>{
                this.setState(
                {activeMaterial: {
                    "material_ID": 0,
                    "name": "",
                    "classification": "material",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "currency": "$",
                    "price": "",
                    "unit": "kg",
                    "weight": "",
                    "material_shipping_fees": []
                }})})
            .catch(errors => console.log("ERRORS:", errors))
            this.handleSetShowAddProduct(false)
            
        }
    }

    startEditingMaterial = (value1, value2, activeMaterial) =>{
        this.setState({
            showAddProduct:value1,
            showDeleteWindow: value2,
            editingMaterial: true,
            activeMaterial: {
                ...this.state.activeMaterial,
                "material_ID": activeMaterial.material_ID,
                "name": activeMaterial.name,
                "image": null,
                "status": activeMaterial.status,
                "description": activeMaterial.description,
                "price": activeMaterial.price,
                "weight": activeMaterial.weight
            }
            
        })
    }
    deleteMaterialItem = (activeMaterial) =>{
        var url = `http://50.116.29.247/delete/material/product/${activeMaterial.material_ID}/`
        var csrfToken = this.getCookie('csrftoken')

        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type' : 'application/json',
                'X-CSRFToken': csrfToken,
            }
        }).then(response => response.json())
        .then(data => {
            this.setState(
                {activeMaterial: {
                    "material_ID": 0,
                    "name": "",
                    "classification": "material",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "currency": "$",
                    "price": "",
                    "unit": "kg",
                    "weight": "",
                    "material_shipping_fees": []
                }})
            this.handleSetShowDeleteWindow(false)
            alert(data["answer"])
        })   
    }

    render() { 

        if (this.state.showDeleteWindow){
            deleteWindow = <Spring
            from={{opacity: 0, zIndex: -1}}
            to={{opacity: 1, zIndex: 1}}
            config={{delay: 300, duration:1000}}
            >
                {
                    props =>(
                        <div style={props} className="delete-window-div">
                                <div className="addNewDiv_title">
                                    <h4>Deleting material product</h4>
                                    <button onClick={() => this.handleSetShowDeleteWindow(false)}>x</button>
                                </div>
                                <div className="delete-window-div_body">
                                    <p>Do you want to delete this {this.state.activeMaterial.name} ?</p>
                                    <button onClick={() => this.deleteMaterialItem(this.state.activeMaterial)}>Delete</button>
                                    <button onClick={() => this.handleSetShowDeleteWindow(false)}>Cancel</button>
                                </div>
                        </div>
                    )
                }
            </Spring>
            
        }
        else{
            deleteWindow = <div></div>
        }

        if (this.state.showAddProduct){
            addProductDiv = <Spring
                            from={{zIndex:-1, opacity: 0}}
                            to={{zIndex:15, opacity: 1}}
                            >
                                {
                                    props=>(
                                        <div className="addNewDiv" style={props}>
                                            <div className="addNewDiv_title">
                                                <h4>Adding new product material</h4>
                                                <button onClick={() => this.handleSetShowAddProduct(false)}>x</button>
                                            </div>
                                            <div className="addNewDiv_body">
                                                <form className="addNewDiv_body_form" onSubmit={this.hundleSubmitMaterial}>
                                                    <input type="text" placeholder="product name" required name="product_name" maxLength="30" autoComplete="off" 
                                                    defaultValue={this.state.activeMaterial.name} onChange={this.handleChangeOnName}/>
                                                    <input type="number" placeholder="weight(in Kg)" required name="product_category" min="0" autoComplete="off"
                                                    step={"0.01"} defaultValue={this.state.activeMaterial.weight} onChange={this.handleChangeOnWeight}/>
                                                    <input type="number" placeholder="sell price" required name="product_price" autoComplete="off"
                                                    min={"0"} step={"0.01"} defaultValue={this.state.activeMaterial.price} onChange={this.handleChangeOnPrice}/>
                                                    <input type="text" required name="currency_price"  autoComplete="off" disabled
                                                    defaultValue={this.state.activeMaterial.currency}/>
                                                    <select name="product_status" defaultValue={this.state.activeMaterial.status} onChange={this.handleChangeOnStatus}>
                                                        <option>Active</option>
                                                        <option>Deactive</option>
                                                    </select>
                                                    <textarea placeholder="product description"  name="product_description" required minLength={"100"} 
                                                    defaultValue={this.state.activeMaterial.description} onChange={this.handleChangeOnDescription}></textarea>
                                                    {this.state.editingMaterial ? 
                                                    <button style={{marginTop: "20px"}}>Save Changes</button>
                                                    :
                                                    <React.Fragment>
                                                    <p>Product image to appear to customers</p>
                                                    <input type="file" required name="coffee_profile_image" onChange={this.handleChangeOnImage}
                                                    accept="image/*"/>
                                                    <button style={{marginTop: "20px"}}>Save</button>
                                                    </React.Fragment>
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    ) 
                                }

                            </Spring>
        }
        else{
            addProductDiv = <div></div>
                                
        }

        if(this.props.OnAnimate){
            productDiv = <div>
                            <div>
                                <Title title={"Products - Materials"} title2={" / products / materials"}  OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Product"} onSetShowAddProduct = {this.handleSetShowAddProduct}
                                onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentMaterialPosts} searchingCoffee={this.props.searchingCoffee}
                                searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                searchingSpecialOrder={this.props.searchingSpecialOrder} category={"material"} searchingInvoice={this.props.searchingInvoice}/>
                                <div className="clearboth"></div>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Weight<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Added Date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Sell Price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.currentMaterialPosts.map(material =>(
                                                    <tr key={material.material_ID}>
                                                <td><img src={"http://50.116.29.247" + material.image} alt="material"/> {material.name}</td>
                                                <td>{`${material.weight} ${material.unit}`}</td>
                                                <td>{material.added_date}</td>
                                                <td>{`${material.currency} ${material.price}`}</td>
                                                <td><span className={material.status}>{material.status}</span></td>
                                                <td className="action-buttons">
                                                    <Link to={`/admin/kwetu-trade/panel/material/detail/${material.material_ID}`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="secondButton table-content-button" onClick={() => this.startEditingMaterial(true, false, material)}><FontAwesomeIcon icon={faEdit}/></button>
                                                    <button className="thirdButton table-content-button" onClick={() => this.handleSetShowAddProductSetDeleteCoffeeWindow(false, true, material)}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                                <Pagination postsPerpage={this.props.materialPostsPerPage} totalPosts={this.props.totalMaterialPost} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
            productDiv = <div>
                            <div>
                                <Title title={"Products - Materials"} title2={" / products / materials"}/>
                            </div>
                            <Spring 
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay: 500, duration:1000}}
                            >
                                {
                                    props =>(
                                        <div className="main-load-data" style={props}>
                                        <ShowEntryAddSearch btnTitle={"Product"} onSetShowAddProduct = {this.handleSetShowAddProduct}
                                        onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                        setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentMaterialPosts} searchingCoffee={this.props.searchingCoffee}
                                        searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                        searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                        searchingSpecialOrder={this.props.searchingSpecialOrder} category={"material"} searchingInvoice={this.props.searchingInvoice}/>
                                        <div className="clearboth"></div>
                                        <div className="content">
                                            <table className="table-content">
                                                <thead>
                                                    <tr>
                                                        <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Weight<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Added Date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Sell Price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Status</th>
                                                        <th className="action-buttons">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                this.props.currentMaterialPosts.map(material =>(
                                                    <tr key={material.material_ID}>
                                                        <td><img src={"http://50.116.29.247" + material.image} alt={"material"}/> {material.name}</td>
                                                        <td>{`${material.weight} ${material.unit}`}</td>
                                                        <td>{material.added_date}</td>
                                                        <td>{`${material.currency} ${material.price}`}</td>
                                                        <td><span className={material.status}>{material.status}</span></td>
                                                        <td className="action-buttons">
                                                            <Link to={`/admin/kwetu-trade/panel/material/detail/${material.material_ID}`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                            <button className="secondButton table-content-button" onClick={() => this.startEditingMaterial(true, false, material)}><FontAwesomeIcon icon={faEdit}/></button>
                                                            <button className="thirdButton table-content-button" onClick={() => this.handleSetShowAddProductSetDeleteCoffeeWindow(false,true, material)}><FontAwesomeIcon icon={faTrash}/></button>
                                                        </td>
                                                    </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        {deleteWindow}
                                        <Pagination postsPerpage={this.props.materialPostsPerPage} totalPosts={this.props.totalMaterialPost} paginate={this.props.paginate}/>
                                    </div>
                                    )
                                }
                            </Spring>
                        </div>
        }

        return ( 
            <div>
                {productDiv}
                {addProductDiv}
            </div>
         );
    }
}
 
export default Material;



