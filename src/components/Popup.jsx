import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, set } from 'date-fns';

function Popup() {
	const dispatch = useDispatch();

	const isActive = useSelector(state => state.popup.onPopup);
	const date = useSelector(state => state.popup.popupInputDate);
	const activeDates = useSelector(state => state.dates.dates);

	const [time, setTime] = React.useState('');
	const buttonsRef = React.useRef();
	const inputTimeRef = React.useRef();

	const myWorkTime = {
		start: "09:00",
		finish: "18:00",
	}

	function activeDay(date) {
		setTime(format(date, "kk:mm"));
		inputTimeRef.current.setAttribute('disabled', 'disabled');
		buttonsRef.current.firstChild.classList.remove('_active');
		buttonsRef.current.lastChild.classList.add('_active');
	}
	function disableDay() {
		inputTimeRef.current.removeAttribute('disabled');
		buttonsRef.current.firstChild.classList.add('_active');
		buttonsRef.current.lastChild.classList.remove('_active');
		setTime('');
	}
	function closePopup() {
		dispatch({ type: "ON_POPUP", payload: false });
	};
	function timeSplit(time) {
		let timeArr = time.split(/\s*:\s*/);
		let hourse = Number(timeArr[0]);
		let minutes = Number(timeArr[1]);
		return { hourse, minutes };
	}
	function setZeroTime(date) {
		return set(date, { hours: 0, minutes: 0, seconds: 0 });
	}

	React.useEffect(() => {
		if (activeDates.length === 0) {
			disableDay();
		} else {
			for (let active of activeDates) {
				if (JSON.stringify(date) === JSON.stringify(setZeroTime(active))) {
					activeDay(active);
					break;
				} else {
					disableDay();
				}
			}
		}
	}, [date]);

	const clickOnAddMeeting = () => {
		let thisTime = timeSplit(time);
		let startTime = timeSplit(myWorkTime.start);
		let finishTime = timeSplit(myWorkTime.finish);
		let thisDate = set(date, { hours: thisTime.hourse, minutes: thisTime.minutes, seconds: 0 });
		let startDate = set(date, { hours: startTime.hourse, minutes: startTime.minutes, seconds: 0 });
		let finishDate = set(date, { hours: finishTime.hourse, minutes: finishTime.minutes, seconds: 0 });
		if (thisDate >= startDate && thisDate <= finishDate) {
			let newActiveDates = [...activeDates, thisDate];
			dispatch({ type: "ADD_DATE", payload: newActiveDates });
			closePopup();
		} else return;
	};
	const clickOnCancelMeeting = () => {
		let newActiveDates = [];
		for (let active of activeDates) {
			if (JSON.stringify(date) !== JSON.stringify(setZeroTime(active))) {
				newActiveDates.push(active);
			}
		}
		dispatch({ type: "REMOVE_DATE", payload: newActiveDates });
		closePopup()
	};

	const clickOnClosePopup = () => {
		closePopup()
	}

	return (
		<div className={isActive ? "popup _active" : "popup"}>
			<div className="popup__wrapper">
				<form className="popup__form">
					<div className="popup__column">
						<label htmlFor="input-month" className="popup__label">Month</label>
						<input value={format(date, "LLLL")} disabled type="text" className="popup__input" id="input-month" />
					</div>
					<div className="popup__column">
						<label htmlFor="input-day" className="popup__label">Day</label>
						<input value={format(date, "do EEEE")} disabled type="text" className="popup__input" id="input-day" />
					</div>
					<div className="popup__column">
						<label htmlFor="input-time" className="popup__label">Time</label>
						<input value={time}
							onChange={(e) => setTime(e.target.value)}
							type="time"
							min={myWorkTime.start}
							max={myWorkTime.finish}
							required
							className="popup__input"
							id="input-time"
							ref={inputTimeRef} />
					</div>
					<div className="popup__column" ref={buttonsRef}>
						<button onClick={clickOnAddMeeting} className="popup__btn popup__add-meeting _active" type="button">Add meeting</button>
						<button onClick={clickOnCancelMeeting} className="popup__btn popup__cancel-meeting" type="button">Cancel meeting</button>
					</div>
					<button onClick={clickOnClosePopup} className="popup__close" type="button"></button>
				</form>
			</div>
		</div>
	);
}

export default Popup;