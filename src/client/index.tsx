import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { routerReducer, ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Router } from '../shared/routes/router'
import { MatchesUpcomingReducer } from '../../src/client/reducers/MatchesUpcomingReducer'

const history = createHistory()
const middleware = [ReduxThunk, routerMiddleware(history)]
const reducers = combineReducers({
  MatchesUpcomingState: MatchesUpcomingReducer,
  routing: routerReducer
})
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(
  applyMiddleware(...middleware)
))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container') as Element
)
