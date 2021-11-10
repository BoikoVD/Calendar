
function NavBurger({ burgerRef, clickOnBurger }) {

	console.log("Render: NavBurger");

	return (
		<button type="button" className="header__icon-menu icon-menu" ref={burgerRef} onClick={clickOnBurger} >
			<span></span>
			<span></span>
			<span></span>
		</ button>
	);
}

export default NavBurger;