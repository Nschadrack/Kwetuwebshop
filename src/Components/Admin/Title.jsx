import React from 'react'
import {animated, useSpring} from "react-spring"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHome} from '@fortawesome/free-solid-svg-icons'


function Title(props){
    const animatedMenu = useSpring({
        from:{left: '315px'},
        to:{left: '70px'}
    })
    var titleDiv
    if(props.OnAnimateTitle){
        titleDiv = <div className="title">
                        <h3>{ props.title }</h3>
                        <p><span><FontAwesomeIcon icon={faHome}/></span>{ props.title2 }</p>
                    </div>
    }
    else{
        titleDiv = <animated.div className="title" style={animatedMenu}>
                        <h3>{ props.title }</h3>
                        <p><span><FontAwesomeIcon icon={faHome}/></span>{ props.title2 }</p>
                    </animated.div>
    }
    return <div>{titleDiv}</div>
}

export default Title