import { BrowserRouter } from "react-router-dom";
import Header from "./pages/Header";
import AppRouter from "./components/AppRouter";
import Modal from './components/Modal';

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
