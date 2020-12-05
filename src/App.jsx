import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import * as actions from './redux/actionsCreators'
import AllView from './Components/Visitor/AllView'

function mapStateToProps(state){
    return {
        coffeeList: state.coffeeProductData,
        materialList: state.MaterialProductData,
        animalList: state.AnimalProductData,
        verifiedCoffeeList: state.verifiedCoffeeProductData,
        verifiedMaterialList: state.verifiedMaterialProductData,
        verifiedAnimalList: state.verifiedAnimalProductData,
        shoppingCart: state.shoppingCartData,
        shippingFee: state.ShippingFeeData,
        users: state.usersData,
        customers: state.customersData,
        orders: state.ordersData,
        authenticated: state.userAuthentication,
        activeUser: state.activeUserData,
        authenticatedSuperuser: state.superuserAuthentication,
        activeSuperuser: state.activeSuperuser,
        specialOrder: state.specialOrderData,
        specialOrdersList: state.specialOrdersListData,
        adverts: state.advertsListData,
        invoices: state.invoicesListData
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch)
}


const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AllView))


export default App