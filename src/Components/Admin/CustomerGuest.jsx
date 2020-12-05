import React, {useState} from 'react'
import {animated, useSpring} from "react-spring"
import Title from "./Title"
import ShowEntryAddSearch from "./ShowEntryAddSearch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"

function CustomerGuest(props){
    // variables declarations
        var customerDiv
        var addCustomerDiv
        var deleteWindow

    // use spring animations
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
    // use states declarations
        const [showDeleteWindow, setDeleteWindow] = useState(false)
        const [showAddProduct, setShowAddProduct] = useState(false)
    // division decision on display
    
        // display delete window
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
        if (showAddProduct){
            addCustomerDiv = <animated.div className="addNewDiv" style={animateAddProduct}>
                                <div className="addNewDiv_title">
                                    <h4>Adding new item</h4>
                                    <button onClick={() => setShowAddProduct(false)}>x</button>
                                </div>
                                <div className="addNewDiv_body">
                                    
                                </div>
                            </animated.div>
        }
        else{
            addCustomerDiv = <div className="addNewDiv">
                                <div className="addNewDiv_title">
                                    <h4>Adding new item</h4>
                                    <button>x</button>
                                </div>
                                <div className="addNewDiv_body">
                                    
                                </div>
                            </div>
        }

        if(props.OnAnimate){
            customerDiv = <div>
                            <div>
                                <Title title={"Customers"} title2={" / customers / guests"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Customer"} onSale={true}/>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>image</th>
                                                <th>Name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>email<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>phone</th>
                                                <th>sex<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>age<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>orders<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th className="action-buttons">options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>Product</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td className="action-buttons">
                                                    <Link to={"/customerguestdetail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="thirdButton table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>Product</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td className="action-buttons">
                                                    <Link to={"/customerguestdetail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="thirdButton table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
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
            customerDiv = <div>
                            <div>
                                <Title title={"Customers"} title2={" / guests"}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                                <ShowEntryAddSearch btnTitle={"Customer"} onSale={true}/>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <th>image</th>
                                            <th>Name<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>email<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>phone</th>
                                            <th>sex<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>age<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th>orders<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            <th className="action-buttons">options</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>Product</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td className="action-buttons">
                                                    <Link to={"/customerguestdetail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="thirdButton table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>Product</td>
                                                <td>12/02/2020</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td className="action-buttons">
                                                    <Link to={"/customerguestdetail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="thirdButton table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
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
                {customerDiv}
                {addCustomerDiv}
            </div>
    }

export default CustomerGuest
