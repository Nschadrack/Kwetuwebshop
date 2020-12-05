import React, {useState} from 'react'
import {animated, useSpring} from "react-spring"

function Weight(props){
        var animateWeightDiv =useSpring({
            from: {opacity: 0},
            to: {opacity: 1}
        })
        const [showWeight, setShowWeightDiv] = useState(true)
        var weightDiv
        if(showWeight){
            weightDiv = <animated.div className="weight-div" style={animateWeightDiv}>
                            <div className="addNewDiv_title">
                                <h4>coffe name weight price</h4>
                                <button onClick={() => setShowWeightDiv(!showWeight)}>x</button>
                            </div>
                            <div className="weight-div-body">
                                <p>weight-div body</p>
                                <div className="bind-weight-table">
                                    <table className="weight-div-table">
                                        <thead>
                                            <th>quantity</th>
                                            <th>Unit</th>
                                            <th>price</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>quantity</td>
                                                <td>unit</td>
                                                <td>price</td>
                                            </tr>
                                            <tr>
                                                <td>quantity</td>
                                                <td>unit</td>
                                                <td>price</td>
                                            </tr>
                                            <tr>
                                                <td>quantity</td>
                                                <td>unit</td>
                                                <td>price</td>
                                            </tr>
                                            <tr>
                                                <td>quantity</td>
                                                <td>unit</td>
                                                <td>price</td>
                                            </tr>
                                            <tr>
                                                <td>quantity</td>
                                                <td>unit</td>
                                                <td>price</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </animated.div>
        }
        else{
            weightDiv = <div className="weight-div">
                            
                        </div>
        }

        return <div>{weightDiv}</div>

}
        
export default Weight