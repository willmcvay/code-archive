// @flow
import { Dispatch } from 'react-redux'
import type ProductState from '../reducers/product-reducer'
import type BasketState from '../reducers/basket-reducer'
import type CardState from '../reducers/card-reducer'

export type AppAction = {
  type: string,
  data: any
};

export type AppState = {
  location: any,
  Page: string,
  ProductState: ProductState,
  BasketState: BasketState,
  CardState: CardState
};

export type AsyncParams = {
  url: string,
  body: any,
  success: string,
  failure: string,
  dispatch: Dispatch,
  shouldRedirect: boolean
};
