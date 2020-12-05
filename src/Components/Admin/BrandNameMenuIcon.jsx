import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'


function BrandNameMenuIcon(props){
    const showMenu = props.menuValue
    return(
        <div className="brand-name-menu-icon">
            <div className="brand-name">
                <h2>Kwetu Trade</h2>
            </div>
            <div className="notification-user">
                <FontAwesomeIcon icon={faBars} size="lg" onClick={() => props.OnsetShowMenu(!showMenu)}/>
            </div>
        </div>
    )
}

export default BrandNameMenuIcon
