
function NavBurger({ burgerRef, clickOnBurger }) {

	return (
		<button type="button" className="header__icon-menu icon-menu" ref={burgerRef} onClick={clickOnBurger} >
			<span></span>
			<span></span>
			<span></span>
		</ button>
	);
}

export default NavBurger;