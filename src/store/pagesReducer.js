const defaultState = {
	onPage: "home",
	popup: false,
	popupInputMonth: '',
	popupInputDay: '',
}

export const pagesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "CHANGE_PAGE":
			return { ...state, onPage: action.payload };
		case "OPEN_POPUP":
			return { ...state, popup: action.payload };
		case "DATE_POPUP":
			return { ...state, popupInputMonth: action.popupInputMonth, popupInputDay: action.popupInputDay };
		default: return state;
	}
}