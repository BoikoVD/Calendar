import React from 'react';
import {
	format,
	startOfMonth,
	lastDayOfMonth,
	eachDayOfInterval,
	setDay,
	addMonths,
} from 'date-fns';
import CalendarDay from './CalendarDay/CalendarDay';

function Calendar() {
	const currentDate = new Date();
	const [thisDate, setThisDate] = React.useState(currentDate);

	function getFirstAndLastDaysOfCalendar(date) {
		let firstDayOfThisMonth = startOfMonth(date);
		let lastDayOfThisMonth = lastDayOfMonth(date);
		let firstDayOfCalendar = setDay(firstDayOfThisMonth, 0);
		let lastDayOfCalendar = setDay(lastDayOfThisMonth, 6);
		return { firstDayOfCalendar, lastDayOfCalendar }
	}

	let { firstDayOfCalendar, lastDayOfCalendar } = getFirstAndLastDaysOfCalendar(thisDate);

	let eachDaysOfCalendar = eachDayOfInterval({
		start: firstDayOfCalendar,
		end: lastDayOfCalendar
	});

	const clockOnPrevBtn = () => {
		setThisDate(addMonths(thisDate, -1));
	};
	const clickOnNextBtn = () => {
		setThisDate(addMonths(thisDate, 1));
	};

	console.log('Render: Calendar');

	return (
		<div className="calendar">
			<div className="calendar__content">
				<div className="calendar__header header-cal">
					<button className="header-cal__nav-btn header-cal__nav-btn_prev" onClick={clockOnPrevBtn}></button>
					<div className="header-cal__title">{format(thisDate, "LLLL") + ' ' + format(thisDate, "yyyy")}</div>
					<button className="header-cal__nav-btn header-cal__nav-btn_next" onClick={clickOnNextBtn}></button>
				</div>
				<div className="calendar__body-cal body-cal">
					{eachDaysOfCalendar.map(day => { return <CalendarDay day={day} thisDate={thisDate} currentDate={currentDate} key={day} /> })}
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