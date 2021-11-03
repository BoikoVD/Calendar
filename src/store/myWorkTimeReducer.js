const defaultState = {
	start: "09:00",
	finish: "18:00",
}

export const myWorkTimeReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "CHANGE_WORK_TIME":
			return { ...state, start: action.start, finish: action.finish };
		default: return state;
	}
}