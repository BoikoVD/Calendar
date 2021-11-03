import { createStore, combineReducers } from 'redux';
import { datesReducer } from './datesReducer';
import { pagesReducer } from './pagesReducer';
import { popupReducer } from './popupReducer';
import { myWorkTimeReducer } from './myWorkTimeReducer';

const rootReducer = combineReducers({
	dates: datesReducer,
	pages: pagesReducer,
	popup: popupReducer,
	myWorkTime: myWorkTimeReducer,
});

export const store = createStore(rootReducer);