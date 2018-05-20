// @flow
import * as actionTypes from '../constants/action-types'
import * as urls from '../constants/urls'
import { Dispatch } from 'react-redux'
import { post } from '../utils/fetcher'
import type { PaymentPayload } from '../components/checkout-form-component'

export const submitPayment = (body: PaymentPayload) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: actionTypes.SUBMIT_PAYMENT, data: body })

    return post({
      url: urls.CHECKOUT_URL,
      body,
      success: actionTypes.CHECKOUT_SUCCESS_PAGE,
      failure: actionTypes.CHECKOUT_FAILURE_PAGE,
      dispatch,
      shouldRedirect: true
    })
  }
}

export const updateCardNumber = (data: string) => {
  return { type: actionTypes.UPDATE_CARD_NUMBER, data }
}
