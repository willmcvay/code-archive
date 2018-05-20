// @flow
import * as actionTypes from '../constants/action-types'

export const addToBasket = (data: number) => {
  return { type: actionTypes.ADD_TO_BASKET, data }
}

export const removeFromBasket = (data: number) => {
  return { type: actionTypes.REMOVE_FROM_BASKET, data }
}
