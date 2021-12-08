import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MeetingForm from './MeetingForm';

const Modal = () => {
	const dispatch = useDispatch();
	const isActive = useSelector(state => state.modal.onModal);

	const closeModal = () => {
		dispatch({ type: "ON_MODAL", payload: false });
	}

	return (
		<div className={isActive ? "modal active" : "modal"} onClick={closeModal}>
			<div className="modal__wrapper" onClick={(e) => { e.stopPropagation() }}>
				<MeetingForm />
				<button onClick={closeModal} className="modal__close" type="button" aria-label='close modal'></button>
			</div>
		</div>
	);
}

export default Modal;