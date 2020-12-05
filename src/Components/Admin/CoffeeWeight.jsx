import React, { Component } from 'react';
import {useSpring, animated} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Spring} from 'react-spring/renderprops';


var weightDiv
var addNewWeightDiv
var deleteWindow

class CoffeeWeight extends Component {
        state = { 
            showWeight: false,
            showNewWeight: false,
            showDeleteWindow: false,
    
         }    

     // handling forms
    handleSubmitNewWeight = function(event){
        event.preventDefault()
        event.target.elements.quantiy_weight.value = ""
        event.target.elements.unit_weight.value = ""
        event.target.elements.price_weight.value = ""
        event.target.elements.weight_currency.value = ""
        this.setState({showNewWeight: false})
    }
    handleSetDeleteWindow = (value) =>{
        this.setState({showDeleteWindow:value})
    }
    handleSetShowWeightDivSetShowNewWeight = (value1, value2) =>{
        this.setState({
            showWeight:value1,
            showNewWeight: value2,

        })
    }
    handleSetShowNewWeight = (value) =>{
        this.setState({showNewWeight:value})
    }



    render() { 
        if(this.state.showWeight){
            weightDiv = <Spring from={{opacity: 0, zIndex:-1}} to={{opacity: 1, zIndex:1}}>
                            {
                            props =>(
                            <div className="weight-div" style={props}>
                                <div className="addNewDiv_title">
                                    <h4>coffee weights and prices</h4>
                                    <button onClick={() => this.handleSetShowWeightDivSetShowNewWeight(false, false)}>x</button>
                                </div>
                                <div className="weight-div-body">
                                    <p>Name of the coffee</p>
                                    <div className="bind-weight-table">
                                        <table className="weight-div-table">
                                            <thead>
                                                <tr>
                                                    <th>quantity</th>
                                                    <th>Unit</th>
                                                    <th>price</th>
                                                    <th>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>quantity</td>
                                                    <td>unit</td>
                                                    <td>price</td>
                                                    <td><button className="secondButton table-content-button" onClick={() => this.handleSetShowNewWeight(true)}><FontAwesomeIcon icon={faEdit}/></button>
                                                        <button className="thirdButton  table-content-button" onClick={() => this.handleSetDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>quantity</td>
                                                    <td>unit</td>
                                                    <td>price</td>
                                                    <td>
                                                        <button className="secondButton table-content-button" onClick={() => this.handleSetShowNewWeight(true)}><FontAwesomeIcon icon={faEdit}/></button>
                                                        <button className="thirdButton  table-content-button" onClick={() => this.handleSetDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>quantity</td>
                                                    <td>unit</td>
                                                    <td>price</td>
                                                    <td>
                                                        <button className="secondButton table-content-button" onClick={() => this.handleSetShowNewWeight(true)}><FontAwesomeIcon icon={faEdit}/></button>
                                                        <button className="thirdButton  table-content-button" onClick={() => this.handleSetDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button className="new-price-weight" onClick={() => this.handleSetShowNewWeight(true)}>New price weight</button>
                                </div>
                                <div>{addNewWeightDiv}</div>
                                <div>{deleteWindow}</div>
                            </div>
                            )}
            </Spring>        
        }
        else{
            weightDiv = <div className="weight-div">
                            
                        </div>
        }

        // showing new division
        if(this.state.showNewWeight){
            addNewWeightDiv = <Spring from={{opacity: 0}} to={{opacity: 1}}>
                                {
                                props => (
                                <div style={props} className="new-weight-div">
                                    <div className="addNewDiv_title">
                                        <h4>New weight price</h4>
                                        <button onClick={() => this.handleSetShowNewWeight(false)}>x</button>
                                    </div>
                                    <div className="new-weight-form">
                                        <form onSubmit={this.handleSubmitNewWeight}>
                                            <input type="text"  required name="quantiy_weight" placeholder="package quantity(ex: 250)" autoComplete="off"/>
                                            <input type="text" placeholder="unit package(ex:g)" name="unit_weight" required autoComplete="off"/>
                                            <input type="text"  required name="price_weight" placeholder="package price" autoComplete="off"/>
                                            <input type="text" placeholder="currency ex: $ or Rwf" name="weight_currency" required autoComplete="off"/>
                                            <button>Save</button>
                                        </form>
                                    </div>
                                </div>
                                )}
            </Spring>
            
        }
        else{
            addNewWeightDiv = <div></div>
        }

        if (this.state.showDeleteWindow){
            deleteWindow = <Spring from={{opacity: 0, zIndex: -1}} to={{opacity: 1, zIndex: 1}}>
                        {
                            props=>(
                            <div style={props} className="delete-window-div">
                                <div className="addNewDiv_title">
                                    <h4>delete weight price</h4>
                                    <button onClick={() => this.handleSetDeleteWindow(false)}>x</button>
                                </div>
                                <div className="delete-window-div_body">
                                    <p>Do you want to this weight price ?</p>
                                    <button>Delete</button>
                                    <button onClick={this.setDeleteWindow}>Cancel</button>
                                </div>
                            </div>
                            )
                        }
            </Spring>
            
        }
        else{
            deleteWindow = <div></div>
        }

        return ( 
            <React.Fragment>
                {weightDiv}
            </React.Fragment>
         );
    }
}
 
export default CoffeeWeight;




























// const CoffeeWeight = (props) => {
    
//     console.log("props.onShowWeight: ", props.onShowWeight)

//     const [showWeight, setShowWeightDiv] = useState(props.onShowWeight)
//     const [showNewWeight, setShowNewWeight] = useState(false)
//     const [showDeleteWindow, setDeleteWindow] = useState(false)

    
//     const animateWeightDiv =useSpring({
//         from: {opacity: 0, zIndex:-1},
//         to: {opacity: 1, zIndex:1}
//     })
//     const animateNewWeight = useSpring({
//         from : {opacity: 0},
//         to : {opacity: 1}
//     })
//     const animateDeleteWindow = useSpring({
//         from : {opacity: 0, zIndex: -1},
//         to: {opacity: 1, zIndex: 1}
//     })

    

//     if(showWeight){
//         weightDiv = <animated.div className="weight-div" style={animateWeightDiv}>
//                         <div className="addNewDiv_title">
//                             <h4>coffee weights and prices</h4>
//                             <button onClick={() => (setShowWeightDiv(!showWeight), setShowNewWeight(false))}>x</button>
//                         </div>
//                         <div className="weight-div-body">
//                             <p>Name of the coffee</p>
//                             <div className="bind-weight-table">
//                                 <table className="weight-div-table">
//                                     <thead>
//                                         <tr>
//                                             <th>quantity</th>
//                                             <th>Unit</th>
//                                             <th>price</th>
//                                             <th>action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>quantity</td>
//                                             <td>unit</td>
//                                             <td>price</td>
//                                             <td><button className="secondButton table-content-button" onClick={() => setShowNewWeight(true)}><FontAwesomeIcon icon={faEdit}/></button>
//                                                 <button className="thirdButton  table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>quantity</td>
//                                             <td>unit</td>
//                                             <td>price</td>
//                                             <td>
//                                                 <button className="secondButton table-content-button" onClick={() => setShowNewWeight(true)}><FontAwesomeIcon icon={faEdit}/></button>
//                                                 <button className="thirdButton  table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>quantity</td>
//                                             <td>unit</td>
//                                             <td>price</td>
//                                             <td>
//                                                 <button className="secondButton table-content-button" onClick={() => setShowNewWeight(true)}><FontAwesomeIcon icon={faEdit}/></button>
//                                                 <button className="thirdButton  table-content-button" onClick={() => setDeleteWindow(true)}><FontAwesomeIcon icon={faTrash}/></button>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <button className="new-price-weight" onClick={() => setShowNewWeight(true)}>New price weight</button>
//                         </div>
//                         <div>{addNewWeightDiv}</div>
//                         <div>{deleteWindow}</div>
//                     </animated.div>
//     }
//     else{
//         console.log("IN If False")
//         weightDiv = <div className="weight-div">
                        
//                     </div>
//     }


//     // showing new division
//     if(showNewWeight){
//         addNewWeightDiv = <animated.div style={animateNewWeight} className="new-weight-div">
//                             <div className="addNewDiv_title">
//                                 <h4>New weight price</h4>
//                                 <button onClick={() => setShowNewWeight(false)}>x</button>
//                             </div>
//                             <div className="new-weight-form">
//                                 <form onSubmit={handleSubmitNewWeight}>
//                                     <input type="text"  required name="quantiy_weight" placeholder="package quantity(ex: 250)" autoComplete="off"/>
//                                     <input type="text" placeholder="unit package(ex:g)" name="unit_weight" required autoComplete="off"/>
//                                     <input type="text"  required name="price_weight" placeholder="package price" autoComplete="off"/>
//                                     <input type="text" placeholder="currency ex: $ or Rwf" name="weight_currency" required autoComplete="off"/>
//                                     <button>Save</button>
//                                 </form>
//                             </div>
//                           </animated.div>
//     }
//     else{
//         addNewWeightDiv = <div></div>
//     }

//     if (showDeleteWindow){
//         deleteWindow = <animated.div style={animateDeleteWindow} className="delete-window-div">
//                             <div className="addNewDiv_title">
//                                 <h4>delete weight price</h4>
//                                 <button onClick={() => setDeleteWindow(false)}>x</button>
//                             </div>
//                             <div className="delete-window-div_body">
//                                 <p>Do you want to this weight price ?</p>
//                                 <button>Delete</button>
//                                 <button onClick={() => setDeleteWindow(false)}>Cancel</button>
//                             </div>
//                         </animated.div>
//     }
//     else{
//         deleteWindow = <div></div>
//     }
//     return (
//     <React.Fragment>
//         {weightDiv}
//     </React.Fragment> );
// }
 
// export default CoffeeWeight;