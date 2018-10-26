// @flow
import * as actionTypes from '../constants/action-types'
import type { AppAction } from '../core/types'

export type PaymentError = {
  field: string,
  msg: string
};

export type CardState = {
  cardNumber: string,
  paymentErrors: PaymentError[]
};

export const initialState: CardState = {
  cardNumber: '',
  paymentErrors: []
}

const CardReducer = (
  state: CardState = initialState,
  action: AppAction
): CardState => {
  const { type, data } = action

  switch (type) {
    case actionTypes.UPDATE_CARD_NUMBER:
      return {
        ...state,
        cardNumber: data
      }
    case actionTypes.CHECKOUT_FAILURE_PAGE:
      return {
        ...state,
        paymentErrors: (data && data.errors) || []
      }
    default:
      return state
  }
}

export default CardReducer
