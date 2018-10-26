// @flow
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import type { AppState } from '../core/types'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from 'muicss/lib/react/button'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import type { Product } from '../reducers/product-reducer'
import type { BasketState } from '../reducers/basket-reducer'
import type { CardState } from '../reducers/card-reducer'
import { updateCardNumber, submitPayment } from '../actions/card-actions'

type BasketItem = {
  sku: number,
  quantity: number
};

export type PaymentPayload = {
  basket: BasketItem[],
  cardNumber: string
};

type Props = Product & {
  updateCardNumber: (cardNumber: string) => void,
  submitPayment: (payload: PaymentPayload) => void,
  cardState: CardState,
  basketState: BasketState
};

const mapStateToProps = (state: AppState) => ({
  basketState: state.BasketState,
  cardState: state.CardState
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateCardNumber: (cardNumber: string) =>
    dispatch(updateCardNumber(cardNumber)),
  submitPayment: (paymentPayload: PaymentPayload) =>
    dispatch(submitPayment(paymentPayload))
})

export const paymentPayload = (
  basketState: BasketState,
  cardNumber: string
): PaymentPayload => ({
  cardNumber,
  basket: basketState.skus.reduce((basket: BasketItem[], sku: number) => {
    const basketItem = basket.find(item => item.sku === sku)
    if (!basketItem) {
      basket.push({
        sku,
        quantity: 1
      })
      return basket
    }
    basketItem.quantity++
    return basket
  }, [])
})

export const CheckoutFormComponent: React.StatelessFunctionalComponent<
  Props
> = (props: Props) => {
  const { cardState, submitPayment, updateCardNumber, basketState } = props
  return (
    <Panel>
      <Row>
        <Col md="12">
          <Form>
            <Input
              type="text"
              value={cardState.cardNumber}
              onChange={e => updateCardNumber(e.target.value)}
              placeholder="Card Number"
            />
            <Button
              onClick={e => {
                e.preventDefault()
                submitPayment(
                  paymentPayload(basketState, cardState.cardNumber)
                )
              }}
              color="primary"
            >
              Checkout
            </Button>
          </Form>
        </Col>
      </Row>
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutFormComponent
)
