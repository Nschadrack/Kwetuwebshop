import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch, faLuggageCart} from '@fortawesome/free-solid-svg-icons'
import DropDownCart from './DropDownCart';
import {useSpring, animated} from 'react-spring';
import auth from "../../auth";


const NavBar = (props) => {
    const cart = props.shoppingCart
    const items = cart.items
    
    var dropDownCartDiv
    var numberOfItems = 0
    items.map(item => numberOfItems += item.quantity)

    const [showDropdownCart, setShowDropDowncart] = useState(false)
    const animateDropDownCart = useSpring({
        from: {opacity: 0, top: '70px'},
        to: [{opacity: 0.5}, {opacity: 1, top: '40px'}],
        config: {delay: 500, duration: 1000}
    })
    if (showDropdownCart){
        dropDownCartDiv = <animated.div style={animateDropDownCart} className="drop-down-cart" 
                        onMouseOver={() => setShowDropDowncart(true)}>
                            <DropDownCart cart={cart}/>
                        </animated.div>
    }
    else{
        dropDownCartDiv =<div></div>
    }
    const handleFormSearch=(event) => {
            event.preventDefault()
            const selectCategory = event.target.elements.search_bar_nav_bar.value
            const entryWordSearch = event.target.elements.entry_for_search_nav.value
            props.handleSearchingInNavbar(selectCategory, entryWordSearch)
    }
    return (
        <div>
            <nav className='main-navbar' id="top-navbar">
                <div className="first-section-in-navbar">
                    <div className="navbar-logo">
                        <Link to={'/'}>Kwetu Trade</Link>
                    </div>
                    <div className="search-bar-nav-bar-acount">
                        <div className="search-form" onMouseOver={() => setShowDropDowncart(false)}>
                            <form onSubmit={handleFormSearch}>
                                <select name="search_bar_nav_bar">
                                    <option className="search-form-select-option" value="all">all categories</option>
                                    <option className="search-form-select-option" value="coffee">Coffee</option>
                                    <option className="search-form-select-option" value="animal">Live Animals</option>
                                    <option className="search-form-select-option" value="material">Electronics & clothing</option>
                                </select>
                                <input type="text" name="entry_for_search_nav" required autoComplete="off"/>
                                <button>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </button>
                            </form>
                        </div>
                        <div className="search-account">
                            <ul>
                                <li>
                                    {auth.isAuthenticated(props.authenticated) === true ?
                                        <button onClick={()=> {
                                            props.logoutUser(false)
                                            props.updateActiveUser({})
                                            props.history.push("/")
                                            }}>
                                                Logout</button>
                                    :
                                        <Link to={"/login-register"}  onMouseOver={() => setShowDropDowncart(false)}>
                                            Register/Login
                                        </Link>
                                    }
                                </li>
                                <li onMouseOver={() => setShowDropDowncart(true)}>
                                <Link to={"/cart"}>
                                    <React.Fragment>
                                        <span className="cart-items-number">{numberOfItems}</span>
                                        <FontAwesomeIcon icon={faLuggageCart} size="lg"/>   Cart
                                    </React.Fragment>
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="second-section-in-navbar"  onMouseOver={() => setShowDropDowncart(false)}>
                    <div className='left-navbar-links'>
                        <ul>
                            <li>
                                <Link to={'/welcome'} className={props.onActiveHome}>Home</Link>
                            </li>
                            <li>
                                <Link to={'/in-the-shop'} className={props.onActiveShop}>All deals</Link>
                            </li>
                            <li>
                                <Link to={"/about/kwetu-trade"} className={props.onActiveAbout}>About Us</Link>
                            </li>
                            <li>
                                <Link to={"/contact/kwetu-trade"} className={props.onActiveContact}>Contact Us</Link>
                            </li>
                            {auth.isAuthenticated(props.authenticated) &&
                                <li>
                                    <Link to={`/${props.activeUser.first_name}-${props.activeUser.last_name}/account`}>My account</Link>
                                </li>
                            }
                        </ul>
                    </div>
                    <div className='right-navbar-links'>
                        <ul>
                            <li>
                                <Link to={"/special-order/place"} className="navbar-order-btn-link">Special order</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            { dropDownCartDiv }
        </div>
     );
}
 
export default NavBar;