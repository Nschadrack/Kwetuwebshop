import React, {useState} from 'react'
import {animated, useSpring} from "react-spring"
import Title from "./Title"
import ShowEntryAddSearch from "./ShowEntryAddSearch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDown, faArrowUp, faEye, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"

function Sale(props){
        const animatedMenu = useSpring({
            from:{width:'77%'},
            to:{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}
        })
        var saleDiv

        if(props.OnAnimate){
            saleDiv = <div>
                            <div>
                                <Title title={"Sales"} title2={" / sales"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <ShowEntryAddSearch btnTitle={"Sale"} onSale={'true'}/>
                                <div className="clearboth"></div>
                                <div className="content">
                                    <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>total price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>order number<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date sold<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>852</td>
                                                <td>12</td>
                                                <td>4562</td>
                                                <td>456879</td>
                                                <td>12/10/2020</td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>954</td>
                                                <td>8</td>
                                                <td>4562</td>
                                                <td>4561789</td>
                                                <td>10/11/2020</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
        }
        else{
            saleDiv = <div>
                            <div>
                                <Title title={"Sales"} title2={" / sales"}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                                <ShowEntryAddSearch btnTitle={"Sale"} onSale={true}/>
                                <div className="clearboth"></div>
                                <div className="content">
                                <table className="table-content">
                                        <thead>
                                            <tr>
                                                <th>Product<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>quantity<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>total price<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>order number<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                                <th>date sold<span className="arrowsUpDown"><FontAwesomeIcon icon={faArrowUp}/><FontAwesomeIcon icon={faArrowDown}/></span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>852</td>
                                                <td>12</td>
                                                <td>4562</td>
                                                <td>456879</td>
                                                <td>12/10/2020</td>
                                            </tr>
                                            <tr>
                                                <td>ProductProductProduct</td>
                                                <td>954</td>
                                                <td>8</td>
                                                <td>4562</td>
                                                <td>4561789</td>
                                                <td>10/11/2020</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </animated.div>
                        </div>
        }
        return <div>
                    {saleDiv}
                </div>
    }

export default Sale