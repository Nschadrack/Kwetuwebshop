import React from 'react'
import {animated, useSpring} from "react-spring"
import Title from "./Title"

function UserProfile(props){
        const animatedMenu = useSpring({
            from:{width:'77%'},
            to:{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}
        })

        var userProfileDiv

        if(props.OnAnimate){
            userProfileDiv = <div>
                            <div>
                                <Title title={"User Profile"} title2={" / user-profile"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <h1>User Profile</h1>
                                
                            </div>
                        </div>
        }
        else{
            userProfileDiv = <div>
                            <div>
                                <Title title={"User Profile"} title2={" / user-profile"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                            <h1>Use Profile</h1>
                            </animated.div>
                        </div>
        }
        return <div>{userProfileDiv}</div>
    }

export default UserProfile