import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
	const menuIconRef = React.useRef();
	const navRef = React.useRef();
	const dispatch = useDispatch();
	const currentPage = useSelector(state => state.pages.onPage);

	function toggleActiveClasses() {
		menuIconRef.current.classList.toggle("_active");
		navRef.current.classList.toggle("_active");
	}
	const pressMenuIcon = React.useEffect(() => {
		menuIconRef.current.addEventListener("click", function (e) {
			toggleActiveClasses()
		});
	}, []);

	const pressHome = () => {
		dispatch({ type: "CHANGE_PAGE", payload: "home" });
		toggleActiveClasses()
	}
	const pressAboutUs = () => {
		dispatch({ type: "CHANGE_PAGE", payload: "aboutUs" });
		toggleActiveClasses()
	}

	return (
		<header className="header">
			<div className="header__logo">
				<span>w e</span><span>R</span><span>devs</span>
			</div>
			<nav className="header__nav nav" ref={navRef}>
				<ul className="nav__list">
					<li><button onClick={pressHome} className={currentPage === "home" ? "nav__btn _active" : "nav__btn"}>Home</button></li>
					<li><button onClick={pressAboutUs} className={currentPage === "aboutUs" ? "nav__btn _active" : "nav__btn"}>About Us</button></li>
				</ul>
			</nav>
			<button type="button" className="header__icon-menu icon-menu" ref={menuIconRef} onClick={pressMenuIcon}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</header>
	);
}

export default Header