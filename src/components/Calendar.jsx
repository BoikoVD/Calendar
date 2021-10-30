import React from 'react';
import {
	format,
	startOfMonth,
	lastDayOfMonth,
	eachDayOfInterval,
	setDay,
	addMonths,
} from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

function Calendar() {
	let currentDate = new Date();

	const [thisDate, setThisDate] = React.useState(currentDate);
	const calBodyRef = React.useRef();
	const prevBtn = React.useRef();
	const nextBtn = React.useRef();
	const dispatch = useDispatch();
	const activeDates = useSelector(state => state.dates.dates);

	function getFirstAndLastDaysOfCalendar(date) {
		let firstDayOfThisMonth = startOfMonth(date);
		let lastDayOfThisMonth = lastDayOfMonth(date);
		let firstDayOfCalendar = setDay(firstDayOfThisMonth, 0);
		let lastDayOfCalendar = setDay(lastDayOfThisMonth, 6);
		return { firstDayOfCalendar, lastDayOfCalendar }
	}
	function dateFormatToNumberFormat(date) {
		let numberFormat = new Map();
		numberFormat.set("year", Number(format(date, "yyyy")));
		numberFormat.set("month", Number(format(date, "MM")));
		numberFormat.set("day", Number(format(date, "dd")));
		return numberFormat;
	}

	let { firstDayOfCalendar, lastDayOfCalendar } = getFirstAndLastDaysOfCalendar(thisDate);

	let eachDaysOfCalendar = eachDayOfInterval({
		start: firstDayOfCalendar,
		end: lastDayOfCalendar
	});

	function addDayClasses(item, thisDate, currentDate) {
		let itemtDay = dateFormatToNumberFormat(item);
		let thisDay = dateFormatToNumberFormat(thisDate);
		let currentDay = dateFormatToNumberFormat(currentDate);
		if (itemtDay.get("month") > thisDay.get("month")) {
			return "_nextMonth "
		} if (itemtDay.get("month") < thisDay.get("month")) {
			return "_prevMonth "
		} if (itemtDay.get("year") === currentDay.get("year") && itemtDay.get("month") === currentDay.get("month") && itemtDay.get("day") === currentDay.get("day")) {
			return "_current "
		} else {
			return ""
		}
	}
	function addActiveClasses(itemDate, activeDates) {
		if (activeDates.length > 0) {
			for (let date of activeDates) {
				if (JSON.stringify(itemDate) === JSON.stringify(date)) return "_active ";
			}
			return '';
		}
	}

	const addDateToStore = (date) => {
		dispatch({ type: "OPEN_POPUP", payload: true });
		dispatch({ type: "DATE_POPUP", popupInputMonth: format(date, "LLLL"), popupInputDay: format(date, "do EEEE") });
		dispatch({ type: "ADD_DATE", payload: date });
	}
	const RemoveDateFromStore = (date) => {
		let arrayCopy = [];
		for (let i = 0; i < activeDates.length; i++) {
			arrayCopy[i] = JSON.stringify(activeDates[i]);
		}
		let index = arrayCopy.indexOf(JSON.stringify(date));
		activeDates.splice(index, 1);
		let newDates = JSON.parse(JSON.stringify(activeDates));
		dispatch({ type: "REMOVE_DATE", payload: newDates });
	}
	function pressOnDay(e) {
		let index = e.target.getAttribute('data-key');
		if (e.target.classList.contains('_active')) {
			RemoveDateFromStore(eachDaysOfCalendar[index]);
		} else {
			addDateToStore(eachDaysOfCalendar[index]);
		}
	}

	let calendarList = eachDaysOfCalendar.map((item, index) => {
		return <div className="body-cal__day-wrapper" key={index + format(item, "yy/MM/dd")}>
			<span onClick={pressOnDay} data-key={index} className={"body-cal__day " + addDayClasses(item, thisDate, currentDate) + addActiveClasses(item, activeDates)} key={format(item, "yy/MM/dd")}>
				{format(item, "dd")}
			</span>
		</div>
	});

	const pressPrevBtn = () => {
		setThisDate(addMonths(thisDate, -1));
	};
	const pressNextBtn = () => {
		setThisDate(addMonths(thisDate, 1));
	};

	return (
		<div className="calendar">
			<div className="calendar__content">
				<div className="calendar__header header-cal">
					<button className="header-cal__nav-btn header-cal__nav-btn_prev" onClick={pressPrevBtn} ref={prevBtn}></button>
					<div className="header-cal__title">{format(thisDate, "LLLL") + ' ' + format(thisDate, "yyyy")}</div>
					<button className="header-cal__nav-btn header-cal__nav-btn_next" onClick={pressNextBtn} ref={nextBtn}></button>
				</div>
				<div className="calendar__body-cal body-cal" ref={calBodyRef}>
					{calendarList}
				</div>
				<div className="calendar__footer footer-cal">
					<span>S</span>
					<span>M</span>
					<span>T</span>
					<span>W</span>
					<span>T</span>
					<span>F</span>
					<span>S</span>
				</div>
			</div>
		</div>
	);
}

export default Calendar;