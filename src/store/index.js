import { createStore, combineReducers } from 'redux';
import { datesReducer } from './datesReducer';
import { modalReducer } from './modalReducer';
import { myWorkTimeReducer } from './myWorkTimeReducer';

const rootReducer = combineReducers({
	dates: datesReducer,
	modal: modalReducer,
	myWorkTime: myWorkTimeReducer,
});

export const store = createStore(rootReducer);