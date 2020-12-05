import React, { Component } from 'react';
import {Spring} from "react-spring/renderprops";
import Title from "./Title"

var dashboardDiv

class DashBoard extends Component {
    state = { 

     }
    render() { 
        if(this.props.OnAnimate){
            dashboardDiv = <div>
                            <div>
                                <Title title={"Dashboard"} title2={" / dashboard"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <div className="main-load-data">
                                <h1>Dashboard</h1>
                                
                            </div>
                        </div>
        }
        else{
           dashboardDiv = <div>
                            <div>
                                <Title title={"Dashboard"} title2={" / dashboard"} OnAnimateTitle={this.props.OnAnimate}/>
                            </div>
                            <Spring
                            from={{width:'77%'}}
                            to={{width: '90%', position: 'absolute', right: '60px', left: '70px', boxSizing: 'border-box', padding:'15px 60px'}}
                            config={{delay:1000, duration: 500}}>
                                {
                                    props=>(
                                        <div className="main-load-data" style={props}>
                                            <h1>Dashboard</h1>
                                        </div>
                                    )
                                }
                            </Spring>                            
                        </div>
        }
        return ( 
            <div>{dashboardDiv}</div>
         );
    }
}
 
export default DashBoard;
