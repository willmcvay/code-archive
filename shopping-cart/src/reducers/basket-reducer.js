// @flow
import * as actionTypes from '../constants/action-types'
import type { AppAction } from '../core/types'

export type BasketState = {
  skus: number[]
};

export const initialState: BasketState = {
  skus: []
}

const BasketReducer = (
  state: BasketState = initialState,
  action: AppAction
): BasketState => {
  const { type, data } = action
  switch (type) {
    case actionTypes.ADD_TO_BASKET:
      return {
        ...state,
        skus: [...state.skus, data]
      }
    case actionTypes.REMOVE_FROM_BASKET:
      return {
        ...state,
        skus: state.skus.filter(sku => sku !== data)
      }
    default:
      return state
  }
}

export default BasketReducer
