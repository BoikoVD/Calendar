import Header from "./components/Header";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import { useSelector } from 'react-redux';

function App() {
	const onPage = useSelector(state => state.pages.onPage);

	let pages = [
		<Home />,
		<AboutMe />
	];

	function getPage(pages, state) {
		if (state === "home") return pages[0];
		if (state === "aboutMe") return pages[1];
	}

	return (
		<div className="wrapper">
			<Header />
			{getPage(pages, onPage)}
		</div>
	);
}

export default App;
