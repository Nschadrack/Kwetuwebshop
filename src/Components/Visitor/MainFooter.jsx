import React from 'react';
import {Link} from "react-router-dom";
import auth from "../../auth";

const card_logo = require("../../images/Major-Credit-Card.png")

const MainFooter = (props) => {
    return ( 
        <div className="main-footer">
            <div className="main-footer-divs">
                <h3>Site map</h3>
                <ul>
                    <li><Link to={'/welcome'}>Welcome</Link></li>
                    <li><Link to={'/in-the-shop'}>Go to shop</Link></li>
                    <li><Link to={"/special-order/place"}>Special Order</Link></li>
                    <li><Link to={"/about/kwetu-trade"}>About us</Link></li>
                    <li><Link to={"/contact/kwetu-trade"}>Contact us</Link></li>
                </ul>
            </div>
            <div className="main-footer-divs">
                <h3>We are social</h3>
                <ul>
                    <li><Link to={{pathname:"https://www.facebook.com/Kwetu-Trade-100217191905605/"}} target="_blank">Facebook</Link></li>
                    <li><Link to={{pathname:"https://www.instagram.com/kwetutrade"}} target="_blank">Instagram</Link></li>
                    <li><Link to={{pathname: "https://twitter.com/KwetuTrade?s=09"}} target="_blank">Twitter</Link></li>
                    <li><Link to="">Youtube</Link></li>
                </ul>
            </div>
            <div className="main-footer-divs">
                <h3>Account</h3>
                <ul>
                    {auth.isAuthenticated(props.authenticated) === true &&
                        <li><Link to={`/${props.activeUser.first_name}-${props.activeUser.last_name}/account`}>My account</Link></li>
                    }
                    <li><Link to={"/cart"}>My shopping cart</Link></li>
                </ul>
            </div>
            <div className="card_logo">
                <h3>Currently, we accept</h3>
                <img src={card_logo}  alt={"card_logo"}/>
            </div>
            <div className="clearboth"></div>
            <div className="main-footer-bottom">
                <div className="main-footer-bottom-divs-left">
                    <p>All rights reserved. &copy; Copyright 2020 - 2025</p>
                </div>
                <div className="main-footer-bottom-divs-middle">
                        <Link to="/" className="bottom-logo">Kwetu Trade</Link>
                </div>
                <div className="main-footer-bottom-divs-right">
                        <Link to={"/about/kwetu-trade"}>Terms & conditions of use and privacy</Link>
                </div>
            </div>
        </div>
     );
}
 
export default MainFooter;