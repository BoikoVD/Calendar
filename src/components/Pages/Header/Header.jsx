import React from 'react';
import Logo from '../../UI/Logo/Logo';
import Navigation from '../../UI/Navigation/Navigation';
import NavBurger from '../../UI/NavBurger/NavBurger';

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