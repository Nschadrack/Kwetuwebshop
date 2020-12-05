import React, {Component} from 'react'
import FirstComponent from "./FirstComponent"


class MainAll extends Component{
    render(){
        return(
            <div className="main-first-div">
                <FirstComponent {...this.props} onFecthCoffeeList={this.props.onFecthCoffeeList}/>
            </div>
        )
    }
}

export default MainAll