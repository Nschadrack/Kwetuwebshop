import * as actions from './actions'
import {v4} from "node-uuid";


export const retrievingFromServerOnFirstLoad = (coffeeList) =>({
    type:actions.RETRIEVING_FROM_SERVER_ON_FIRST_LOAD,
    payload:{
        coffeeList 
    }
})
export const retrievingFromServerToDisplayToUsers = (verifiedCoffeeList) =>({
    type:actions.RETRIEVING_FROM_SERVER_TO_DISPLAY_TO_USERS,
    payload:{
        verifiedCoffeeList 
    }
})

export const retrievingMaterialOnFirstLoad = (materialList) =>({
    type:actions.RETRIEVING_MATERIALS_ON_FIRST_LOAD,
    payload:{
        materialList 
    }
})
export const retrievingMaterialToDisplayToUsers = (verifiedMaterialList) =>({
    type:actions.RETRIEVING_MATERIALS_TO_DISPLAY_TO_USERS,
    payload:{
        verifiedMaterialList 
    }
})

export const retrievingAnimalOnFirstLoad = (animalList) =>({
    type:actions.RETRIEVING_ANIMAL_ON_FIRST_LOAD,
    payload:{
        animalList 
    }
})
export const retrievingAnimalToDisplayToUsers = (verifiedAnimalList) =>({
    type:actions.RETRIEVING_ANIMAL_TO_DISPLAY_TO_USERS,
    payload:{
        verifiedAnimalList 
    }
})

/* shopping cart */

export const addingShoppingCartItem = (cartItem) =>({
    type: actions.ADDING_SHOPPING_CART_ITEM,
    payload: {
        itemId: v4(),
        itemName: cartItem.itemName,
        image: cartItem.image,
        quantity: cartItem.quantity,
        price: cartItem.price,
        classification: cartItem.classification,
        productId: cartItem.productId,
        description: cartItem.description,
        weight: cartItem.weight
    }
})

export const increasingShoppingCartItemQuantity = (cartItem) =>({
    type: actions.INCREASING_SHOPPING_CART_ITEM_QUANTITY,
    payload: {
        cartItem
    }
})

export const decreasingShoppingCartItemQuantity = (cartItem) =>({
    type: actions.DECREASING_SHOPPING_CART_ITEM_QUANTITY,
    payload: {
        cartItem
    }
})

export const removingShoppingCartItem = (cartItem) =>({
    type: actions.REMOVING_SHOPPING_CART_ITEM,
    payload: {
        cartItem
    }
})

export const updatingShoppingCart = (data) =>({
    type: actions.UPDATING_SHOPPING_CART,
    payload: {
        data
    }
})


/* handling shipping fee */
export const addingShippingFee = (shippingFee) =>({
    type: actions.ADDING_SHIPPING_FEE,
    payload: {
        shippingFee
    }
})

/* users and customers list */
export const usersList = (data) =>({
    type: actions.USERS_LIST,
    payload:{
        data
    }
})

export const customerList = (data) =>({
    type: actions.CUSTOMER_LIST,
    payload:{
        data
    }
})


/* handling order list */
export const ordersList = (data) =>({
    type: actions.ORDERS_LIST,
    payload:{
        data
    }
})

/* super user and actual user login and logout authentication */
export const loginUser = () =>({
    type: actions.LOGIN_USER,
    payload:{
        data: true
    }
})

export const logoutUser = () =>({
    type: actions.LOGOUT_USER,
    payload:{
        data: false
    }
})

export const updateActiveUser = (data) =>({
    type: actions.UPDATE_ACTIVE_USER,
    payload:{
        data
    }
})


export const loginSuperUser = () =>({
    type: actions.LOGIN_SUPERUSER,
    payload:{
        data:true,
    }
})


export const logoutSuperUser = () =>({
    type: actions.LOGOUT_SUPERUSER,
    payload:{
        data:false,
    }
})

export const updateActiveSuperuser = (data) =>({
    type: actions.UPDATE_ACTIVE_SUPERUSER,
    payload: {
        data
    }
})


/* handling special order */

export const addSpecialOrderItem = (data) =>({
    type: actions.ADD_SPECIAL_ORDER_ITEM,
    payload:{
        data:{
            itemId: v4(),
            name: data.name,
            unit: data.unit,
            price: data.price,
            quantity: data.quantity,
            image: data.image,
            description: data.description
        }
    }
})

export const removeSpecialOrderItem = (data) =>({
    type: actions.REMOVE_SPECIAL_ORDER_ITEM,
    payload:{
        data
    }
})

export const addSpecialOrderAddress = (data) =>({
    type: actions.ADD_SPECIAL_ORDER_ADDRESS,
    payload:{
        data
    }
})

export const addSpecialOrderCustomerId = (id) =>({
    type: actions.ADD_SPECIAL_ORDER_CUSTOMER_ID,
    payload:{
        id
    }
})

export const updateSpecialOrderList = (data) =>({
    type: actions.UPDATE_SPECIAL_ORDER_LIST,
    payload:{
        data
    }
})


/* adverts */

export const updateAdvertList = (data) =>({
    type: actions.UPDATE_ADVERTS_LIST,
    payload:{
        data
    }
})

/* invoices */
export const updateInvoicesList = (data) =>({
    type: actions.UPDATE_INVOICES_LIST,
    payload:{
        data
    }
})