import React, {useState} from "react";
import SearchNotification from "./SearchNotification";
import BrandNameMenuIcon from "./BrandNameMenuIcon";
import AsideNavigation from "./AsideNavigation";
import Coffee from "./Coffee";
import CoffeeDetail from "./CoffeeDetail";
import Material from "./Material";
import MaterialDetail from "./MaterialDetail";
import Animal from "./Animal";
import AnimalDetail from "./AnimalDetail";
import DashBoard from "./DashBoard";
// import Sale from "./Sale";
import CustomerMember from "./CustomerMember";
import Order from "./Order";
import OrderDetail from "./OrderDetail";
import SpecialOrder from "./SpecialOrder";
import SpecialOrderDetail from "./SpecialOrderDetail";
import SpecialOrderItemDetail from "./SpecialOrderItemDetail";
// import Setting from "./Setting";
// import UserProfile from "./UserProfile";
import {useSpring, animated} from "react-spring";
import {Route, Link} from "react-router-dom";
import CustomerMemberDetail from "./CustomerMemberDetail";
// import CustomerGuest from "./CustomerGuest";
// import CustomerGuestDetail from "./CustomerGuestDetail";
import Notification from "./Notification";
import Advert from "./Advert";
import AdvertDetail from "./AdvertDetail";
import Invoices from "./Invoices"




const image = require("../../images/admin_profile.jpg")

function FirstComponent(props){
    /* for pagination */
        const [currentPage, setCurrentPage] = useState(1)
        const [postsPerPage, setPostsPerPage] = useState(5)

        const [startSearchingCoffee, setStartSearchingCoffee] = useState(false)
        const [startSearchingMaterial, setStartSearchingMaterial] = useState(false)
        const [startSearchingAnimal, setStartSearchingAnimal] = useState(false)
        const [startSearchingCustomer, setStartSearchingCustomer] = useState(false)
        const [startSearchingOrder, setStartSearchingOrder] = useState(false)
        const [startSearchingAdvert, setStartSearchingAdvert] = useState(false)
        const [startSearchingSpecialOrder, setStartSearchingSpecialOrder] = useState(false)
        const [startSearchingInvoices, setStartSearchingInvoices] = useState(false)

        const [coffeesList, setCoffeesList] = useState([])
        const [materialsList, setMaterialsList] = useState([])
        const [animalsList, setAnimalsList] = useState([])
        const [ordersList, setOrdersList] = useState([])
        const [advertsList, setAdvertsList] = useState([])
        const [specialOrdersList, setSpecialOrdersList] = useState([])
        const [customersList, setCustomersList] = useState([])
        const [invoicesList, setInvoicesList] = useState([])


        const newOrders = props.orders.filter(order => order.newness_order_status === "new")
        const newSpecialOrders = props.specialOrdersList.filter(order => order.newness_order_status === "new")

        var coffees = []
        var materials = []
        var animals = []
        var customers = []
        var orders = []
        var adverts = []
        var specialOrders = []
        var invoices = []


        /* search invoice admin */
        const searchingInvoice = (value) =>{
            setStartSearchingInvoices(true)
            invoices=[]
            props.invoices.map(invoice =>{
                if(Number(invoice.invoice_number) === Number(value)){
                    invoices.push(invoice)
                    setInvoicesList(invoices)
                }
                return 0
            })

            if(invoices.length === 0){
                props.invoices.map(invoice =>{
                    if(invoice.invoice_date.includes(value)){
                        invoices.push(invoice)
                        setInvoicesList(invoices)
                    }
                    return 0
                }) 
            }
        }
        /* search coffee products admin */
        const searchingCoffee = (value) =>{
            var foundInType = 0
            setStartSearchingCoffee(true)
            coffees=[]
            props.coffeeList.map(coffee =>{
                if(coffee.name.toLowerCase().includes(value.toLowerCase())){
                    coffees.push(coffee)
                    setCoffeesList(coffees)
                    foundInType +=1
                }
                return 0
            })

            if(coffees.length === 0){
                props.coffeeList.map(coffee =>{
                    if(coffee.coffee_type.toLowerCase().includes(value.toLowerCase())){
                        coffees.push(coffee)
                        setCoffeesList(coffees)
                        foundInType +=1
                    }
                    return 0
                }) 
            }
            if(foundInType === 0){
                props.coffeeList.map(coffee =>{
                    if(coffee.added_date.includes(value)){
                        coffees.push(coffee)
                        setCoffeesList(coffees)
                    }
                    return 0
                }) 
            }

        }

        /* search material products admin */
        const searchingMaterial = (value) =>{
            var foundInWeight = 0
            var foundPrice = 0
    
            setStartSearchingMaterial(true)
            materials = []
            props.materialList.map(material =>{
                if(material.name.toLowerCase().includes(value.toLowerCase())){
                    materials.push(material)
                    setMaterialsList(materials)
                    foundPrice +=1
                    foundInWeight +=1
                }
                return 0
            })

            if(materials.length === 0){
                props.materialList.map(material =>{
                    if(material.added_date.includes(value)){
                        materials.push(material)
                        setMaterialsList(materials)
                        foundPrice +=1
                        foundInWeight +=1
                    }
                    return 0
                }) 
            }
            if(foundPrice === 0){
                props.materialList.map(material =>{
                    if(material.price.toString().includes(value)){
                        materials.push(material)
                        setMaterialsList(materials)
                        foundInWeight +=1
                    }
                    return 0
                }) 
            }
            if(foundInWeight === 0){
                props.materialList.map(material =>{
                    if(material.weight.toString().includes(value)){
                        materials.push(material)
                        setMaterialsList(materials)
                    }
                    return 0
                }) 
            }
        }

        /* search animal products admin */
        const searchingAnimal = (value) =>{
            var foundInWeight = 0
            var foundPrice = 0
    
            setStartSearchingAnimal(true)
            animals = []
            props.animalList.map(animal =>{
                if(animal.name.toLowerCase().includes(value.toLowerCase())){
                    animals.push(animal)
                    setAnimalsList(animals)
                    foundPrice +=1
                    foundInWeight +=1
                }
                return 0
            })

            if(animals.length === 0){
                props.animalList.map(animal =>{
                    if(animal.added_date.includes(value)){
                        animals.push(animal)
                        setAnimalsList(animals)
                        foundPrice +=1
                        foundInWeight +=1
                    }
                    return 0
                }) 
            }
            if(foundPrice === 0){
                props.animalList.map(animal =>{
                    if(animal.price.toString().includes(value)){
                        animals.push(animal)
                        setAnimalsList(animals)
                        foundInWeight +=1
                    }
                    return 0
                }) 
            }
            if(foundInWeight === 0){
                props.animalList.map(animal =>{
                    if(animal.weight.toString().includes(value)){
                        animals.push(animal)
                        setAnimalsList(animals)
                    }
                    return 0
                }) 
            }
        }


        /* search order admin */
        const searchingOrder = (value) =>{
            var foundAmount = 0
            var foundQuantity = 0
            var foundShipping = 0
            var status = 0
    
            setStartSearchingOrder(true)
            orders = []
            props.orders.map(order =>{
                if(parseInt(order.order_number) === parseInt(value)){
                    orders.push(order)
                    setOrdersList(orders)
                    foundAmount +=1
                    foundQuantity +=1
                    foundShipping +=1
                    status += 1
                }
                return 0
            })

            if(orders.length === 0){
                props.orders.map(order =>{
                    if(order.ordered_date.toString().includes(value)){
                        orders.push(order)
                        setOrdersList(orders)
                        foundAmount +=1
                        foundQuantity +=1
                        foundShipping +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundAmount === 0){
                props.orders.map(order =>{
                    if(order.amount_ordered.toString().includes(value)){
                        orders.push(order)
                        setOrdersList(orders)
                        foundQuantity +=1
                        foundShipping +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundQuantity === 0){
                props.orders.map(order =>{
                    if(order.quantity_ordered.toString().includes(value)){
                        orders.push(order)
                        setOrdersList(orders)
                        foundShipping +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundShipping === 0){
                props.orders.map(order =>{
                    if(order.shipping_fee.toString().includes(value)){
                        orders.push(order)
                        setOrdersList(orders)
                        status += 1
                    }
                    return 0
                }) 
            }
            if(status === 0){
                props.orders.map(order =>{
                    if(order.order_status.toString().toLowerCase().includes(value)){
                        orders.push(order)
                        setOrdersList(orders)
                    }
                    return 0
                }) 
            }
        }

        /* search special order admin */
        const searchingSpecialOrder = (value) =>{
            var foundAmount = 0
            var foundQuantity = 0
            var status = 0
    
            setStartSearchingSpecialOrder(true)
            orders = []
            props.specialOrdersList.map(order =>{
                if(parseInt(order.order_number) === parseInt(value)){
                    specialOrders.push(order)
                    setSpecialOrdersList(specialOrders)
                    foundAmount +=1
                    foundQuantity +=1
                    status += 1
                }
                return 0
            })

            if(specialOrders.length === 0){
                props.specialOrdersList.map(order =>{
                    if(order.ordered_date.toString().includes(value)){
                        specialOrders.push(order)
                        setSpecialOrdersList(specialOrders)
                        foundAmount +=1
                        foundQuantity +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundAmount === 0){
                props.specialOrdersList.map(order =>{
                    if(order.amount_ordered.toString().includes(value)){
                        specialOrders.push(order)
                        setSpecialOrdersList(specialOrders)
                        foundQuantity +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundQuantity === 0){
                props.specialOrdersList.map(order =>{
                    if(order.quantity_ordered.toString().includes(value)){
                        specialOrders.push(order)
                        setSpecialOrdersList(specialOrders)
                        status += 1
                    }
                    return 0
                }) 
            }
            if(status === 0){
                props.specialOrdersList.map(order =>{
                    if(order.order_status.toString().toLowerCase().includes(value)){
                        specialOrders.push(order)
                        setOrdersList(specialOrders)
                    }
                    return 0
                }) 
            }
        }
        
        /* searching customer admin */
        const searchingCustomer = (value) =>{
            var foundEmail = 0
            var foundDateJoined = 0
            var foundOrders = 0
    
            setStartSearchingCustomer(true)
            customers = []
            props.customers.map(customer =>{
                if(customer.user.first_name.toLowerCase().includes(value.toLowerCase())){
                    customers.push(customer)
                    setCustomersList(customers)
                    foundEmail += 1
                    foundDateJoined += 1
                    foundOrders += 1
                }
                return 0
            })

            if(customers.length === 0){
                props.customers.map(customer =>{
                    if(customer.user.last_name.toLowerCase().includes(value.toLowerCase())){
                        customers.push(customer)
                        setCustomersList(customers)
                        foundEmail += 1
                        foundDateJoined += 1
                        foundOrders += 1
                    }
                    return 0
                }) 
            }
            if(foundEmail === 0){
                props.customers.map(customer =>{
                    if(customer.user.email.toLowerCase().includes(value.toLowerCase())){
                        customers.push(customer)
                        setCustomersList(customers)
                        foundDateJoined += 1
                        foundOrders += 1
                    }
                    return 0
                }) 
            }
            if(foundDateJoined === 0){
                props.customers.map(customer =>{
                    if(customer.user.date_joined.includes(value)){
                        customers.push(customer)
                        setCustomersList(customers)
                        foundOrders += 1
                    }
                    return 0
                }) 
            }
            if(foundOrders === 0){
                props.customers.map(customer =>{
                    if(customer.orders.length.toString().includes(value)){
                        customers.push(customer)
                        setCustomersList(customers)
                    }
                    return 0
                }) 
            }
        }

        /* searching adverts */

        const searchingAdvert = (value) =>{
            var foundUplaodedDate = 0
            var foundPublishedDate = 0
            var status = 0
    
            setStartSearchingAdvert(true)
            adverts = []
            props.adverts.map(advert =>{
                if(parseInt(advert.advert_number) === parseInt(value)){
                    adverts.push(advert)
                    setAdvertsList(adverts)
                    foundUplaodedDate +=1
                    foundPublishedDate +=1
                    status += 1
                }
                return 0
            })

            if(adverts.length === 0){
                props.adverts.map(advert =>{
                    if(advert.name.toString().toLowerCase().includes(value.toLowerCase())){
                        adverts.push(advert)
                        setAdvertsList(adverts)
                        foundUplaodedDate +=1
                        foundPublishedDate +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundUplaodedDate === 0){
                props.adverts.map(advert =>{
                    if(advert.uploaded_date.toString().toLowerCase().includes(value.toLowerCase())){
                        adverts.push(advert)
                        setAdvertsList(adverts)
                        foundPublishedDate +=1
                        status += 1
                    }
                    return 0
                }) 
            }
            if(foundPublishedDate === 0){
                props.adverts.map(advert =>{
                    if(advert.published_date !==null)
                        if(advert.published_date.toString().toLowerCase().includes(value.toLowerCase())){
                            adverts.push(advert)
                            setAdvertsList(adverts)
                            status += 1
                        }
                    return 0
                }) 
            }
            if(status === 0){
                props.adverts.map(advert =>{
                    if(advert.status.toString().toLowerCase().includes(value.toLowerCase())){
                        adverts.push(advert)
                        setAdvertsList(adverts)
                    }
                    return 0
                }) 
            }
        }




        const indexOfLastPost = currentPage * postsPerPage
        const indexOfFirstPost = indexOfLastPost - postsPerPage
        var currentCoffeePosts
        var currentMaterialPosts 
        var currentAnimalPosts
        var currentCustomersPosts
        var currentOrdersPosts
        var currentSpecialOrdersPosts
        var currentAdvertsPosts
        var currentInvoicesPosts

        // ******************************** coffee **********************
        if(startSearchingCoffee === true){
            currentCoffeePosts = coffeesList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentCoffeePosts = props.coffeeList.slice(indexOfFirstPost, indexOfLastPost)
        }

        // ***************************** materials ***************************
        if(startSearchingMaterial === true){
            currentMaterialPosts = materialsList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentMaterialPosts = props.materialList.slice(indexOfFirstPost, indexOfLastPost)
        }

        // **************************** animals *************************
        if(startSearchingAnimal === true){
            currentAnimalPosts = animalsList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentAnimalPosts = props.animalList.slice(indexOfFirstPost, indexOfLastPost)
        }

        // ************************ customers *************************
        if(startSearchingCustomer === true){
            currentCustomersPosts= customersList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentCustomersPosts = props.customers.slice(indexOfFirstPost, indexOfLastPost)
        }

        // *************************** orders **************************
        if(startSearchingOrder === true){
            currentOrdersPosts = ordersList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentOrdersPosts = props.orders.slice(indexOfFirstPost, indexOfLastPost)
        }
        // *************************** special orders **************************
        if(startSearchingSpecialOrder === true){
            currentSpecialOrdersPosts = specialOrdersList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentSpecialOrdersPosts = props.specialOrdersList.slice(indexOfFirstPost, indexOfLastPost)
        }

        //  ****************************** adverts ******************************
        if(startSearchingAdvert === true){
            currentAdvertsPosts = advertsList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentAdvertsPosts = props.adverts.slice(indexOfFirstPost, indexOfLastPost)
        }

        //  ****************************** adverts ******************************
        if(startSearchingInvoices === true){
            currentInvoicesPosts = invoicesList.slice(indexOfFirstPost, indexOfLastPost)
        }
        else{
            currentInvoicesPosts = props.invoices.slice(indexOfFirstPost, indexOfLastPost)
        }

        /************* Paginatio function ************************************** */        
        const paginate = (pageNumber) =>{
            setCurrentPage(pageNumber)
        }
    
    /*********** */
        const [showUserBell, setShowUserBell] = useState(false)
        const [showNotification, setShowNotification] = useState(false)
        const [showMenu, setShowMenu] = useState(true)
        var notification
        var userBell
        var menu
        var menuCoffee
        var menuMaterial
        var menuAnimal
        // var menuChemical
        var menuOrder
        var menuSpecialOrder
        // var menuSale
        var menuActiveCustomer
        // var menuGuestCustomer
        var menuNotification
        var menuAdvert
        var menuInvoices
        // var menuUserProfile
        // var menuSetting
        var animateMenu =false
       
        const notificationAnimation = useSpring({
            from: {opacity:0},
            to: {opacity: 1}
            
        })
        function checkParent(){
            if(showNotification){
                setShowNotification(false)
            }
            if(showUserBell){
                setShowUserBell(false)
            }
        }
        if(showNotification){
            notification = <animated.div className="notifications" style={notificationAnimation}>
                                    <div className="notification-title">
                                        <p>Kwetu Trade Notifications </p>
                                    </div>
                                    <div className="notification-body">
                                        {/* <p className="new-noti">New<span className="new-span">{newOrders.length + newSpecialOrders.length}</span></p> */}
                                        {(newOrders.length + newSpecialOrders.length) !==0 ?
                                            <React.Fragment>
                                                {newOrders !== undefined && newOrders.length !== 0 &&
                                                    newOrders.slice(0,5).map(order =>
                                                            <Link to="/admin/kwetu-trade/panel/orders" style={{padding: "10px 0px"}}>You have received new order and it is pending<br/></Link>)
                                                }
                                                {newSpecialOrders !== undefined && newSpecialOrders.length !== 0 &&
                                                    newSpecialOrders.slice(0,5).map(order =>
                                                            <Link to="/admin/kwetu-trade/panel/special-orders" style={{padding: "10px 0px", color: "black"}}>You have received new special order and it is pending<br/></Link>)
                                                }
                                            </React.Fragment>
                                            :
                                            <p>You don't have notifications at this time</p>
                                        }
                                    </div>
                                    <div className="notification-link">
                                        <Link to="/admin/kwetu-trade/panel/notifications">Show all</Link>
                                    </div>
                            </animated.div> 
        }
        if(showUserBell){
            userBell =  <animated.div className="user-div" style={notificationAnimation}>
                            <div className="notification-title">
                                <p>User Profile</p>
                            </div>
                            <div className="user-bell-body">
                                <img src={image} alt="user"/>
                                <p style={{textDecoration: "underline"}}>{`${props.activeSuperuser.first_name} ${props.activeSuperuser.last_name}`}</p>
                                <p>Kwetu Trade Administrator</p>
                                <button onClick={()=>{
                                    props.logoutSuperUser()
                                    props.updateActiveSuperuser({})
                                    props.history.push("/admin/kwetu-trade/login")                                  
                                }}>Logout</button>
                            </div>
                        </animated.div>
        }
        if(showMenu){
            menu=<AsideNavigation onDashboard={"dashboard"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            menuCoffee=<AsideNavigation onCoffee={"coffee"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            menuMaterial=<AsideNavigation onMaterial={"material"}newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            menuAnimal=<AsideNavigation onAnimal={"animal"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            // menuChemical=<AsideNavigation onChemical={"chemical"}/>
            menuOrder=<AsideNavigation onOrder={"order"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            menuSpecialOrder = <AsideNavigation onSpecialOrder={"special-order"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props} />
            // menuSale=<AsideNavigation onSale={"sale"}/>
            menuActiveCustomer=<AsideNavigation onActiveCustomer={"activecustomer"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            // menuGuestCustomer=<AsideNavigation onGuestCustomer={"guestcustomer"}/>
            menuNotification=<AsideNavigation onNotification={"notification"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            menuAdvert=<AsideNavigation onAdvert={"advert"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
            // menuUserProfile=<AsideNavigation onUserProfile={"userprofile"} {...props}/>
            // menuSetting=<AsideNavigation onSetting={"setting"}/>
            animateMenu= true
            menuInvoices=<AsideNavigation onInvoice={"adminInvoice"} newOrders={newOrders} newSpecialOrders={newSpecialOrders} {...props}/>
        }

        const firstComponentAndNavigation =<div>
                                    <div className="first-section">
                                        <BrandNameMenuIcon OnsetShowMenu={setShowMenu} menuValue={showMenu}/>
                                        <SearchNotification onSetShowNotification={setShowNotification} valueAddNoti={showNotification} onSetShowUserBell={setShowUserBell} valueAddUser={showUserBell}
                                        newOrders={newOrders} newSpecialOrders={newSpecialOrders}/>
                                        { notification }
                                        { userBell }
                                    </div>
                                    
                                </div>
        return(
            <div className="main-first-div" onClick={() => checkParent()}>
                <Route exact path={"/admin/kwetu-trade/panel"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menu}
                                </div>
                                <DashBoard OnAnimate={animateMenu}/>
                            </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/products-Coffee"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuCoffee}
                                </div>
                                <Coffee OnAnimate={animateMenu} {...props} currentCoffeePosts={currentCoffeePosts}
                                totalCoffeePost={props.coffeeList.length} coffeePostsPerPage={postsPerPage} 
                                paginate={paginate} setPostsPerPage={setPostsPerPage} searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert}
                                searchingInvoice={searchingInvoice}/>
                            </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/products-materials"} render={() =>(
                               <div>
                                   <div>
                                        {firstComponentAndNavigation}
                                        {menuMaterial}
                                    </div>
                                    <Material OnAnimate={animateMenu} {...props} currentMaterialPosts={currentMaterialPosts}
                                totalMaterialPost={props.materialList.length} materialPostsPerPage={postsPerPage} 
                                paginate={paginate} setPostsPerPage={setPostsPerPage}  searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert}
                                searchingInvoice={searchingInvoice}/>
                                </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/products-animals"} render={() =>(
                               <div>
                                   <div>
                                        {firstComponentAndNavigation}
                                        {menuAnimal}
                                    </div>
                                    <Animal OnAnimate={animateMenu} {...props} currentAnimalPosts={currentAnimalPosts}
                                totalAnimalPost={props.animalList.length} AnimalPostsPerPage={postsPerPage} 
                                paginate={paginate} setPostsPerPage={setPostsPerPage} searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert}
                                searchingInvoice={searchingInvoice}/>
                                </div>
                )}/>
                {/* <Route path={"/admin/kwetu-trade/panel/products-chemicals"} render={() =>(
                               <div>
                                   <div>
                                        {firstComponentAndNavigation}
                                        {menuChemical}
                                    </div>
                                    <Chemical OnAnimate={animateMenu}/> 
                                </div>
                )}/> */}
                <Route path={"/admin/kwetu-trade/panel/customers/members"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuActiveCustomer}
                                </div>
                                <CustomerMember OnAnimate={animateMenu} currentCustomersPosts={currentCustomersPosts}
                                totalCustomers={props.customers.length} customerPostsPerPage={postsPerPage}
                                paginate={paginate} setPostsPerPage={setPostsPerPage} users={props.users} {...props}
                                searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert}
                                searchingInvoice={searchingInvoice}/>
                            </div>
                )}/>
                {/* <Route path={"/admin/kwetu-trade/panel/customers/guests"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuGuestCustomer}
                                </div>
                                <CustomerGuest OnAnimate={animateMenu}/>
                            </div>
                )}/> */}
                <Route path={"/admin/kwetu-trade/panel/orders"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuOrder}
                                </div>
                                <Order OnAnimate={animateMenu} currentOrdersPosts={currentOrdersPosts}
                                totalOrders={props.orders.length} OrdersPostsPerPage={postsPerPage}
                                paginate={paginate} setPostsPerPage={setPostsPerPage} users={props.users} {...props}
                                searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert}
                                searchingInvoice={searchingInvoice}/>
                            </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/special-orders"} render={() =>(
                            <div>
                            <div>
                                {firstComponentAndNavigation}
                                {menuSpecialOrder}
                            </div>
                            <SpecialOrder OnAnimate={animateMenu} currentSpecialOrdersPosts={currentSpecialOrdersPosts}
                            totalSpecialOrders={props.specialOrdersList.length} specialOrdersPostsPerPage={postsPerPage}
                            paginate={paginate} setPostsPerPage={setPostsPerPage} users={props.users} {...props}
                            searchingCoffee={searchingCoffee}
                            searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                            searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                            searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert}
                            searchingInvoice={searchingInvoice}/>
                        </div>
                )}/>
                {/* <Route path={"/admin/kwetu-trade/panel/sales"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuSale}
                                </div>
                                <Sale OnAnimate={animateMenu}/> 
                            </div> 
                )}/> */}
                {/* <Route path={"/admin/kwetu-trade/panel/settings"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuSetting}
                                </div>
                                <Setting OnAnimate={animateMenu}/>
                            </div>
                )}/> */}
                {/* <Route path={"/admin/kwetu-trade/panel/user-profile"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuUserProfile}
                                </div>
                                <UserProfile OnAnimate={animateMenu}/>
                            </div>
                )}/> */}
                <Route path={"/admin/kwetu-trade/panel/adverts"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuAdvert}
                                </div>
                                <Advert OnAnimate={animateMenu} currentAdvertsPosts={currentAdvertsPosts}
                                totalAdvertsPost={props.adverts.length} advertsPostsPerPage={postsPerPage} 
                                paginate={paginate} setPostsPerPage={setPostsPerPage} searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert} {...props}
                                searchingInvoice={searchingInvoice}/>
                            </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/invoices"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuInvoices}
                                </div>
                                <Invoices OnAnimate={animateMenu} {...props} currentInvoicesPosts={currentInvoicesPosts}
                                totalInvoicesPost={props.invoices.length} invoicesPostsPerPage={postsPerPage} 
                                paginate={paginate} setPostsPerPage={setPostsPerPage} searchingCoffee={searchingCoffee}
                                searchingMaterial={searchingMaterial} searchingAnimal={searchingAnimal} 
                                searchingOrder={searchingOrder} searchingCustomer={searchingCustomer}
                                searchingSpecialOrder={searchingSpecialOrder} searchingAdvert={searchingAdvert} {...props}
                                searchingInvoice={searchingInvoice}/>
                            </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/notifications"} render={() =>(
                            <div>
                                <div>
                                    {firstComponentAndNavigation}
                                    {menuNotification}
                                </div>
                                <Notification OnAnimate={animateMenu} newOrders={newOrders} newSpecialOrders={newSpecialOrders}/>
                            </div>
                )}/>

                <Route path={"/admin/kwetu-trade/panel/coffee/detail/:id"} render={(params) => (
                        <div>
                                {firstComponentAndNavigation}
                                <CoffeeDetail OnAnimate={animateMenu} {...params}/> 
                                {menuCoffee}                         
                        </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/material/detail/:id"} render={(params) => (
                        <div>
                                {firstComponentAndNavigation}
                                <MaterialDetail OnAnimate={animateMenu} {...params}/> 
                                {menuMaterial}                         
                        </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/animal/detail/:id"} render={(params) => (
                        <div>
                                {firstComponentAndNavigation}
                                <AnimalDetail OnAnimate={animateMenu} {...params}/> 
                                {menuAnimal}                         
                        </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/order/:id/detail"} render={(params) =>(
                    <div>
                        {firstComponentAndNavigation}
                        <OrderDetail OnAnimate={animateMenu} {...params}/>
                        {menuOrder}   
                    </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/special-orders/:id/detail"} render={(params) =>(
                    <div>
                        {firstComponentAndNavigation}
                        <SpecialOrderDetail OnAnimate={animateMenu} {...params}/>
                        {menuSpecialOrder}   
                    </div>
                )}/>
                <Route path={"/admin/kwetu-trade/panel/special-orders/product/:id/detail"} render={(params) =>(
                    <div>
                        {firstComponentAndNavigation}
                            <SpecialOrderItemDetail OnAnimate={animateMenu} {...params}/>
                        {menuSpecialOrder}   
                    </div>
                )}/>
                
                <Route path={"/admin/kwetu-trade/panel/customer/member/:id/detail"} render={(params) => (
                    <div>
                        {firstComponentAndNavigation}
                        <CustomerMemberDetail OnAnimate={animateMenu} {...props} {...params}/> 
                        {menuActiveCustomer}
                    </div>
                )}/>
                 <Route path={"/admin/kwetu-trade/panel/advert/:id/detail"} render={(params) => (
                    <div>
                        {firstComponentAndNavigation}
                        <AdvertDetail OnAnimate={animateMenu} {...props} {...params}/> 
                        {menuAdvert}
                    </div>
                )}/>
                {/* <Route path={"/admin/kwetu-trade/panel/customerguestdetail"} render={() => (
                    <div>
                        {firstComponentAndNavigation}
                        <CustomerGuestDetail OnAnimate={animateMenu}/>
                        
                    </div>
                )}/> */}
            </div>
            )
}



export default FirstComponent