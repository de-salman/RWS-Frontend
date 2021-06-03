import React from 'react';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { ProductContext } from '../contexts/PoductContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhoneAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
library.add(faPhoneAlt, faShoppingCart);

const Navbar = () => {

    const { totalProduct } = useContext(ProductContext)
    return (
        <nav className="navbar navbar-expand">
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <a className="nav-link" href="tel:5551234567"><FontAwesomeIcon icon="phone-alt" /></a>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link home">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/cart" className="nav-link"><FontAwesomeIcon icon="shopping-cart" /><span className="cart-total-prd">{totalProduct}</span></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;