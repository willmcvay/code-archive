import { actionMap } from '../actions/actionMap'
import { createStore, combineReducers /*, applyMiddleware */} from 'redux'
import { MatchesUpcomingReducer } from '../../client/reducers/MatchesUpcomingReducer'
// import ReduxThunk from 'redux-thunk'

export const initialState = (route: string) => {

  // const middleware = [ReduxThunk]
  // const reducers = combineReducers({
  //   MatchesUpcomingState: MatchesUpcomingReducer
  // })
  // const store = createStore(reducers,
  //   applyMiddleware(...middleware)
  // )

  return Promise.all(actionMap[route]())
    .then((responses: any) => {
      console.log('responses are', responses)
      return createStore(combineReducers({
        MatchesUpcomingState: MatchesUpcomingReducer
      }), responses[0])
    })
}
