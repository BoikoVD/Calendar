import React from 'react';
import { NavLink } from "react-router-dom";

function Navigation({ navRef, burgerRef }) {

	const clickOnLink = () => {
		burgerRef.current.classList.remove("active");
		navRef.current.classList.remove("active");
	}

	return (
		<nav className="nav" ref={navRef}>
			<ul className="nav__list">
				<li><NavLink to="/home" className="nav__link" onClick={clickOnLink}>Home</NavLink></li>
				<li><NavLink to="/about" className="nav__link" onClick={clickOnLink}>About Me</NavLink></li>
			</ul>
		</nav>
	);
}

export default Navigation;