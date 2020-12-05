import React from 'react';
import React_DOM from 'react-dom';
import "./stylesheets/admin/main.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {store, persistor} from "./redux/store";
import 'bootstrap/dist/css/bootstrap.css';
import ScrollToTop from './Components/Visitor/ScrollToTop';
import App from './App';
import {PersistGate} from "redux-persist/integration/react";




React_DOM.render(
<Provider store={store}>
    <BrowserRouter>
        <ScrollToTop>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </ScrollToTop>
    </BrowserRouter>
</Provider>,  document.getElementById("root"))