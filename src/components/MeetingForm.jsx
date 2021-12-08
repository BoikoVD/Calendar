import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, set } from 'date-fns';
import InputTime from './InputTime';

function MeetingForm() {
	const dispatch = useDispatch();
	const date = useSelector(state => state.modal.modalInputDate);
	const activeDates = useSelector(state => state.dates.dates);
	const startWorkTime = useSelector(state => state.myWorkTime.start);
	const finishWorkTime = useSelector(state => state.myWorkTime.finish);

	const [time, setTime] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);

	function timeSplit(time) {
		let timeArr = time.split(/\s*:\s*/);
		let hours = Number(timeArr[0]);
		let minutes = Number(timeArr[1]);
		return { hours, minutes };
	}
	function getTimes(time) {
		let thisTime = timeSplit(time);
		let startTime = timeSplit(startWorkTime);
		let finishTime = timeSplit(finishWorkTime);
		return { thisTime, startTime, finishTime }
	}
	function setZeroTime(date) {
		return set(date, { hours: 0, minutes: 0, seconds: 0 });
	}

	React.useEffect(() => {
		if (activeDates.length !== 0) {
			for (let active of activeDates) {
				if (JSON.stringify(date) === JSON.stringify(setZeroTime(active))) {
					setTime(format(active, "kk:mm"));
					setIsActive(true);
					break;
				} else {
					setTime('');
					setIsActive(false);
				}
			}
		} else {
			setTime('');
			setIsActive(false);
		}
	}, [date, activeDates]);

	const closeModal = () => {
		dispatch({ type: "ON_MODAL", payload: false });
	}

	const clickOnButton = (e) => {
		e.preventDefault();
		let newActiveDates = [];
		if (isActive) {
			for (let active of activeDates) {
				if (JSON.stringify(date) !== JSON.stringify(setZeroTime(active))) {
					newActiveDates.push(active);
				} else {
					localStorage.removeItem(JSON.stringify(active));
				}
			}
			dispatch({ type: "REMOVE_DATE", payload: newActiveDates });
			closeModal();
		} else {
			let { thisTime, startTime, finishTime } = getTimes(time);
			let thisDate = set(date, { hours: thisTime.hours, minutes: thisTime.minutes, seconds: 0 });
			let startDate = set(date, { hours: startTime.hours, minutes: startTime.minutes, seconds: 0 });
			let finishDate = set(date, { hours: finishTime.hours, minutes: finishTime.minutes, seconds: 0 });
			if (thisDate >= startDate && thisDate <= finishDate) {
				newActiveDates = [...activeDates, thisDate];
				localStorage.setItem(JSON.stringify(thisDate), JSON.stringify(thisDate));
				dispatch({ type: "ADD_DATE", payload: newActiveDates });
				closeModal();
			}
		}
	};

	return (
		<form className="meeting-form">
			<div className="meeting-form__column">
				<label htmlFor="input-month" className="meeting-form__label">Month</label>
				<input value={format(date, "LLLL")} disabled type="text" className="meeting-form__input" id="input-month" />
			</div>
			<div className="meeting-form__column">
				<label htmlFor="input-day" className="meeting-form__label">Day</label>
				<input value={format(date, "do EEEE")} disabled type="text" className="meeting-form__input" id="input-day" />
			</div>
			<div className="meeting-form__column">
				<label htmlFor="input-time" className="meeting-form__label">Time</label>
				<InputTime time={time} setTime={setTime} getTimes={getTimes} isActive={isActive} />
			</div>
			<div className="meeting-form__column meeting-form__column_buttons">
				<button onClick={clickOnButton} className={isActive ? "meeting-form__btn _red" : "meeting-form__btn"}>{isActive ? "Cancel meeting" : "Add meeting"}</button>
			</div>
		</form>
	);
}

export default MeetingForm;
