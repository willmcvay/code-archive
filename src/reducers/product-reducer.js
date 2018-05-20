// @flow
import * as actionTypes from '../constants/action-types'
import type { AppAction } from '../core/types'

export type Product = {
  sku: number,
  name: string,
  description: string,
  price: number
};

export type ProductState = {
  products: Product[],
  isFetching: boolean
};

export const initialState: ProductState = {
  products: [],
  isFetching: false
}

const ProductReducer = (
  state: ProductState = initialState,
  action: AppAction
): ProductState => {
  const { type, data } = action
  switch (type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.RECEIVE_PRODUCTS:
      return {
        ...state,
        isFetching: false,
        products: data
      }
    default:
      return state
  }
}

export default ProductReducer
