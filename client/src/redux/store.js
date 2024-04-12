import { createStore, applyMiddleware  , combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertsReducer';
import { laptopsReducer } from './reducers/laptopsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
   laptopsReducer,
   alertsReducer,
   bookingsReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
   
  )
);

export default store