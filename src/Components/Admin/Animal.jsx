import React, {Component} from "react";
import ShowEntryAddSearch from "./ShowEntryAddSearch";
import {Spring} from "react-spring/renderprops";
import {Link} from "react-router-dom";
import Title from "./Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Pagination from "../Visitor/./Pagination";



 // variables declaration
 var productDiv
 var addProductDiv
 var deleteWindow

class Animal extends Component {
    state = { 
        showDeleteWindow:false,
        showAddProduct: false,
        activeAnimal: {
            "animal_ID": 0,
            "name": "",
            "image": null,
            "status": "Deactive",
            "description": "",
            "price": "",
            "unit": "kg",
            "weight": "",
            "animal_shipping_fees": []
        },
        editingAnimal: false
     }

     componentDidUpdate(prevProps, prevState){
        if (prevProps.currentAnimalPosts === this.props.currentAnimalPosts){
                this.props.onFecthAnimalList()
        }
    }

    handleSetShowAddProductSetDeleteCoffeeWindow =(value1, value2, activeAnimal) =>{
        this.setState({showAddProduct: value1, showDeleteWindow:value2})
        if (activeAnimal !== null && value2) {
            this.setState({
                activeAnimal: {
                    ...this.activeAnimal,
                    "animal_ID": activeAnimal.animal_ID,
                    "name": activeAnimal.name,
                    "image": null,
                    "status": activeAnimal.status,
                    "description": activeAnimal.description,
                    "weight": activeAnimal.weight,
                    "price": activeAnimal.price
                }})    
        }
        else{
            this.setState({
                activeAnimal: {
                    "animal_ID": 0,
                    "name": "",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "price": "",
                    "unit": "kg",
                    "weight": "",
                    "animal_shipping_fees": []
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
    /* handling changes on input fields */
    handleChangeOnName = (e) =>{
        this.setState({activeAnimal:
        {...this.state.activeAnimal, name: e.target.value}})
        console.log(e.target.value)
    }
    handleChangeOnImage = (e) =>{
        this.setState({activeAnimal:
            {...this.state.activeAnimal, image: e.target.files[0]}})
    }  

    handleChangeOnStatus = (e) =>{
        this.setState({activeAnimal:
            {...this.state.activeAnimal, status: e.target.value}})
    }
    handleChangeOnDescription = (e) =>{
        this.setState({activeAnimal:
            {...this.state.activeAnimal, description: e.target.value}})
    }
    handleChangeOnPrice = (e) =>{
        this.setState({activeAnimal:
            {...this.state.activeAnimal, price: e.target.value}})
    }
    handleChangeOnWeight = (e) =>{
        this.setState({activeAnimal:
            {...this.state.activeAnimal, weight: e.target.value}})
        console.log(this.state.activeAnimal)
    }

    handleSetDeleteWindow = (value) =>{
        this.setState({showDeleteWindow:value, showAddProduct:false})
    }
    handleSetShowAddProduct = (value) =>{
        this.setState({showDeleteWindow:false, showAddProduct:value})
    }
    hundleSubmitAnimal = (e) =>{
        e.preventDefault()
        var csrfToken = this.getCookie('csrftoken')
        var url = "http://50.116.29.247/add-new/animal/product/"

        let form_data = new FormData()
        form_data.append('name', this.state.activeAnimal.name)
        form_data.append('status', this.state.activeAnimal.status)
        form_data.append('description', this.state.activeAnimal.description)
        form_data.append('price', this.state.activeAnimal.price)
        form_data.append('weight', this.state.activeAnimal.weight)

        if (!this.state.editingAnimal === true){
            form_data.append('image', this.state.activeAnimal.image, this.state.activeAnimal.image.name)
        }

        if (this.state.editingAnimal === true){
            url = `http://50.116.29.247/update/animal/product/${this.state.activeAnimal.animal_ID}/`
            this.setState({
                editingAnimal: false
            })
            fetch(url,{
                method: "PUT",
                headers:{
                    'content-type': 'application/json',
                    'X-CSRFToken': csrfToken,
                  },
                  body: JSON.stringify(this.state.activeAnimal)
            }).then(response =>(
                this.setState({
                    activeAnimal: {
                        "animal_ID": 0,
                        "name": "",
                        "image": null,
                        "status": "Deactive",
                        "description": "",
                        "price": "",
                        "unit": "kg",
                        "weight": "",
                        "animal_shipping_fees": []
                    }})))
            .catch(errors => console.log("ERRORS:", errors))
            this.handleSetShowAddProduct(false)
        }
        else{
            axios.post(url, form_data, {
                headers:{
                    'content-type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                }
            }).then(response =>(
                this.setState({
                    activeAnimal: {
                        "animal_ID": 0,
                        "name": "",
                        "image": null,
                        "status": "Deactive",
                        "description": "",
                        "price": "",
                        "unit": "kg",
                        "weight": "",
                        "animal_shipping_fees": []
                    }}))).catch(errors => console.log("ERRORS:", errors))
            this.handleSetShowAddProduct(false)
        }  
    }
    
    startEditingAnimal = (value1, value2, activeAnimal) =>{
        this.setState({
            showAddProduct:value1,
            showDeleteWindow: value2,
            editingAnimal: true,
            activeAnimal: {
                ...this.state.activeAnimal,
                "animal_ID": activeAnimal.animal_ID,
                "name": activeAnimal.name,
                "image": null,
                "status": activeAnimal.status,
                "description": activeAnimal.description,
                "price": activeAnimal.price,
                "weight": activeAnimal.weight
            }
            
        })
    }
    deleteAnimalItem = (activeAnimal) =>{
        var url = `http://50.116.29.247/delete/animal/product/${activeAnimal.animal_ID}/`
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
                {activeAnimal: {
                    "animal_ID": 0,
                    "name": "",
                    "image": null,
                    "status": "Deactive",
                    "description": "",
                    "price": "",
                    "unit": "kg",
                    "weight": "",
                    "animal_shipping_fees": []
                }})
            this.handleSetDeleteWindow(false)
            alert(data["answer"])  
        }) 
    }

    render() {
        if (this.state.showDeleteWindow){
            deleteWindow = <Spring 
                            from={{opacity: 0, zIndex: -1}}
                            to={{opacity: 1, zIndex: 1}}
                            config={{delay: 300, duration: 1000}}
                            >
                            {
                                props=>(
                                    <div style={props} className="delete-window-div">
                                        <div className="addNewDiv_title">
                                            <h4>Deleting animal product</h4>
                                            <button onClick={() => this.handleSetDeleteWindow(false)}>x</button>
                                        </div>
                                        <div className="delete-window-div_body">
                                            <p>Do you want to this {this.state.activeAnimal.name} ?</p>
                                            <button onClick={() => this.deleteAnimalItem(this.state.activeAnimal)}>Delete</button>
                                            <button onClick={() => this.handleSetDeleteWindow(false)}>Cancel</button>
                                        </div>
                                    </div>
                                )
                            }
                        </Spring>
        }
        else{
            deleteWindow = <div></div>
        }

        /* add product division */
        if (this.state.showAddProduct){
            addProductDiv = <Spring 
                            from={{zIndex:-1, opacity: 0}}
                            to={{zIndex:15, opacity:1}}
                            >
                                {
                                    props =>(
                                    <div className="addNewDiv" style={props}>
                                        <div className="addNewDiv_title">
                                            <h4>Adding new animal</h4>
                                            <button onClick={() => this.handleSetShowAddProduct(false)}>x</button>
                                        </div>
                                        <div className="addNewDiv_body">
                                            <form className="addNewDiv_body_form" onSubmit={this.hundleSubmitAnimal}>
                                                <input type="text" placeholder="animal name" required name="animal_name" maxLength="30" autoComplete="off"
                                                defaultValue={this.state.activeAnimal.name} onChange={this.handleChangeOnName}/>
                                                <input type="number"  name="animal_weight" placeholder="weight of animal in kg" autoComplete="off" min={"0"} step={"0.01"}
                                                defaultValue={this.state.activeAnimal.weight} onChange={this.handleChangeOnWeight}/>
                                                <input type="number" placeholder="sell price" required name="animal_price" min={"0"} step={"0.01"} autoComplete="off"
                                                defaultValue={this.state.activeAnimal.price} onChange={this.handleChangeOnPrice}/>
                                                <input type="text" placeholder="currency(ex: $ or Rwf)" required name="currency_price" max="10" autoComplete="off" disabled
                                                defaultValue="$"/>
                                                <select name="product_status" defaultValue={this.state.activeAnimal.status} required onChange={this.handleChangeOnStatus}>
                                                    <option>Active</option>
                                                    <option>Deactive</option>
                                                </select>
                                                <textarea placeholder="animal description"  name="animal_description" required minLength={"100"}
                                                defaultValue={this.state.activeAnimal.description} onChange={this.handleChangeOnDescription}></textarea>
                                                {this.state.editingAnimal ?
                                                <button style={{marginTop: "20px"}}>Save Changes</button>
                                                :
                                                <React.Fragment>
                                                <p>Product image to appear to customers</p>
                                                <input type="file" required name="coffee_profile_image" onChange={this.handleChangeOnImage}/>
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

         // product table for aniamation
         if(this.props.OnAnimate){
            productDiv = <div>
                            <div>
                                <Title title={"Products - Animals"} title2={" / products / animals"}  OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Animal"} onSetShowAddProduct = {this.handleSetShowAddProduct}
                                onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentAnimalPosts} searchingCoffee={this.props.searchingCoffee}
                                searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal} 
                                searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                searchingSpecialOrder={this.props.searchingSpecialOrder} category={"animal"} searchingInvoice={this.props.searchingInvoice}/>
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
                                                this.props.currentAnimalPosts.map(animal => (
                                                    <tr key={animal.animal_ID}>
                                                        <td><img src={"http://50.116.29.247" + animal.image} alt="animal"/> {animal.name}</td>
                                                        <td>{`${animal.weight} ${animal.unit}`}</td>
                                                        <td>{animal.added_date}</td>
                                                        <td>{`${animal.currency} ${animal.price}`}</td>
                                                        <td><span className={animal.status}>{animal.status}</span></td>
                                                        <td className="action-buttons">
                                                            <Link to={`/admin/kwetu-trade/panel/animal/detail/${animal.animal_ID}`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                            <button className="secondButton table-content-button" onClick={() => this.startEditingAnimal(true, false, animal)}><FontAwesomeIcon icon={faEdit}/></button>
                                                            <button className="thirdButton table-content-button" onClick={() => this.handleSetShowAddProductSetDeleteCoffeeWindow(false, true, animal)}><FontAwesomeIcon icon={faTrash}/></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                                <Pagination postsPerpage={this.props.AnimalPostsPerPage} totalPosts={this.props.totalAnimalPost} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
            productDiv = <div>
                            <div>
                                <Title title={"Products - Animals"} title2={" / products / animals"}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay: 300, duration:1000}}
                            >
                                {
                                    props =>(
                                        <div className="main-load-data" style={props}>
                                            <ShowEntryAddSearch btnTitle={"Animal"} onSetShowAddProduct = {this.handleSetShowAddProduct}
                                            onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                            setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentAnimalPosts} searchingCoffee={this.props.searchingCoffee}
                                            searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                            searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer}
                                            searchingSpecialOrder={this.props.searchingSpecialOrder} category={"animal"} searchingInvoice={this.props.searchingInvoice}/>
                                            <div className="clearboth"></div>
                                            <div className="content">
                                                <table className="table-content">
                                                    <thead>
                                                        <tr>
                                                            <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                            <th>Category<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                            <th>Added Date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                            <th>Sell Price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                            <th>Status</th>
                                                            <th className="action-buttons">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.props.currentAnimalPosts.map(animal => (
                                                            <tr key={animal.animal_ID}>
                                                                <td><img src={"http://50.116.29.247" + animal.image} alt="animal"/> {animal.name}</td>
                                                                <td>{`${animal.weight} ${animal.unit}`}</td>
                                                                <td>{animal.added_date}</td>
                                                                <td>{`${animal.currency} ${animal.price}`}</td>
                                                                <td><span className={animal.status}>{animal.status}</span></td>
                                                                <td className="action-buttons">
                                                                    <Link to={`/admin/kwetu-trade/panel/animal/detail/${animal.animal_ID}`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                                    <button className="secondButton table-content-button" onClick={() => this.startEditingAnimal(true, false, animal)}><FontAwesomeIcon icon={faEdit}/></button>
                                                                    <button className="thirdButton table-content-button" onClick={() => this.handleSetShowAddProductSetDeleteCoffeeWindow(false, true, animal)}><FontAwesomeIcon icon={faTrash}/></button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {deleteWindow}
                                            <Pagination postsPerpage={this.props.AnimalPostsPerPage} totalPosts={this.props.totalAnimalPost} paginate={this.props.paginate}/>
                            `           </div>
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
 
export default Animal;
