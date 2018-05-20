import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { ProductsPage } from '../../src/pages/products-page'
import { initialState as initialProductState } from '../../src/reducers/product-reducer'
import { initialState as initialBasketState } from '../../src/reducers/basket-reducer'
import Button from 'muicss/lib/react/button'

const defaultProps = {
  productState: initialProductState,
  basketState: initialBasketState,
  addToBasket: sinon.fake(),
  redirect: sinon.fake()
}

describe('ProductsPage', () => {
  it('should match a correct DOM snapshot', () => {
    const component = shallow(<ProductsPage {...defaultProps} />)
    expect(component).to.matchSnapshot()
  })

  it('should not render a button if no products', () => {
    const component = shallow(<ProductsPage {...defaultProps} />)
    expect(component.find(Button).length).to.equal(0)
  })

  it('should respond to a proceed checkout click', () => {
    defaultProps.basketState.skus.push(1)
    const component = shallow(<ProductsPage {...defaultProps} />)
    component.find(Button).first().simulate('click')

    expect(defaultProps.redirect.calledOnce).to.equal(true)
    expect(defaultProps.redirect.calledWith({
      type: 'CHECKOUT_PAGE'
    })).to.equal(true)
  })
})