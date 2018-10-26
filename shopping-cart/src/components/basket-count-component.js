// @flow
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { redirect, RouteAction } from 'redux-first-router'
import type { AppState } from '../core/types'
import type { BasketState } from '../reducers/basket-reducer'
import Panel from 'muicss/lib/react/panel'
import { addToBasket } from '../actions/basket-actions'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from 'muicss/lib/react/button'

type Props = {
  basketState: BasketState,
  page: string,
  redirect: (to: RouteAction) => void
};

const mapStateToProps = (state: AppState) => ({
  basketState: state.BasketState,
  page: state.Page
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  redirect: (to: RouteAction) => dispatch(redirect(to))
})

export const BasketCountComponent: React.StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  return (
    <Panel>
      <Row>
        <Col md="2">
          {props.page === 'CheckoutPage' && (
            <Button
              onClick={() => props.redirect({ type: 'PRODUCTS_PAGE' })}
              color="accent"
            >
              Continue Shopping
            </Button>
          )}
        </Col>
        <Col md="8" />
        <Col md="1" className="mui--text-title">
          Basket
        </Col>
        <Col md="1" className="mui--text-title">
          {props.basketState.skus.length}
        </Col>
      </Row>
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  BasketCountComponent
)
