import * as actions from './actions';
import data from '../data/data';
import {combineReducers} from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


/* coffee data reducer for fetching from the server */
function coffeeProductData (state=data.coffeeList, action){
    switch(action.type){
        case actions.RETRIEVING_FROM_SERVER_ON_FIRST_LOAD:
            return action.payload.coffeeList

        default: return state
    }
}
function verifiedCoffeeProductData (state=data.verifiedCoffeeList, action){
    switch(action.type){
        case actions.RETRIEVING_FROM_SERVER_TO_DISPLAY_TO_USERS:
            return action.payload.verifiedCoffeeList

        default: return state
    }
}


/* material data reducer for fetching from the server */
function verifiedMaterialProductData (state=data.verifiedMaterialList, action){
    switch(action.type){
        case actions.RETRIEVING_MATERIALS_TO_DISPLAY_TO_USERS:
            return action.payload.verifiedMaterialList
            
        default: return state
    }
}


function MaterialProductData (state=data.materialList, action){
    switch(action.type){
        case actions.RETRIEVING_MATERIALS_ON_FIRST_LOAD:
            return action.payload.materialList
            
        default: return state
    }
}

/* animal data reducer for fetching from the server */
function verifiedAnimalProductData (state=data.verifiedAnimalList, action){
    switch(action.type){
        case actions.RETRIEVING_ANIMAL_TO_DISPLAY_TO_USERS:
            return action.payload.verifiedAnimalList
            
        default: return state
    }
}

function AnimalProductData (state=data.animalList, action){
    switch(action.type){
        case actions.RETRIEVING_ANIMAL_ON_FIRST_LOAD:
            return action.payload.animalList
            
        default: return state
    }
}


/* shopping cart */
function shoppingCartData(state=data.shoppingCart, action){
    switch(action.type){
        case actions.ADDING_SHOPPING_CART_ITEM:
        
            return {...state, subTotal: Number(state.subTotal) + Number(action.payload.price), items: [...state.items, action.payload]}

        case actions.INCREASING_SHOPPING_CART_ITEM_QUANTITY:

            const increaseItemQuantityIndex = state.items.indexOf(action.payload.cartItem)
            return {...state, subTotal: Number(state.subTotal) + Number(action.payload.cartItem.price),
            items: state.items.map(item => state.items.indexOf(item) !== increaseItemQuantityIndex ? item : {...item, quantity: Number(action.payload.cartItem.quantity) + 1})}


        case actions.DECREASING_SHOPPING_CART_ITEM_QUANTITY:

            const decreaseItemQuantityIndex = state.items.indexOf(action.payload.cartItem)
            
            return {...state, subTotal: Number(state.subTotal) - Number(action.payload.cartItem.price),
            items: state.items.map(item => state.items.indexOf(item) !== decreaseItemQuantityIndex ? item : {...item, quantity: Number(action.payload.cartItem.quantity) - 1})}
        
        case actions.REMOVING_SHOPPING_CART_ITEM:
            return {...state, subTotal: Number(state.subTotal) - Number(Number(action.payload.cartItem.quantity) * Number(action.payload.cartItem.price)),
            items: state.items.filter(item => item.itemId !== action.payload.cartItem.itemId)}

        case actions.UPDATING_SHOPPING_CART:
            return action.payload.data
            
        default: return state
    }
}

function ShippingFeeData(state=data.shippingFee, action){
    switch(action.type){
        case actions.ADDING_SHIPPING_FEE:
            return Number(action.payload.shippingFee)
        
        default: return state
    }
}

/* user and customer data reducers */
function usersData(state=data.users, action){
    switch(action.type){
        case actions.USERS_LIST:
            return action.payload.data
        default: return state
    }
}

function customersData(state=data.customers, action){
    switch(action.type){
        case actions.CUSTOMER_LIST:
            return action.payload.data
        default: return state
    }
}

/* order reducer */
function ordersData(state=data.orders, action){
    switch(action.type){
        case actions.ORDERS_LIST:
            return action.payload.data
        default: return state
    }
}

/* user authentication and super user authentications */
function userAuthentication(state=data.authenticated, action){
    switch(action.type){
        case actions.LOGIN_USER:
            return action.payload.data
        case actions.LOGOUT_USER:
            return action.payload.data
        default: return state
    }
}

function activeUserData(state=data.activeUser, action){
    switch(action.type){
        case actions.UPDATE_ACTIVE_USER:
            return action.payload.data
        
        default: return state
    }
}

function superuserAuthentication(state=data.authenticatedSuperUSer, action){
    switch(action.type){
        case actions.LOGIN_SUPERUSER:
            return action.payload.data
        case actions.LOGOUT_SUPERUSER:
            return action.payload.data
        default: return state
    }
}

function activeSuperuser(state=data.activeSuperUser, action){
    switch(action.type){
        case actions.UPDATE_ACTIVE_SUPERUSER:
            return action.payload.data
        default: return state
    }
}


/* special order reducers */

function specialOrderData(state=data.specialOrder, action){
    switch(action.type){
        case actions.ADD_SPECIAL_ORDER_ITEM:
            return {...state, orderItems: [...state.orderItems, action.payload.data], 
                quantityOrdered: Number(state.quantityOrdered) + Number(action.payload.data.quantity),
                amountOrdered: Number(state.amountOrdered) + Number(Number(action.payload.data.price) * Number(action.payload.data.quantity))}
        
        case actions.REMOVE_SPECIAL_ORDER_ITEM:
            return {...state, orderItems: state.orderItems.filter(item=> item.itemId !== action.payload.data.itemId), 
                quantityOrdered: Number(state.quantityOrdered) - Number(action.payload.data.quantity),
                amountOrdered: Number(state.amountOrdered) - Number(Number(action.payload.data.price) * Number(action.payload.data.quantity))}

        case actions.ADD_SPECIAL_ORDER_ADDRESS:
            return {...state, orderAddress: action.payload.data} 
        
        case actions.ADD_SPECIAL_ORDER_CUSTOMER_ID:
            return {...state, customerId: action.payload.id}
        
        default: return state
    }
}

function specialOrdersListData(state=data.specialOrders, action){
    switch(action.type){
        case actions.UPDATE_SPECIAL_ORDER_LIST:
            return action.payload.data
        default: return state
    }
}


/* adverts */

function advertsListData(state=data.adverts, action){
    switch(action.type){
        case actions.UPDATE_ADVERTS_LIST:
            return action.payload.data 
        default: return state 
    }
}

/* invoices */
function invoicesListData(state=data.invoices, action){
    switch(action.type){
        case actions.UPDATE_INVOICES_LIST:
            return action.payload.data
        default: return state
    }
}


const persistConfig = {
    key: 'root', 
    storage,
    whitelist: ['shoppingCartData', 'userAuthentication', 'activeUserData', 'superuserAuthentication', 'activeSuperuser', 'ShippingFeeData']
}




const rootReducer = combineReducers(
    {
    coffeeProductData, 
    MaterialProductData,
    AnimalProductData,
    verifiedCoffeeProductData, 
    verifiedMaterialProductData,
    verifiedAnimalProductData,
    shoppingCartData,
    ShippingFeeData,
    usersData,
    customersData,
    ordersData,
    userAuthentication,
    activeUserData,
    superuserAuthentication,
    activeSuperuser,
    specialOrderData,
    specialOrdersListData,
    advertsListData,
    invoicesListData
    })

export default persistReducer(persistConfig, rootReducer)