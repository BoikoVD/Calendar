import React from 'react';
import InputMask from 'react-input-mask';

function InputTime({ time, setTime }) {
	const startsWithTwo = time[0] === '2';

	const handleInput = ({ target: { value } }) => setTime(value);

	const mask = [
		/[0-2]/,
		startsWithTwo ? /[0-3]/ : /[0-9]/,
		':',
		/[0-5]/,
		/[0-9]/
	]

	return (
		<InputMask mask={mask} maskPlaceholder="--:--" alwaysShowMask={true} onChange={handleInput} value={time} className="popup__input" id="input-time" />
	)
}

export default InputTime;