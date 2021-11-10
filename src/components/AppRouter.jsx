import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Pages/Home/Home';
import AboutMe from './Pages/AboutMe/AboutMe';

function AppRouter() {

	console.log('Render: AppRouter');

	return (
		<Switch>
			<Route path="/home">
				<Home />
			</Route>
			<Route path="/about">
				<AboutMe />
			</Route>
			<Redirect to="/home" />
		</Switch>
	);
}

export default AppRouter;