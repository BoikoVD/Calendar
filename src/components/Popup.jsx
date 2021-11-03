import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, set } from 'date-fns';
import InputTime from './InputTime';

function Popup() {
	const dispatch = useDispatch();

	const isActive = useSelector(state => state.popup.onPopup);
	const date = useSelector(state => state.popup.popupInputDate);
	const activeDates = useSelector(state => state.dates.dates);
	const startWorkTime = useSelector(state => state.myWorkTime.start);
	const finishWorkTime = useSelector(state => state.myWorkTime.finish);

	const [time, setTime] = React.useState('');
	const popupRef = React.useRef();
	const buttonsRef = React.useRef();
	const inputTimeRef = React.useRef();

	function activeDay(date) {
		setTime(format(date, "kk:mm"));
		inputTimeRef.current.lastChild.setAttribute('disabled', 'disabled');
		buttonsRef.current.firstChild.classList.remove('_active');
		buttonsRef.current.lastChild.classList.add('_active');
	}
	function disableDay() {
		inputTimeRef.current.lastChild.removeAttribute('disabled');
		buttonsRef.current.firstChild.classList.add('_active');
		buttonsRef.current.lastChild.classList.remove('_active');
		setTime('');
	}
	function closePopup() {
		dispatch({ type: "ON_POPUP", payload: false });
	}
	function timeSplit(time) {
		let timeArr = time.split(/\s*:\s*/);
		let hours = Number(timeArr[0]);
		let minutes = Number(timeArr[1]);
		return { hours, minutes };
	}
	function setZeroTime(date) {
		return set(date, { hours: 0, minutes: 0, seconds: 0 });
	}
	function getTimes(time) {
		let thisTime = timeSplit(time);
		let startTime = timeSplit(startWorkTime);
		let finishTime = timeSplit(finishWorkTime);
		return { thisTime, startTime, finishTime }
	}
	React.useEffect(() => {
		if (isActive) {
			popupRef.current.addEventListener("click", function (e) {
				if (!e.target.closest('.popup__form')) {
					closePopup();
				}
			});
		}
		let { thisTime, startTime, finishTime } = getTimes(time);
		if (thisTime.hours < startTime.hours || (thisTime.hours >= finishTime.hours && thisTime.minutes !== 0) || isNaN(thisTime.hours)) {
			inputTimeRef.current.classList.add('_invalid');
		} else {
			inputTimeRef.current.classList.remove('_invalid');
		}
	});

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
	}, [date, activeDates]);

	const clickOnAddMeeting = () => {
		let { thisTime, startTime, finishTime } = getTimes(time);
		let thisDate = set(date, { hours: thisTime.hours, minutes: thisTime.minutes, seconds: 0 });
		let startDate = set(date, { hours: startTime.hours, minutes: startTime.minutes, seconds: 0 });
		let finishDate = set(date, { hours: finishTime.hours, minutes: finishTime.minutes, seconds: 0 });
		if (thisDate >= startDate && thisDate <= finishDate) {
			let newActiveDates = [...activeDates, thisDate];
			dispatch({ type: "ADD_DATE", payload: newActiveDates });
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
	};

	const clickOnClosePopup = () => {
		closePopup()
	}

	return (
		<div className={isActive ? "popup _active" : "popup"} ref={popupRef}>
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
					<div className="popup__column popup__column_time" ref={inputTimeRef}>
						<label htmlFor="input-time" className="popup__label">Time</label>
						<InputTime time={time} setTime={setTime} />
					</div>
					<div className="popup__column popup__column_buttons" ref={buttonsRef}>
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