import { createStore, combineReducers } from 'redux';
import { datesReducer } from './datesReducer';
import { pagesReducer } from './pagesReducer';
import { popupReducer } from './popupReducer';

const rootReducer = combineReducers({
	dates: datesReducer,
	pages: pagesReducer,
	popup: popupReducer,
});

export const store = createStore(rootReducer);