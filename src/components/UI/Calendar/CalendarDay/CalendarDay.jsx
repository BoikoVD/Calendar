import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseJSON, set } from 'date-fns';

function CalendarDay({ day, thisDate, currentDate }) {
	const dispatch = useDispatch();
	const activeDates = useSelector(state => state.dates.dates);

	function fromDateToNumber(date) {
		let numberFormat = new Map();
		numberFormat.set("year", Number(format(date, "yyyy")));
		numberFormat.set("month", Number(format(date, "MM")));
		numberFormat.set("day", Number(format(date, "dd")));
		return numberFormat;
	}
	function addDayClass(day, thisDate, currentDate) {
		let dayMap = fromDateToNumber(day);
		let thisDateMap = fromDateToNumber(thisDate);
		let currentDateMap = fromDateToNumber(currentDate);
		if (dayMap.get("month") > thisDateMap.get("month")) {
			return "_nextMonth "
		} if (dayMap.get("month") < thisDateMap.get("month")) {
			return "_prevMonth "
		} if (dayMap.get("year") === currentDateMap.get("year") &&
			dayMap.get("month") === currentDateMap.get("month") &&
			dayMap.get("day") === currentDateMap.get("day")) {
			return "_current "
		} else {
			return ""
		}
	}
	function addActiveClass(day, activeDates) {
		if (activeDates.size !== 0) {
			for (let date of activeDates) {
				if (JSON.stringify(day) === JSON.stringify(set(date, { hours: 0, minutes: 0, seconds: 0 }))) {
					return "active "
				};
			}
			return '';
		}
	}

	const openModal = (date) => {
		dispatch({ type: "ON_MODAL", payload: true });
		dispatch({ type: "DATE_MODAL", modalInputDate: date });
	}

	function clickOnDay(e) {
		let date = parseJSON(e.target.getAttribute('data-date'));
		openModal(date);
	}

	console.log('Render: CalendarDay');

	return (
		<div className="day-wrapper">
			<span onClick={clickOnDay}
				data-date={JSON.stringify(day)}
				className={"day " + addDayClass(day, thisDate, currentDate) + addActiveClass(day, activeDates)}>
				{format(day, "dd")}
			</span>
		</div>
	);
}

export default CalendarDay;