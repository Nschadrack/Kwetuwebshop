import React, {useState} from 'react'
import {animated, useSpring} from "react-spring"
import Title from "./Title"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import ShowEntryAddSearch from "./ShowEntryAddSearch"
import {Link} from "react-router-dom"

function CustomerGuestDetail(props){
    // variables declarations
        var deleteWindow
        var CustomerMemberDetailDiv
    
    // spring animations
        const animatedMenu = useSpring({
            from:{width:'77%'},
            to:{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}
        })
        const animateDeleteWindow = useSpring({
            from : {opacity: 0, zIndex: -1},
            to: {opacity: 1, zIndex: 1}
        })

    // states declarations
        const [showDeleteWindow, setDeleteWindow] = useState(false)

        
    // divisions displaying on if statements

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
    
        /////////////////////////////////////////////
        if(props.OnAnimate){
            CustomerMemberDetailDiv = <div>
                            <div>
                                <Title title={"Customer Guest Detail"} title2={" / Customer-Guest / customer-guest-detail"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                            <div className="customer-info-detail">
                                    <div className="customer-info-detail-divs">
                                        <h2>Customer Info</h2>

                                    </div>
                                    <div className="customer-info-detail-divs">
                                        <h2>Billing Address</h2>

                                    </div>
                                    <div className="customer-info-detail-divs">
                                        <h2>Payment Info & Orders</h2>
                                        <div className="customer-info-detail-divs-body">

                                        </div>
                                    </div>
                                </div>
                                <div className="clearboth"></div>
                                <p className="order-detail-search"><ShowEntryAddSearch btnTitle={"customer"}  onSale={true}/></p>
                                <div className="clearboth"></div>
                                <div className="content">
                                    <p>List of orders made</p>
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Order number<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>products<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>amount<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>3</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td><span className={"Deactive"}>Deactive</span></td>
                                                <td className="action-buttons">
                                                    <Link to={"/order-detail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="thirdButton table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>6</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td><span className={"Active"}>Active</span></td>
                                                <td className="action-buttons">
                                                    <Link to={"/order-detail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
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
            CustomerMemberDetailDiv = <div>
                            <div>
                                <Title title={"Customer Guest Detail"} title2={" / Customer-Guest / customer-guest-detail"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                                <div className="customer-info-detail">
                                    <div className="customer-info-detail-divs">
                                        <h2>Customer Info</h2>

                                    </div>
                                    <div className="customer-info-detail-divs">
                                        <h2>Billing Address</h2>

                                    </div>
                                    <div className="customer-info-detail-divs">
                                        <h2>Payment Info & Orders</h2>
                                        <div className="customer-info-detail-divs-body">

                                        </div>
                                    </div>
                                </div>
                                <div className="clearboth"></div>
                                <p className="order-detail-search"><ShowEntryAddSearch btnTitle={"customer"}  onSale={true}/></p>
                                <div className="clearboth"></div>
                                <div className="content">
                                    <p>List of orders made</p>
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Order number<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date ordered<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>products<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>amount<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>Status</th>
                                                <th className="action-buttons">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>3</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td><span className={"Deactive"}>Deactive</span></td>
                                                <td className="action-buttons">
                                                    <Link to={"/order-detail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
                                                    <button className="thirdButton table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>12/02/2020</td>
                                                <td>6</td>
                                                <td>4562</td>
                                                <td>456</td>
                                                <td><span className={"Active"}>Active</span></td>
                                                <td className="action-buttons">
                                                    <Link to={"/order-detail"} className="firstButton table-content-button"><FontAwesomeIcon icon={faEye}/></Link>
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
        return <div>{CustomerMemberDetailDiv}</div>
    }

export default CustomerGuestDetail