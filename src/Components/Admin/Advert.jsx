import React, { Component } from 'react';
import {Spring} from "react-spring/renderprops";
import Title from "./Title";
import ShowEntryAddSearch from "./ShowEntryAddSearch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Pagination from "../Visitor/Pagination";
import {Link} from "react-router-dom";


var advertDiv
var newAdvertDiv
var deleteWindow

class Advert extends Component {
    state = { 
        showDeleteWindow: false,
        showAddNewAdvert : false,
        activeAdvert: {
            id: 0,
            name: "",
            caption: "",
            image: ""
        },
        editingAdvert: false
     }
    
    handleSetDeleteWindow = (value) =>{
        this.setState({showDeleteWindow: value})
    }

    handleSetShowAddNewAdvert = (value) =>{
        this.setState({showAddNewAdvert: value})
        if(value === false){
            this.setState({
                activeAdvert: {
                    id: 0,
                    name: "",
                    caption: "",
                    image: ""
                },
                editingAdvert: false  
            })
        }
    }
    handleSetShowAddProductSetDeleteCoffeeWindow =(value1, value2, value3) =>{
        // this.setState({showAddNewAdvert: value1})
    }

    handleAdvertNameChange = (e) =>{
        this.setState({...this.state, activeAdvert: {...this.state.activeAdvert, name: e.target.value}})
    }
    handleAdvertCaptionChange = (e) =>{
        this.setState({...this.state, activeAdvert: {...this.state.activeAdvert, caption: e.target.value}})
    }
    handleAdvertImageChange = (e) =>{
        this.setState({...this.state, activeAdvert: {...this.state.activeAdvert, image: e.target.files[0]}})
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


      handleSubmittedAdvert = (e) =>{
        e.preventDefault()
        var csrfToken = this.getCookie('csrftoken')
        var url = "http://50.116.29.247/create/new/advert/"

        if(this.state.editingAdvert === true){
            url = `http://50.116.29.247/update/advert/${this.state.activeAdvert.id}/`

            let data = {}
            data["name"] = this.state.activeAdvert.name
            data["caption"] = this.state.activeAdvert.caption 

            fetch(url, {
                method: "PUT",
                headers:{
                    "content-type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify(data)
            }).then(response=> this.setState({activeAdvert:{
                id: 0,
                name: "",
                caption: "",
                image: ""
            }})).then(data => this.fetchAdverts())

            this.setState({editingAdvert: false})
            
        }
        else{
            let data = new FormData()
            data.append("name", this.state.activeAdvert.name)
            data.append("caption", this.state.activeAdvert.caption)
            data.append("image", this.state.activeAdvert.image, this.state.activeAdvert.image.name)

            axios.post(url, data,{
                headers:{
                    "content-type": "multipart/form-data",
                    "X-CSRFToken": csrfToken
                }
            })
            .then(response => {
                this.fetchAdverts()
                this.setState({...this.state,
                activeAdvert: {
                    id: 0,
                    name: "",
                    caption: "",
                    image: ""
                }}) 
            })
        }
            this.handleSetShowAddNewAdvert(false)

            // console.log("Advert: ", this.state.activeAdvert)
    }
    deleteAdvert = (advert) =>{
        var csrfToken = this.getCookie('csrftoken')
        var url =`http://50.116.29.247/delete/advert/${advert.id}/`
        fetch(url, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "X-CSRFToken": csrfToken
            }
        }).then(response =>{
        this.fetchAdverts()
        this.setState({...this.state,
            activeAdvert: {
                id: 0,
                name: "",
                caption: "",
                image: ""
            }})
        })
        this.handleSetDeleteWindow(false)
    }
    handleDelete = (value1, advert) =>{
        this.setState({
            activeAdvert:{...this.state.activeAdvert,
                id: advert.advert_number,
                name: advert.name,
                image: advert.image,
                caption: advert.caption},
            showDeleteWindow: value1,
            showAddNewAdvert: false
        })
    }
    startEditingAdvert = (value1, value2, advert) =>{
        this.setState({
            editingAdvert: value1,
            activeAdvert:{...this.state.activeAdvert,
            id: advert.advert_number,
            name: advert.name,
            image: advert.image,
            caption: advert.caption}
        })

        this.handleSetShowAddNewAdvert(value2)
    }

    fetchAdverts = () =>{
        var url ="http://50.116.29.247/adverts-list/"
        fetch(url).then(response => response.json())
        .then(data => {
            this.props.updateAdvertList(data)
        })
    }
    handlePublish = (id) =>{
        var url =`http://50.116.29.247/advert/${id}/publish-unpublish/`
        fetch(url).then(response => response.json())
        .then(data => this.fetchAdverts())
        
    }
    render() {
        if (this.state.showDeleteWindow){
            deleteWindow = <Spring 
            from={{opacity: 0, zIndex: -1}}
            to={{opacity: 1, zIndex: 1}}>
                {
                    props =>(
                    <div style={props} className="delete-window-div">
                        <div className="addNewDiv_title">
                            <h4>delete an advert</h4>
                            <button onClick={() => this.handleSetDeleteWindow(false)}>x</button>
                        </div>
                        <div className="delete-window-div_body">
                            <p>Do you want to delete this advert <span style={{fontWeight: "bold"}}>{this.state.activeAdvert.name.slice(0, 40)}...</span> ?</p>
                            <button onClick={() => this.deleteAdvert(this.state.activeAdvert)}>Delete</button>
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

        /*************************************************** */
        if(this.state.showAddNewAdvert){
            newAdvertDiv = <Spring from={{zIndex:-1, opacity: 0}} to={{zIndex:19, opacity:1}}>
                            {
                                props => (
                                    <div className="addNewDiv" style={props}>
                                        <div className="addNewDiv_title">
                                            <h4>Adding new Advert</h4>
                                            <button onClick={() =>this.handleSetShowAddNewAdvert(false)}>x</button>
                                        </div>
                                        <div className="addNewDiv_body">
                                            <form className="addNewDiv_body_form" onSubmit={this.handleSubmittedAdvert}>
                                                <input type="text" placeholder="Enter name of an advert" required name="advert_name" autoComplete="off" defaultValue={this.state.activeAdvert.name}
                                                onChange={this.handleAdvertNameChange} maxLength={"100"}/>
                                                <textarea placeholder="Write the caption for this advert less than 200 characters, but it is optional"  name="advert_description" defaultValue={this.state.activeAdvert.caption}
                                                onChange={this.handleAdvertCaptionChange}  maxLength={"200"}></textarea>
                                                {!this.state.editingAdvert && 
                                                <React.Fragment>
                                                <p>Advert picture and is required</p>
                                                <input type="file" required name="advert_image" onChange={this.handleAdvertImageChange}
                                                accept="image/*"/>
                                                </React.Fragment>
                                                }
                                                {!this.state.editingAdvert?
                                                <button>Save advert</button>
                                                :
                                                <button style={{marginTop: "30px"}}>Save Changes on advert</button>
                                                }
                                            </form>
                                        </div>
                                    </div>
                                )
                            }
                    </Spring>
            
        }
        else{
            newAdvertDiv = <div></div>
        }

        /******************************************************* */

        if(this.props.OnAnimate){
            advertDiv = <div>
                            <div>
                                <Title title={"Adverts"} title2={" / adverts"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Advert"} onSetShowAddProduct = {this.handleSetShowAddNewAdvert} 
                                    onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                    setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentAdvertsPosts} searchingCoffee={this.props.searchingCoffee}
                                    searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                    searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer} 
                                    searchingSpecialOrder={this.props.searchingSpecialOrder} searchingAdvert={this.props.searchingAdvert} category={"advert"}
                                    searchingInvoice={this.props.searchingInvoice}/>
                                
                                <div className="clearBoth"></div>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>no<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Advert name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Uploaded date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Published date</th>
                                                <th>status<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th className="action-buttons" colSpan="2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.currentAdvertsPosts.map(advert =>(
                                                <tr key={advert.advert_number}>
                                                    <td>{advert.advert_number}</td>
                                                    <td>{`${advert.name.slice(0, 40)}...`}</td>
                                                    <td>{`${advert.uploaded_date.slice(0, 10)} ${advert.uploaded_date.slice(11, 19)}`}</td>
                                                    {advert.published_date !== null ?
                                                        <td>{`${advert.published_date.slice(0, 10)} ${advert.published_date.slice(11, 19)}`}</td>
                                                    :
                                                        <td></td>
                                                    }
                                                    <td><span className={advert.status}>{advert.status}</span></td>
                                                    <td className="action-buttons">
                                                        <Link to={`/admin/kwetu-trade/panel/advert/${advert.advert_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                        <button className="secondButton table-content-button" onClick={() => this.startEditingAdvert(true, true, advert)}><FontAwesomeIcon icon={faEdit}/></button>
                                                        <button className="thirdButton  table-content-button" onClick={() => this.handleDelete(true, advert)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </td>
                                                    <td>
                                                        <button className="secondButton" onClick={() => this.handlePublish(advert.advert_number)} style={{padding: "5px 0px", color: "white", boxSizing:"border-box"}}>
                                                            {advert.published ?
                                                                    <span style={{backgroundColor: "rgb(20, 20, 50)", padding: "5px"}}>unpublish</span>
                                                                :
                                                                    <span style={{backgroundColor: "rgb(200,150,50)", padding: "5px"}}>publish</span>
                                                            }
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                                <Pagination postsPerpage={this.props.advertsPostsPerPage} totalPosts={this.props.totalAdvertsPost} paginate={this.props.paginate}/>
                            </div>
                        </div>
        }
        else{
            advertDiv = <div>
                            <div>
                                <Title title={"Adverts"} title2={" / adverts"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay:1000, duration: 500}}>
                                {
                                    props=>(
                                        <div className="main-load-data" style={props}>
                                            <ShowEntryAddSearch btnTitle={"Advert"} onSetShowAddProduct = {this.handleSetShowAddNewAdvert} 
                                            onHandleSetShowAddProductSetDeleteCoffeeWindow={this.handleSetShowAddProductSetDeleteCoffeeWindow}
                                            setPostsPerPage={this.props.setPostsPerPage} currentPosts={this.props.currentAdvertsPosts} searchingCoffee={this.props.searchingCoffee}
                                            searchingMaterial={this.props.searchingMaterial} searchingAnimal={this.props.searchingAnimal}
                                            searchingOrder={this.props.searchingOrder} searchingCustomer={this.props.searchingCustomer} 
                                            searchingSpecialOrder={this.props.searchingSpecialOrder} searchingAdvert={this.props.searchingAdvert} category={"advert"}
                                            searchingInvoice={this.props.searchingInvoice}/>
                                            <div className="clearBoth"></div>
                                            <div className="content">
                                            <table className="table-content">
                                                <thead>
                                                    <tr>
                                                        <th>no<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Advert name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Uploaded date<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th>Published date</th>
                                                        <th>status<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                        <th className="action-buttons" colSpan="2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.props.currentAdvertsPosts.map(advert =>(
                                                        <tr key={advert.advert_number}>
                                                            <td>{advert.advert_number}</td>
                                                            <td>{`${advert.name.slice(0, 40)}...`}</td>
                                                            <td>{`${advert.uploaded_date.slice(0, 10)} ${advert.uploaded_date.slice(11, 19)}`}</td>
                                                            {advert.published_date !== null ?
                                                                <td>{`${advert.published_date.slice(0, 10)} ${advert.published_date.slice(11, 19)}`}</td>
                                                            :
                                                                <td></td>
                                                            }
                                                            <td><span className={advert.status}>{advert.status}</span></td>
                                                            <td className="action-buttons">
                                                                <Link to={`/admin/kwetu-trade/panel/advert/${advert.advert_number}/detail`} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                                <button className="secondButton table-content-button" onClick={() => this.startEditingAdvert(true, true, advert)}><FontAwesomeIcon icon={faEdit}/></button>
                                                                <button className="thirdButton  table-content-button" onClick={() => this.handleDelete(true, advert)}><FontAwesomeIcon icon={faTrash}/></button>
                                                            </td>
                                                            <td>
                                                                <button className="secondButton" onClick={() => this.handlePublish(advert.advert_number)} style={{padding: "5px 0px", color: "white", boxSizing:"border-box"}}>
                                                                    {advert.published ?
                                                                            <span style={{backgroundColor: "rgb(20, 20, 50)", padding: "5px"}}>unpublish</span>
                                                                        :
                                                                            <span style={{backgroundColor: "rgb(200,150,50)", padding: "5px"}}>publish</span>
                                                                    }
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {deleteWindow}
                                        <Pagination postsPerpage={this.props.advertsPostsPerPage} totalPosts={this.props.totalAdvertsPost} paginate={this.props.paginate}/>
                                    </div>
                                    )
                                }
                            </Spring>                            
                        </div>
        }
        return ( 
            <div>
                {advertDiv}
                {newAdvertDiv}
            </div>
         );
    }
}
 
export default Advert;
