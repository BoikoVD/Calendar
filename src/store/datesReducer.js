const defaultState = {
	dates: [],
}

export const datesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "ADD_DATE":
			return { ...state, dates: [...state.dates, action.payload] };
		case "REMOVE_DATE":
			return { ...state, dates: action.payload };
		default: return state;
	}
}