const defaultState = {
	onPopup: false,
	popupInputDate: new Date(),
}

export const popupReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "ON_POPUP":
			return { ...state, onPopup: action.payload };
		case "DATE_POPUP":
			return { ...state, popupInputDate: action.popupInputDate };
		default: return state;
	}
}