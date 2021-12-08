import { Route, Switch, Redirect } from "react-router-dom";
import Home from '../pages/Home';
import AboutMe from '../pages/AboutMe';

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