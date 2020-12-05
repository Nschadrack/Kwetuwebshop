import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch, faBell, faUser} from '@fortawesome/free-solid-svg-icons'



function SearchNotification(props){
        const showNotification = props.valueAddNoti
        const showUserBell = props.valueAddUser
        return(
            <div className="search-notification-user">
                <div className="search-icon">
                    <form className="form-main-search">
                        <input type="text" name="mainSearchBar" placeholder="search from the main search ...." autoComplete="off"/>
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                </div>
                <div className="notification-user">
                    <React.Fragment>
                    {(props.newOrders.length + props.newSpecialOrders.length) !== 0 &&
                        <span>{props.newOrders.length + props.newSpecialOrders.length}</span>}
                        <FontAwesomeIcon icon={faBell} id="note-icon" onClick={() => props.onSetShowNotification(!showNotification)}/>
                    </React.Fragment>
                    <FontAwesomeIcon icon={faUser} onClick={() => props.onSetShowUserBell(!showUserBell)}/>
                </div>
            </div>
        )
}

export default SearchNotification