import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import ShowingEntrySortSelect from './ShowingEntrySortSelect';


class MainProductsPage extends Component {
    state = { 
        includeCoffee: "checked",
        includeMaterial: "checked",
        includeAnimal: "checked",
        isLoading: false,
        inShopEntries: 0,
        totalEntries: 0,
        currentPage: 1,
        postsPerPage: 25,
        includePriceUnder25: false,
        includepriceFrom25To100: false,
        includePriceFrom100To200: false,
        includePrice200AndAbove: false,

        cartItem: {
            itemId: 0,
            itemName: "",
            image: null,
            quantity: 1,
            price: 0,
            classification: "",
            description: "",
            productId: 0,
            weight: 0
        }



    }
    componentDidMount(){
        this.setState({isLoading: true})

    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.cartItem !== this.state.cartItem){
            this.props.addingShoppingCartItem(this.state.cartItem)
        }
    }

    /* updating the state before adding item to the shopping cart */
    updateStateForAddingItemToTheCart = (item) =>{
        if(item.classification === "animal"){
            this.setState({
                ...this.state, cartItem: {...this.state.cartItem,
                itemId: 1,
                itemName: item.name,
                image: item.image,
                price: item.price,
                classification: item.classification,
                description: item.description,
                productId: item.animal_ID,
                weight: item.weight}
            })
        }
        else{
            this.setState({
                ...this.state, cartItem: {...this.state.cartItem,
                itemId: 1,
                itemName: item.name,
                image: item.image,
                price: item.price,
                classification: item.classification,
                description: item.description,
                productId: item.material_ID,
                weight: item.weight}
            })
        }
    }
    
    handleCoffeeCheck = () =>{
        if(this.state.includeCoffee ==="checked"){
            this.setState({includeCoffee: "unchecked"})
        }
        else{
            this.setState({includeCoffee: "checked"}) 
        }
        
    }
    handleMaterialCheck = () =>{
        if(this.state.includeMaterial ==="checked"){
            this.setState({includeMaterial: "unchecked"})
        }
        else{
            this.setState({includeMaterial: "checked"}) 
        }
    }
    handleAnimalCheck = () =>{
        if(this.state.includeAnimal ==="checked"){
            this.setState({includeAnimal: "unchecked"})
        }
        else{
            this.setState({includeAnimal: "checked"}) 
        }
    }

    /* pagination */
    paginate = (pageNumber) =>{
        this.setState({currentPage: pageNumber})
    }

    render() {
        var verifiedCoffeeList, verifiedMaterialList, verifiedAnimalList
        var inSearchMode = false

        if(this.props.state.coffeeList !== null || this.props.state.materialsList !== null || this.props.state.animalsList !==null){
            inSearchMode = true
            if(this.props.state.coffeeList !== null){
                verifiedCoffeeList = this.props.state.coffeeList
            }
            else{
                verifiedCoffeeList = []
            }
            if(this.props.state.materialsList !== null){
                verifiedMaterialList = this.props.state.materialsList
            }
            else{
                verifiedMaterialList = []
            }
            if(this.props.state.animalsList !== null){
                verifiedAnimalList = this.props.state.animalsList
            }
            else{
                verifiedAnimalList = []
            }
        }
        else{
            verifiedCoffeeList = this.props.verifiedCoffeeList
            verifiedMaterialList = this.props.verifiedMaterialList
            verifiedAnimalList = this.props.verifiedAnimalList
        }
        const {includeAnimal, includeCoffee, includeMaterial} = this.state
        var allProductsToDisplay = [] 
        if(includeCoffee === "checked"){
            allProductsToDisplay = allProductsToDisplay.concat(verifiedCoffeeList)  
        }
        if(includeMaterial === "checked"){
            allProductsToDisplay = allProductsToDisplay.concat(verifiedMaterialList) 
        }
        if(includeAnimal === "checked"){
            allProductsToDisplay = allProductsToDisplay.concat(verifiedAnimalList)
        }
        
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
        const currentPosts = allProductsToDisplay.slice(indexOfFirstPost, indexOfLastPost)


        return (
        <div>
            <ShowingEntrySortSelect currentPosts={currentPosts} allPosts={allProductsToDisplay}/>
            <div className="main-products-page">
                <div className="main-products-page-side-bar">
                    <h5>View products by</h5>
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox"  name="category_coffee_checkbox"  defaultChecked={includeCoffee} onChange={this.handleCoffeeCheck}/>
                                Coffee
                            </label>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox"  name="category_materials_checkbox"  defaultChecked={includeMaterial} onChange={this.handleMaterialCheck}/>
                                Electronics and house materials & clothing 
                            </label>
                        </li>
                        <li>
                        <label>
                            <input type="checkbox"  name="category_animals_checkbox"  defaultChecked={includeAnimal} onChange={this.handleAnimalCheck}/>
                            Live animals
                        </label>
                        </li>
                    </ul>
                </div>
                <div className="main-products-page-load-products">
                    {inSearchMode === false?
                        <React.Fragment>
                            {includeAnimal !=="checked" && includeCoffee !== "checked"  && includeMaterial !== "checked" && 
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                                <br/><br/><br/>
                                No products category you have choosen to be displayed! Select category to continue ordering products of your desire.
                                <br/><br/>
                            </p>
                            }
                            {currentPosts.map((product, index) => (
                            <React.Fragment key={index}>
                                {product.classification === "coffee" && 
                                    <React.Fragment>
                                        <div className="main-products-page-products-list">
                                            <div className="main-products-page-image-in-div">
                                                <img src={"http://50.116.29.247" + product.image} alt="product"/>
                                            </div>
                                            <div className="main-products-page-description">
                                                <p className="product-price-in-div">{`${product.currency}${product.coffeeweights[0].price} - ${product.currency}${product.coffeeweights.slice(-1)[0].price}`}<br/><br/>
                                                <Link to={`/coffee/product/detail/${product.coffee_ID}/`}><span style={{color: "black", marginBottom: "5px"}}>{product.name}</span><br></br>
                                                {`${product.description.slice(0,70)}...`}</Link></p>
                                                <Link to={`/coffee/product/detail/${product.coffee_ID}/`} className="button">Choose option</Link>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                                {product.classification === "material" && 
                                <React.Fragment>
                                    <div className="main-products-page-products-list">
                                        <div className="main-products-page-image-in-div">
                                            <img src={"http://50.116.29.247" + product.image} alt="product"/>
                                        </div>
                                        <div className="main-products-page-description">
                                        <p className="product-price-in-div">{`${product.currency}${product.price}`}<br/><br/>
                                            <Link to={`/material/product/detail/${product.material_ID}/`}>
                                            <span style={{color: "black", marginBottom: "5px"}}>{product.name}</span><br></br>
                                            {`${product.description.slice(0,70)}...`}</Link></p>
                                            <button className="button" style={{outline: "none"}} onClick={() => this.updateStateForAddingItemToTheCart(product)}>Add To Cart</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                                }
                                {product.classification === "animal" &&
                                    <React.Fragment>
                                        <div className="main-products-page-products-list">
                                            <div className="main-products-page-image-in-div">
                                                <img src={"http://50.116.29.247" + product.image} alt="product"/>
                                            </div>
                                            <div className="main-products-page-description">
                                                <p className="product-price-in-div">{`${product.currency}${product.price}`}<br/><br/>
                                                <Link to={`/animal/product/detail/${product.animal_ID}/`}>
                                                <span style={{color: "black", marginBottom: "5px"}}>{product.name}</span><br></br>
                                                {`${product.description.slice(0,70)}...`}</Link></p>
                                                <button className="button" onClick={() => this.updateStateForAddingItemToTheCart(product)}>Add To Cart</button>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                            )
                            )
                            }
                            {includeAnimal === "checked" && includeCoffee !== "checked" && includeMaterial !== "checked" && verifiedAnimalList.length === 0 &&
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                            <br/><br/><br/>
                            We are really sorry for letting you know that no products available <span style={{backgroundColor: "orange", padding: "10px"}}>for Live Animals category </span>, but they are coming soon!
                            <br/><br/>
                            </p>
                            }
                            {includeAnimal !== "checked" && includeCoffee !== "checked" && includeMaterial === "checked" && verifiedMaterialList.length === 0 &&
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                            <br/><br/><br/>
                            We are really sorry for letting you know that no products availble <span style={{backgroundColor: "orange", padding: "10px"}}>for Electronics & Furniture category</span>, but they are coming soon!
                            <br/><br/>
                            </p>
                            }
                            {includeAnimal !== "checked" && includeCoffee === "checked" && includeMaterial !== "checked" && verifiedCoffeeList.length === 0 &&
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                            <br/><br/><br/>
                            We are really sorry for letting you know that no products available <span style={{backgroundColor: "orange", padding: "10px"}}>for Coffee category</span>, but they are coming soon!
                            <br/><br/>
                            </p>
                            }
                            {includeAnimal === "checked" && includeCoffee === "checked" && includeMaterial !== "checked" && verifiedAnimalList.length === 0 
                            && verifiedCoffeeList.length === 0 &&
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                            <br/><br/><br/>
                            We are really sorry for letting you know that no products available <span style={{backgroundColor: "orange", padding: "10px"}}> for Coffee and Live Animals categories </span>, but they are coming soon!
                            <br/><br/>
                            </p>
                            }
                            {includeAnimal === "checked" && includeCoffee !== "checked" && includeMaterial === "checked" && verifiedAnimalList.length === 0 
                            && verifiedMaterialList.length === 0 &&
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                            <br/><br/><br/>
                            We are really sorry for letting you know that no products available <span style={{backgroundColor: "orange", padding: "10px"}}>for Electronics & Furniture and Live Animals categories</span>, but they are coming soon!
                            <br/><br/>
                            </p>
                            }
                            {includeAnimal !== "checked" && includeCoffee === "checked" && includeMaterial === "checked" && verifiedMaterialList.length === 0 
                            && verifiedCoffeeList.length === 0 &&
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                            <br/><br/><br/>
                            We are really sorry for letting you know that no products available <span style={{backgroundColor: "orange", padding: "10px"}}>for Coffee and Electronics & Furniture categories</span>, but they are coming soon!
                            <br/><br/>
                            </p>
                            }
                            {includeAnimal === "checked" && includeCoffee === "checked" && includeMaterial === "checked" && verifiedAnimalList.length === 0 
                            && verifiedCoffeeList.length === 0 && verifiedMaterialList.length === 0 &&
                            <React.Fragment>
                                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                                <br/><br/><br/>
                                <span style={{backgroundColor: "orange", padding: "10px"}}>Loading...</span><br/><br/>
                                </p>
                            </React.Fragment>
                            }
                        </React.Fragment>
                        :
                        <React.Fragment>
                        {allProductsToDisplay.length === 0 ?
                            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "14px", margin: "20px 0px"}} className="no-products-category">
                                <br/><br/><br/>
                                We are really sorry for letting you know that no products available for your search
                                <br/><br/>
                                </p>
                        :
                            <React.Fragment>
                                {currentPosts.map((product, index) => (
                                    <React.Fragment key={index}>
                                        {product.classification === "coffee" && 
                                            <React.Fragment>
                                                <div className="main-products-page-products-list">
                                                    <div className="main-products-page-image-in-div">
                                                        <img src={"http://50.116.29.247" + product.image} alt="product"/>
                                                    </div>
                                                    <div className="main-products-page-description">
                                                        <p className="product-price-in-div">{`${product.currency}${product.coffeeweights[0].price} - ${product.currency}${product.coffeeweights.slice(-1)[0].price}`}<br/><br/>
                                                        <Link to={`/coffee/product/detail/${product.coffee_ID}/`}><span style={{color: "black", marginBottom: "5px"}}>{product.name}</span><br></br>
                                                        {`${product.description.slice(0,70)}...`}</Link></p>
                                                        <Link to={`/coffee/product/detail/${product.coffee_ID}/`} className="button">Choose option</Link>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }
                                        {product.classification === "material" && 
                                        <React.Fragment>
                                            <div className="main-products-page-products-list">
                                                <div className="main-products-page-image-in-div">
                                                    <img src={"http://50.116.29.247" + product.image} alt="product"/>
                                                </div>
                                                <div className="main-products-page-description">
                                                <p className="product-price-in-div">{`${product.currency}${product.price}`}<br/><br/>
                                                    <Link to={`/material/product/detail/${product.material_ID}/`}>
                                                    <span style={{color: "black", marginBottom: "5px"}}>{product.name}</span><br></br>
                                                    {`${product.description.slice(0,70)}...`}</Link></p>
                                                    <button className="button" style={{outline: "none"}} onClick={() => this.updateStateForAddingItemToTheCart(product)}>Add To Cart</button>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        }
                                        {product.classification === "animal" &&
                                            <React.Fragment>
                                                <div className="main-products-page-products-list">
                                                    <div className="main-products-page-image-in-div">
                                                        <img src={"http://50.116.29.247" + product.image} alt="product"/>
                                                    </div>
                                                    <div className="main-products-page-description">
                                                        <p className="product-price-in-div">{`${product.currency}${product.price}`}<br/><br/>
                                                        <Link to={`/animal/product/detail/${product.animal_ID}/`}>
                                                        <span style={{color: "black", marginBottom: "5px"}}>{product.name}</span><br></br>
                                                        {`${product.description.slice(0,70)}...`}</Link></p>
                                                        <button className="button" onClick={() => this.updateStateForAddingItemToTheCart(product)}>Add To Cart</button>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                    )
                                    )
                                    }
                            </React.Fragment>
                        }
                        </React.Fragment>
                        }
                </div>
            </div>
            <div className="clearboth"></div>
            <div className="paginating-products-page">
                <Pagination postsPerpage={this.state.postsPerPage} totalPosts={allProductsToDisplay.length} paginate={this.paginate}/>
            </div>
            <div className="clearboth"></div>
            <br/><br/>
            <div className="clearboth"></div>
        </div>
         );
    }
}
 
export default MainProductsPage;