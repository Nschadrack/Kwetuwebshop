import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faBell, faUserFriends, faAngleRight, faFirstAid, faBook, faCoffee, faKiwiBird, faTable, faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

const profile = require("../../images/admin_profile.jpg")

function AsideNavigation(props){
        return(
            <div className="aside-navigation">
                <div className="userProfile">
                    <div className="profile-pic">
                        <img src={profile} alt={"admin"}/>
                        <div className="profile-names">
                            {props.activeSuperuser !== undefined &&
                                <p style={{textDecoration: "underline"}}>{`${props.activeSuperuser.first_name} ${props.activeSuperuser.last_name}`}</p>
                            }
                            <p>Kwetu Trade Administrator</p>
                        </div>
                    </div>
                </div>
                <Link to={"/admin/kwetu-trade/panel"} className={props.onDashboard}><span className={"NavIcons"}><FontAwesomeIcon icon={faHome}/></span>Dashboard<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/products-Coffee"} className={props.onCoffee}><span className="NavIcons"><FontAwesomeIcon icon={faCoffee}/></span>Coffee<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/products-materials"} className={props.onMaterial}><span className="NavIcons"><FontAwesomeIcon icon={faTable}/></span>Materials<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/products-animals"} className={props.onAnimal}><span className="NavIcons"><FontAwesomeIcon icon={faKiwiBird}/></span>Animals<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/orders"} className={props.onOrder}><span className="NavIcons"><FontAwesomeIcon icon={faFirstAid}/></span>Orders<span className="new-span">{props.orders.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/special-orders"} className={props.onSpecialOrder}><span className="NavIcons"><FontAwesomeIcon icon={faBook}/></span>Special Orders<span className="new-span">{props.specialOrdersList.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                {/* <Link to={"/admin/kwetu-trade/panel/sales"} className={props.onSale}><span className="NavIcons"><FontAwesomeIcon icon={faFileArchive}/></span>Sales<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link> */}
                <Link to={"/admin/kwetu-trade/panel/customers/members"} className={props.onActiveCustomer}><span className="NavIcons"><FontAwesomeIcon icon={faUserFriends}/></span>Active Customers<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/adverts"} className={props.onAdvert}>Adverts<span className="new-span">{props.adverts.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                {/* <Link to={"/admin/kwetu-trade/panel/customers/guests"} className={props.onGuestCustomer}><span className="NavIcons"><FontAwesomeIcon icon={faUserFriends}/></span>Guest Customers<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link> */}
                <Link to={"/admin/kwetu-trade/panel/invoices"} className={props.onInvoice}><span className="NavIcons"><FontAwesomeIcon icon={faFileInvoice}/></span>Invoices<span className="new-span">{props.invoices.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                <Link to={"/admin/kwetu-trade/panel/notifications"} className={props.onNotification}><span className="NavIcons"><FontAwesomeIcon icon={faBell}/></span>Notifications<span className="new-span">{props.newOrders.length + props.newSpecialOrders.length}</span><span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link>
                {/* <Link to={"/admin/kwetu-trade/panel/user-profile"} className={props.onUserProfile}><span className="NavIcons"><FontAwesomeIcon icon={faUser}/></span>User Profile<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link> */}
                {/* <Link to={"/admin/kwetu-trade/panel/settings"} className={props.onSetting}><span className="NavIcons"><FontAwesomeIcon icon={faCog}/></span>Settings<span className="NavIcons2"><FontAwesomeIcon icon={faAngleRight}/></span></Link> */}
            </div>
        )
}

export default AsideNavigation