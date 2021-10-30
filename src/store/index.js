import { createStore, combineReducers } from 'redux';
import { datesReducer } from './datesReducer';
import { pagesReducer } from './pagesReducer'

const rootReducer = combineReducers({
	dates: datesReducer,
	pages: pagesReducer,
});

export const store = createStore(rootReducer);