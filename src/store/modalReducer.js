const defaultState = {
	onModal: false,
	modalInputDate: new Date(),
}

export const modalReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "ON_MODAL":
			return { ...state, onModal: action.payload };
		case "DATE_MODAL":
			return { ...state, modalInputDate: action.modalInputDate };
		default:
			return state;
	}
}