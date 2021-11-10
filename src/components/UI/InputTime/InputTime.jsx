import React from 'react';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';

function InputTime({ time, setTime, getTimes, isActive }) {
	const startWorkTime = useSelector(state => state.myWorkTime.start);
	const finishWorkTime = useSelector(state => state.myWorkTime.finish);
	const inputTimeRef = React.useRef();

	const startsWithTwo = time[0] === '2';
	const handleInput = ({ target: { value } }) => setTime(value);
	const mask = [
		/[0-2]/,
		startsWithTwo ? /[0-3]/ : /[0-9]/,
		':',
		/[0-5]/,
		/[0-9]/
	]

	React.useEffect(() => {
		if (isActive) {
			inputTimeRef.current.setAttribute('disabled', 'disabled');
		} else {
			inputTimeRef.current.removeAttribute('disabled');
		}
	}, [isActive]);

	React.useEffect(() => {
		let { thisTime, startTime, finishTime } = getTimes(time);
		if (thisTime.hours < startTime.hours || (thisTime.hours >= finishTime.hours && thisTime.minutes !== 0) || isNaN(thisTime.hours)) {
			inputTimeRef.current.closest('.input-time-wrapper').classList.add('_invalid');
		} else {
			inputTimeRef.current.closest('.input-time-wrapper').classList.remove('_invalid');
		}
	});

	console.log('Render: InputTime');

	return (
		<div className="input-time-wrapper">
			<InputMask
				mask={mask}
				maskPlaceholder="--:--"
				alwaysShowMask={true}
				onChange={handleInput}
				value={time}
				id="input-time"
				className="input-time"
				ref={inputTimeRef}
			/>
			<div className="input-time-hint">
				<span>{"Working hours " + startWorkTime + "-" + finishWorkTime}</span>
			</div>
		</div>
	)
}

export default InputTime;