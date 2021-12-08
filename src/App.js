import { useDispatch } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import Header from "./pages/Header";
import AppRouter from "./components/AppRouter";
import Modal from './components/Modal';
import React from 'react';
import { parseJSON } from 'date-fns';

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		let dates = [];
		for (let i = 0; i < localStorage.length; i++) {
			dates.push(parseJSON(localStorage.key(i)));
		}
		dispatch({ type: "ADD_DATE", payload: dates });
	});

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
