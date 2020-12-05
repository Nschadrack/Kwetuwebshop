import React, { Component } from 'react';
import NavBar from './Navbar';
import {Route, Switch} from 'react-router-dom';
import SlidingDiv from './SlidingDiv';
import FirstFourProducts from './FirstFourProducts';
import DiscoverMoreProducts from './DiscoverMoreProducts';
import BackToTop from './BackToTop';
import MainFooter from './MainFooter';
import MainProductsPage from './MainProductsPage';
import SingleCoffeeDetail from './SingleCoffeeDetail';
import SingleProductDetail from './SingleProductDetail';
import SingleAnimalDetail from "./SingleAnimalDetail";
import RecommendSimilarProduct from './RecommendSimilarProduct';
import ViewShoppingCart from './ViewShoppingCart';
import CheckOutStepForm from './CheckOutStepForm';
import MainAll from '../Admin/MainAll';
import LoginAdminPanel from '../Admin/LoginAdminPanel';
import UserLoginRegisteration from "./UserLoginRegisteration";
import auth from "../../auth";
import NotFound from './NotFound';
import CustomerAccount from './CustomerAccount';
import RestPasswordForm from "./RestPasswordForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OrderNotOnSite from "./OrderNotOnSite";
import About from "./About";
import Contact from "./Contact";


// require('dotenv').config({debug: process.env.DEBUG})




class AllView extends Component {
    state = { 
        activeSingleCoffee_id: 0,
        activeSingleMaterial_id: 0,
        activeSingleAnimal_id: 0,
        materialsList: null,
        animalsList : null,
        coffeeList: null,
     }

    componentDidMount(){
        this.fetchCoffeeList()
        this.fetchMaterialList()
        this.fetchAnimalList()
        this.fetchVerifiedCoffeeList()
        this.fetchVerifiedMaterialList()
        this.fetchVerifiedAnimalList()
        this.fetchUsers()
        this.fetchCustomers()
        this.fetchOrders()
        this.fetchSpecialOrders()
        this.fetchAdverts()
        this.fetchInvoices()
    }

 

    handleSetActiveSingleCoffeeId = (value) =>{
        this.setState({activeSingleCoffee_id: value})
    }
    handleSetActiveSingleMaterialId = (value) =>{
        this.setState({activeSingleMaterial_id: value})
    }
    handleSetActiveSingleAnimalId = (value) =>{
        this.setState({activeSingleAnimal_id: value})
    }

    /* fetching products list for admin of the system */

    fetchCoffeeList = () =>{
        var url = "http://50.116.29.247/coffee/list/"

        fetch(url).then( response => response.json())
        .then(data => this.props.retrievingFromServerOnFirstLoad(data))
    }

    fetchMaterialList = () =>{
        var url = "http://50.116.29.247/material/list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.retrievingMaterialOnFirstLoad(data))
    }
    fetchAnimalList = () =>{
        var url = "http://50.116.29.247/animal/list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.retrievingAnimalOnFirstLoad(data))
    }

    /* FETCHING VERIFIED PRODUCTS LIST FOR DISPLAY TO THE USERS */
    fetchVerifiedCoffeeList = () =>{
        var url = "http://50.116.29.247/coffee/products/list/users/"

        fetch(url).then( response => response.json())
        .then(data => this.props.retrievingFromServerToDisplayToUsers(data))
    }

    fetchVerifiedMaterialList = () =>{
        var url = "http://50.116.29.247/material/products/list/users/"
        fetch(url).then(response => response.json())
        .then(data => this.props.retrievingMaterialToDisplayToUsers(data))
    }
    fetchVerifiedAnimalList = () =>{
        var url = "http://50.116.29.247/animal/products/list/users/"
        fetch(url).then(response => response.json())
        .then(data => this.props.retrievingAnimalToDisplayToUsers(data))
    }

    fetchUsers = () =>{
        var url ="http://50.116.29.247/users_list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.usersList(data))
    }

    fetchCustomers = () =>{
        var url ="http://50.116.29.247/customers/"
        fetch(url).then(response => response.json())
        .then(data => this.props.customerList(data))
    }

    fetchOrders = () =>{
        var url ="http://50.116.29.247/orders_list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.ordersList(data))
    }
    fetchSpecialOrders = () =>{
        var url ="http://50.116.29.247/special-orders_list/"
        fetch(url).then(response => response.json())
        .then(data => this.props.updateSpecialOrderList(data))
    }

    fetchAdverts = () =>{
        var url ="http://50.116.29.247/adverts-list/"
        fetch(url).then(response => response.json())
        .then(data => {
            this.props.updateAdvertList(data)
    })
    }
    fetchInvoices = () =>{
        var url ="http://50.116.29.247/invoices_list/"
        fetch(url).then(response => response.json())
        .then(data => {
            this.props.updateInvoicesList(data)
    })
    }

    handleSearchingInNavbar = (category, searchWord) =>{
        this.setState({materialsList: null, animalsList : null, coffeeList: null})
        var coffeeResults = []
        var materialResults = []
        var animalResults = []
        if(category === "coffee"){
                this.props.verifiedCoffeeList.map(coffee =>{
                    if (coffee.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || 
                    coffee.brand.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || 
                    coffee.coffee_type.toString().toLowerCase().includes(searchWord.toString().toLowerCase())){
                        coffeeResults.push(coffee) 
                    }
                    return 0
                })
            this.setState({coffeeList: coffeeResults})
        }
        else if (category === "animal"){
            this.props.verifiedAnimalList.map(animal =>{
                if (animal.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || animal.price.toString().includes(searchWord.toString())){
                    animalResults.push(animal) 
                }
                return 0
            })
            this.setState({animalsList: animalResults})
        }
        else if (category === "material"){
            this.props.verifiedMaterialList.map(material =>{
                if (material.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || material.price.toString().includes(searchWord.toString())){
                    materialResults.push(material) 
                }
                return 0
            })
            this.setState({materialsList: materialResults})
        }
        else{
            this.props.verifiedCoffeeList.map(coffee =>{
                if (coffee.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || 
                coffee.brand.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || 
                coffee.coffee_type.toString().toLowerCase().includes(searchWord.toString().toLowerCase())){
                    coffeeResults.push(coffee) 
                }
                return 0
            })
            this.setState({coffeeList: coffeeResults})

            this.props.verifiedAnimalList.map(animal =>{
                if (animal.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || animal.price.toString().includes(searchWord.toString())){
                    animalResults.push(animal) 
                }
                return 0
            })
            this.setState({animalsList: animalResults})

            this.props.verifiedMaterialList.map(material =>{
                if (material.name.toString().toLowerCase().includes(searchWord.toString().toLowerCase()) || material.price.toString().includes(searchWord.toString())){
                    materialResults.push(material) 
                }
                return 0
            })
            this.setState({materialsList: materialResults})

        }
    }
    render() {
    
        return ( 
            <React.Fragment>
                <Switch>
                    <Route exact path={['/', '/welcome']} render={() =>(
                        <div className="main">
                            <NavBar  {...this.props}   onActiveHome={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <SlidingDiv {...this.props}/>
                            <FirstFourProducts {...this.props}/>
                            <DiscoverMoreProducts {...this.props} onFecthMaterialList={this.fetchMaterialList}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div> 
                    )}
                    />
                    <Route path={'/in-the-shop'} render={() =>
                        <div className="main">
                            <NavBar {...this.props} onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <MainProductsPage {...this.props} state={this.state}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    }/>
                    <Route path={'/special-order/place'} render={(props) =>
                        auth.isAuthenticated(this.props.authenticated) === true ?
                            <div className="main">
                                <NavBar {...this.props} onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                                <OrderNotOnSite activeUser={this.props.activeUser} {...this.props}/>
                                <BackToTop />
                                <MainFooter {...this.props}/>
                            </div>
                            :
                            props.history.push({
                                pathname: "/login-register",
                                search: "?query=/special-order/place",
                                state: {detail: "/special-order/place"}
                         })
                    }/>
                    <Route path={'/coffee/product/detail/:id'} render={(params) =>(
                        <div className="main">
                            <NavBar  {...this.props} onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <SingleCoffeeDetail {...this.props}{...params} onHandleActiveCoffeId={this.handleSetActiveSingleCoffeeId}/>
                            <RecommendSimilarProduct {...this.props} activeCoffee={this.state.activeSingleCoffee_id}
                            onHandleActiveCoffeId={this.handleSetActiveSingleCoffeeId}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}
                    />
                    <Route path={'/material/product/detail/:id'} render={(params) =>(
                        <div className="main">
                            <NavBar onActiveShop={'active-navbar-link'} {...this.props} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <SingleProductDetail {...this.props} {...params} onHandleActiveMaterialId={this.handleSetActiveSingleMaterialId}/>
                            <RecommendSimilarProduct {...this.props} activeMaterial={this.state.activeSingleMaterial_id}
                            onHandleActiveMaterialId={this.handleSetActiveSingleMaterialId}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}
                    />
                    <Route path={'/animal/product/detail/:id'} render={(params) =>(
                        <div className="main">
                            <NavBar {...this.props}  onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <SingleAnimalDetail {...this.props} {...params} onHandleActiveAnimalId={this.handleSetActiveSingleAnimalId}/>
                            <RecommendSimilarProduct {...this.props} activeAnimal={this.state.activeSingleAnimal_id}
                            onHandleActiveAnimalId={this.handleSetActiveSingleAnimalId}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}
                    />
                    <Route path={'/cart'} render={() =>(
                        <div className="main">
                            <NavBar {...this.props}  onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <ViewShoppingCart {...this.props}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}
                    />
                    <Route path={'/checkout'} render={() =>(
                        <div className="main">
                            <NavBar {...this.props}  onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <CheckOutStepForm {...this.props} onFectUsersList={this.fetchUsers}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}
                    />
                    <Route path={'/login-register'} render={() =>(
                        <React.Fragment>
                            <NavBar {...this.props}  onActiveShop={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <UserLoginRegisteration {...this.props} onFectUsersList={this.fetchUsers}/>
                        </React.Fragment>
                    )}
                    />
                    {/* my account routes */}
                        <Route path={"/:first_name-:last_name/account"} render={(props) =>(
                            auth.isAuthenticated(this.props.authenticated) === true ?
                                   <CustomerAccount activeUser={this.props.activeUser} {...this.props}/>
                            :
                                    props.history.push({
                                        pathname: "/login-register",
                                        search: "?query=/customer-name/account",
                                        state: {detail: "/customer-name/account"}
                                    })
                            
                        )} />

                    {/* ADMIN ROUTES */}
                    <Route path={"/admin/kwetu-trade/login"} render={()=>(
                        <LoginAdminPanel {...this.props}/>
                    )}/>
                    <Route path={'/admin/kwetu-trade/panel'} render={(props) =>(
                        auth.isAuthenticated(this.props.authenticatedSuperuser) === true ?
                            <React.Fragment>
                                <MainAll {...this.props} 
                                onFecthCoffeeList={this.fetchCoffeeList}
                                onFecthMaterialList={this.fetchMaterialList}
                                onFecthAnimalList={this.fetchAnimalList}/>
                            </React.Fragment>

                        :
                            props.history.push({
                                pathname: "/admin/kwetu-trade/login",
                                search: "?query=/admin/kwetu-trade/panel",
                                state: {detail: "/admin/kwetu-trade/panel"}
                            })
                    )}
                    />
                    {/* resetting password */}
                    <Route path={"/resetting-password/request"} render={(props)=>(
                        <ForgotPasswordForm  {...props}/>
                    )} />

                    <Route path={"/confirming-new/password"} render={(props) =>(
                        <RestPasswordForm {...props}/>
                    )}/>
                    <Route path={"/about/kwetu-trade"} render={(props) =>(
                        <div className="main">
                            <NavBar {...this.props}  onActiveAbout={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <About {...props}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}/>
                    <Route path={"/contact/kwetu-trade"} render={(props) =>(
                        <div className="main">
                            <NavBar {...this.props}  onActiveContact={'active-navbar-link'} handleSearchingInNavbar={this.handleSearchingInNavbar}/>
                            <Contact {...props}/>
                            <BackToTop />
                            <MainFooter {...this.props}/>
                        </div>
                    )}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default AllView;