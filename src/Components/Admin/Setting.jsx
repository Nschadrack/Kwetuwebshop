import React from 'react'
import {animated, useSpring} from "react-spring"
import Title from "./Title"

function Setting(props){
        const animatedMenu = useSpring({
            from:{width:'77%'},
            to:{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}
        })

        var settingDiv

        if(props.OnAnimate){
            settingDiv = <div>
                            <div>
                                <Title title={"Settings"} title2={" / settings"} OnAnimateTitle={props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <h1>System Settings</h1>
                                
                            </div>
                        </div>
        }
        else{
            settingDiv = <div>
                            <div>
                                <Title title={"Settings"} title2={" / settings"}/>
                            </div>
                            <animated.div className="main-load-data" style={animatedMenu}>
                            <h1>System Settings</h1>
                            </animated.div>
                        </div>
        }
        return <div>{settingDiv}</div>
    }

export default Setting