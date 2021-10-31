const defaultState = {
	onPage: "home",
}

export const pagesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "CHANGE_PAGE":
			return { ...state, onPage: action.payload };
		default: return state;
	}
}