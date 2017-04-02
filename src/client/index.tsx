import { Router, IndexRoute, Route, /* browserHistory */ } from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import ReduxThunk from 'redux-thunk';
import App from './components/App';
// import { routerMiddleware } from "react-router-redux";
// import { compose } from "redux";
// import { createStore } from "redux";
// import { combineReducers } from "redux";
// import { applyMiddleware } from "redux";

// const middlewares = [ReduxThunk, routerMiddleware(browserHistory)];
// const reducers = combineReducers({});
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(reducers, composeEnhancers(
//   applyMiddleware(...middlewares)
// ));
  // <Provider store={store}>
// </Provider>
ReactDOM.render(

    <Router>
      <Route path='/' component={App}>
        <IndexRoute />
        <Route path='/app' />
      </Route>
    </Router>
  ,
  document.getElementById( 'container' ) as Element
);