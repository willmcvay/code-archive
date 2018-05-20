// @flow
import * as React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from 'muicss/lib/react/button'
import type { BasketState } from '../reducers/basket-reducer'
import type { Product } from '../reducers/product-reducer'

type Props = Product & {
  removeFromBasket: (sku: number) => void,
  basketState: BasketState
};

export const ProductCheckoutComponent: React.StatelessFunctionalComponent<
  Props
> = (props: Props) => {
  const {
    name,
    price,
    sku,
    removeFromBasket,
    basketState: { skus }
  } = props
  const count = skus.filter(s => s === sku).length
  return count ? (
    <Panel>
      <Row>
        <Col md="3" className="mui--text-body2">
          {name}
        </Col>
        <Col md="3" className="mui--text-body2">
          {count}
        </Col>
				<Col md="3" className="mui--text-body2">
          {`£${(price * count).toFixed(2)}`}
        </Col>
        <Col md="3">
          <Button onClick={() => removeFromBasket(sku)} color="primary">
            Remove
          </Button>
        </Col>
      </Row>
    </Panel>
  ) : null
}

export default ProductCheckoutComponent
