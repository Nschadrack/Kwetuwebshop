import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";



// const reduxDevToll =window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const store = createStore(rootReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

    
export  { store, persistor }



 