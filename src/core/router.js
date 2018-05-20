// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/product-actions'
import * as componentsPages from '../constants/components-pages'
import ProductsPage from '../pages/products-page'
import CheckoutPage from '../pages/checkout-page'
import CheckoutSuccessPage from '../pages/checkout-success-page'
import CheckoutFailurePage from '../pages/checkout-failure-page'
import type { AppState } from './types'

export type RouterProps = {
  page: string,
  state: any
};

export const routesMap = {
  PRODUCTS_PAGE: {
    path: '/',
    thunk: fetchProducts
  },
  CHECKOUT_PAGE: {
    path: '/checkout'
  },
  CHECKOUT_SUCCESS_PAGE: {
    path: '/checkout/success'
  },
  CHECKOUT_FAILURE_PAGE: {
    path: '/checkout/failure'
  }
}

const Components = {
  ProductsPage,
  CheckoutPage,
  CheckoutSuccessPage,
  CheckoutFailurePage
}

const Router: React.StatelessFunctionalComponent<RouterProps> = (
  props: RouterProps
) => {
  const Page = Components[props.page]
  return <Page />
}

const mapStateToProps = (state: AppState): RouterProps => ({
  page: state.Page,
  state
})

export default connect(mapStateToProps)(Router)
