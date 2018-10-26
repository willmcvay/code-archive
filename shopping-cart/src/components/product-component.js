// @flow
import * as React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from 'muicss/lib/react/button'
import type { Product } from '../reducers/product-reducer'

type Props = Product & {
  addToBasket: (sku: number) => void
};

export const ProductComponent: React.StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { name, price, sku, addToBasket } = props
  return (
    <Panel>
      <Row>
        <Col md="4" className="mui--text-body2">
          {name}
        </Col>
        <Col md="4" className="mui--text-body2">{`£${price}`}</Col>
        <Col md="4">
          <Button onClick={() => addToBasket(sku)} color="primary">
            Add to basket
          </Button>
        </Col>
      </Row>
    </Panel>
  )
}

export default ProductComponent
