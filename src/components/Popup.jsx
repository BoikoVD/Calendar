import { useDispatch, useSelector } from 'react-redux';

function Popup() {
	const dispatch = useDispatch();
	const isActive = useSelector(state => state.pages.popup);
	const month = useSelector(state => state.pages.popupInputMonth);
	const day = useSelector(state => state.pages.popupInputDay);

	const pressClosePopup = () => {
		dispatch({ type: "OPEN_POPUP", payload: false });
	}

	return (
		<div className={isActive ? "popup _active" : "popup"}>
			<div className="popup__wrapper">
				<form className="popup__form">
					<div className="popup__column">
						<label htmlFor="input-month" className="popup__label">Month</label>
						<input value={month} disabled type="text" className="popup__input" id="input-month" />
					</div>
					<div className="popup__column">
						<label htmlFor="input-day" className="popup__label">Day</label>
						<input value={day} disabled type="text" className="popup__input" id="input-day" />
					</div>
					<button onClick={pressClosePopup} className="popup__close" type="button"></button>
				</form>
			</div>
		</div>
	);
}

export default Popup;