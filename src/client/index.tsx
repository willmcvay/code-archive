import { browserHistory, Router } from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import routes from '../shared/routes/routes';
import MatchesUpcomingReducer from './reducers/MatchesUpcomingReducer';

const middleware = [ReduxThunk, routerMiddleware(browserHistory)];
const reducers = combineReducers({
  MatchesUpcomingState: MatchesUpcomingReducer,
  routing: routerReducer
});
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(
  applyMiddleware(...middleware)
));

// export const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {routes()}
    </Router>
  </Provider>,
  document.getElementById('container') as Element
);