import { BrowserRouter } from "react-router-dom";
import Header from "./components/Pages/Header/Header";
import AppRouter from "./components/AppRouter";
import Modal from './components/UI/Modal/Modal';

function App() {

	console.log('Render: App');

	return (
		<BrowserRouter>
			<div className="wrapper">
				<Header />
				<AppRouter />
				<Modal ></Modal>
			</div>
		</BrowserRouter>
	);
}

export default App;
