
const data = {
    coffeeList: [],
    materialList: [],
    animalList: [],
    verifiedCoffeeList: [],
    verifiedMaterialList: [],
    verifiedAnimalList: [],
    shoppingCart: {
        cartId: 1,
        items:[],
        currency: "$",
        subTotal: 0
    },
    shippingFee: 0,
    users: [],
    customers: [],
    orders: [],
    authenticated: false,
    activeUser:{},
    activeSuperUser:{},
    authenticatedSuperUSer: false,
    specialOrder: {
        customerId: 0,
        amountOrdered: 0,
        quantityOrdered: 0,
        orderItems: [],
        orderAddress: {}
    },
    specialOrders: [],
    adverts: [],
    invoices: []
}


export default data
