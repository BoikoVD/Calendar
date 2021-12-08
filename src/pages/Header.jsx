import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import NavBurger from '../components/NavBurger';

function Header() {
	const burgerRef = React.useRef();
	const navRef = React.useRef();

	const clickOnBurger = React.useEffect(() => {
		burgerRef.current.addEventListener("click", function (e) {
			burgerRef.current.classList.toggle("active");
			navRef.current.classList.toggle("active");
		});
	});

	console.log("Render: Header");

	return (
		<header className="header">
			<Logo />
			<Navigation navRef={navRef} burgerRef={burgerRef} />
			<NavBurger burgerRef={burgerRef} clickOnBurger={clickOnBurger} />
		</header>
	);
}

export default Header