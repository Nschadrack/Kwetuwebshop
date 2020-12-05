import React, {useState} from 'react'
import {animated, useSpring} from "react-spring"
import ShowEntryAddSearch from "./ShowEntryAddSearch"
import Title from "./Title"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"

function Chemical(props){
    // variables declaration
        var productDiv
        var addProductDiv
        var deleteWindow
    // use spring animation
        const animatedMenu = useSpring({
            from:{width:'77%'},
            to:{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}
        })
        const animateAddProduct = useSpring({
            from: {zIndex:-1, opacity: 0},
            to: {zIndex:1, opacity:1}
        })
        const animateDeleteWindow = useSpring({
            from : {opacity: 0, zIndex: -1},
            to: {opacity: 1, zIndex: 1}
        })
    // use state and updating states
        const [showAddProduct, setShowAddProduct] = useState(false)
        const [showDeleteWindow, setDeleteWindow] = useState(false)
        
    const hundleSubmitChemical = function(event){
        event.preventDefault()
        console.log(event.target.elements.chemical_name.value)
        console.log(event.target.elements.chemical_category.value)
        console.log(event.target.elements.chemical_price.value)
        console.log(event.target.elements.currency_price.value)
        console.log(event.target.elements.product_status.value)
        console.log(event.target.elements.chemical_description.value)
        event.target.elements.chemical_name.value =""
        event.target.elements.chemical_category.value = ""
        event.target.elements.chemical_price.value = ""
        event.target.elements.currency_price.value = ""
        event.target.elements.product_status.value = ""
        event.target.elements.chemical_description.value = ""
        setShowAddProduct(false)
    }
    // decisions on division for animation
    // showing delete window

        if (showDeleteWindow){
            deleteWindow = <animated.div style={animateDeleteWindow} className="delete-window-div">
                                <div className="addNewDiv_title">
                                    <h4>delete weight price</h4>
                                    <button onClick={() => setDeleteWindow(false)}>x</button>
                                </div>
                                <div className="delete-window-div_body">
                                    <p>Do you want to this weight price ?</p>
                                    <button>Delete</button>
                                    <button onClick={() => setDeleteWindow(false)}>Cancel</button>
                                </div>
                            </animated.div>
        }
        else{
            deleteWindow = <div></div>
        }


    // add product division
        if (showAddProduct){
            addProductDiv = <animated.div className="addNewDiv" style={animateAddProduct}>
                                <div className="addNewDiv_title">
                                    <h4>Adding new chemical</h4>
                                    <button onClick={() => setShowAddProduct(false)}>x</button>
                                </div>
                                <div className="addNewDiv_body">
                                    <form className="addNewDiv_body_form" onSubmit={hundleSubmitChemical}>
                                        <input type="text" placeholder="chemical name" required name="chemical_name" max="40" autoComplete="off"/>
                                        <input type="text" placeholder="chemical category" required name="chemical_category" max="10" autoComplete="off"/>
                                        <input type="text" placeholder="sell price" required name="chemical_price" max="10" autoComplete="off"/>
                                        <input type="text" placeholder="currency(ex: $ or Rwf)" required name="currency_price" max="10" autoComplete="off"/>
                                        <select name="product_status">
                                            <option disabled>choose product status</option>
                                            <option>Active</option>
                                            <option>Deactive</option>
                                        </select>
                                        <textarea placeholder="chemical description"  name="chemical_description" required></textarea>
                                        <button>Save</button>
                                    </form>
                                </div>
                            </animated.div>
        }
        else{
            addProductDiv = <div className="addNewDiv">
                                <div className="addNewDiv_title">
                                    <h4>Adding new chemical</h4>
                                    <button>x</button>
                                </div>
                                <div className="addNewDiv_body">
                                    <form className="addNewDiv_body_form" onSubmit={hundleSubmitChemical}>
                                        <input type="text" placeholder="chemical name" required name="chemical_name" max="40" autoComplete="off"/>
                                        <input type="text" placeholder="chemical category" required name="chemical_category" max="10" autoComplete="off"/>
                                        <input type="text" placeholder="sell price" required name="chemical_price" max="10" autoComplete="off"/>
                                        <input type="text" placeholder="currency(ex: $ or Rwf)" required name="currency_price" max="10" autoComplete="off"/>
                                        <select name="product_status">
                                            <option disabled>choose product status</option>
                                            <option>Active</option>
                                            <option>Deactive</option>
                                        </select>
                                        <textarea placeholder="chemical description"  name="chemical_description" required></textarea>
                                        <button>Save</button>
                                    </form>
                                </div>
                            </div>
        }

        // product table for aniamation
        if(props.OnAnimate){
            productDiv = <div>
                            <div>
                                <Title title={"Products - Chemicals"} title2={" / products / chemicals"}  OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Chemical"} onSetShowAddProduct = {setShowAddProduct}/>
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
                                            <tr>
                                                <td>ProductProductProductProductProduct</td>
                                                <td>ProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td><span className={"Deactive"}>Deactive</span></td>
                                                <td className="action-buttons">
                                                    <button className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></button>
                                                    <button className="secondButton table-content-button" onClick={() => (setShowAddProduct(true), setDeleteWindow(false))}><FontAwesomeIcon icon={faEdit}/></button>
                                                    <button className="thirdButton table-content-button" onClick={() => (setDeleteWindow(true), setShowAddProduct(false))}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProductProductProduct</td>
                                                <td>ProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td><span className={"Active"}>Active</span></td>
                                                <td className="action-buttons">
                                                    <button className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></button>
                                                    <button className="secondButton table-content-button" onClick={() => (setShowAddProduct(true), setDeleteWindow(false))}><FontAwesomeIcon icon={faEdit}/></button>
                                                    <button className="thirdButton table-content-button" onClick={() => (setDeleteWindow(true), setShowAddProduct(false))}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                            </div>
                        </div>
        }
        else{
            productDiv = <div>
                            <div>
                                <Title title={"Products - Chemicals"} title2={" / products / chemicals"}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                                <ShowEntryAddSearch btnTitle={"Chemical"} onSetShowAddProduct = {setShowAddProduct}/>
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
                                            <tr>
                                                <td>ProductProductProductProductProduct</td>
                                                <td>ProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td><span className={"Deactive"}>Deactive</span></td>
                                                <td className="action-buttons">
                                                    <button className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></button>
                                                    <button className="secondButton table-content-button" onClick={() => (setShowAddProduct(true), setDeleteWindow(false))}><FontAwesomeIcon icon={faEdit}/></button>
                                                    <button className="thirdButton table-content-button" onClick={() => (setDeleteWindow(true), setShowAddProduct(false))}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProductProductProduct</td>
                                                <td>ProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td><span className={"Active"}>Active</span></td>
                                                <td className="action-buttons">
                                                    <button className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></button>
                                                    <button className="secondButton table-content-button" onClick={() => (setShowAddProduct(true), setDeleteWindow(false))}><FontAwesomeIcon icon={faEdit}/></button>
                                                    <button className="thirdButton table-content-button" onClick={() => (setDeleteWindow(true), setShowAddProduct(false))}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {deleteWindow}
                            </animated.div>
                        </div>
        }
        return <div>
                {productDiv}
                {addProductDiv}
            </div>
    }

export default Chemical