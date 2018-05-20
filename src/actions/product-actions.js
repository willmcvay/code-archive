// @flow
import * as actionTypes from '../constants/action-types'
import * as urls from '../constants/urls'
import { get } from '../utils/fetcher'
import { Dispatch } from 'react-redux'
import type { AppState } from '../core/types'

export const fetchProducts = (dispatch: Dispatch, getState: () => AppState) => {
  dispatch({ type: actionTypes.FETCH_PRODUCTS })

  return get({
    url: urls.FETCH_PRODUCTS_URL,
    body: null,
    success: actionTypes.RECEIVE_PRODUCTS,
    failure: actionTypes.FETCH_PRODUCTS_FAILED,
    dispatch,
    shouldRedirect: false
  })
}
