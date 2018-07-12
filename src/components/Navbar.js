import React, { Component } from 'react';
import '../styles/components/Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown: false
        };
    };

    render() {
        return (
            <header className="Navbar">
                <button className="Navbar__btn">
                    <img src={require(`../assets/img/bars.png`)} className="Navbar__btn--bars" alt="logo" />
                </button>
                <img src={require(`../assets/img/logo.png`)} className="Navbar__logo" alt="logo" />
                <div className="Navbar__user">
                    <div className={this.state.dropdown ? 'dropdown open' : 'dropdown'}>
                        <button className="dropdown-btn" onClick={() => this.toggleDropdown()}>
                            <img src={require(`../assets/img/user.png`)} className="dropdown-btn__img" alt="user img" />
                            <div className="dropdown-btn__title">
                                <span className="dropdown-btn__title--text">Jane Doe</span>
                                <img src={require(`../assets/img/caret-${this.state.dropdown ? 'up' : 'down'}.png`)} className="dropdown-btn__title--cart" alt="caret icon" />
                            </div>
                        </button>
                        <ul className="dropdown-content">
                            <li onClick={() => this.toggleDropdown()}>Sign Out</li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }

    toggleDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown });
    }
}