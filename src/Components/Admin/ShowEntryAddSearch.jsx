import React, {Component} from "react"


class ShowEntryAddSearch extends Component{

    handleOnSetShowAddProductAndProducUdate = (value1, value2, value3, value4) =>{
        this.props.onSetShowAddProduct(value1)
        this.props.onHandleSetShowAddProductSetDeleteCoffeeWindow(value2, value3, value4)
    }

    handleEntryChange = (e) =>{
        this.props.setPostsPerPage(Number(e.target.value))
    }
    handleSearchingPattern = (e) =>{
        if(this.props.category === "coffee"){
            this.props.searchingCoffee(e.target.value)
        }
        if(this.props.category === "material"){
            this.props.searchingMaterial(e.target.value)
        }
        if(this.props.category === "animal"){
            this.props.searchingAnimal(e.target.value)
        }
        if(this.props.category === "customerMember"){
            this.props.searchingCustomer(e.target.value)
        }
        if(this.props.category === "order"){
            this.props.searchingOrder(e.target.value)
        }
        if(this.props.category === "specialOrder"){
            this.props.searchingSpecialOrder(e.target.value)
        }
        if(this.props.category === "advert"){
            this.props.searchingAdvert(e.target.value)
        }
        if(this.props.category === "invoice"){
            this.props.searchingInvoice(e.target.value)
        }
    }

    render(){
        if(this.props.onSale){

        }
        else{
            this.addButton = <button className="addButtonMain_button" onClick={() => this.handleOnSetShowAddProductAndProducUdate(true, true, false, null)}>
                <span className="plus-sign">+</span>{this.props.btnTitle}</button>
        }
        return(<div>
            <div className="addButtonMain">
              { this.addButton }  
            </div>
            <div className="clearboth"></div>
            <div className="entries_to_display_div">
                Show 
                <select className="entries_selector" name="entries_to_display" defaultValue={this.props.currentPosts.length} onChange={this.handleEntryChange}>
                    {this.props.currentPosts.length > Number(5) &&
                    <option className="entries_selector_option">5</option>   
                    }
                    <option className="entries_selector_option">{this.props.currentPosts.length}</option>
                    <option className="entries_selector_option">10</option>
                    <option className="entries_selector_option">20</option>
                    <option className="entries_selector_option">25</option>
                </select>
                records
            </div>
            <div className="searching_div">
                Search:
                <input type="text" name="searching" className="searching_input" onChange={this.handleSearchingPattern}/>
            </div>
        </div>)
    }
}



export default ShowEntryAddSearch