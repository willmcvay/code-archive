import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { BasketCountComponent } from '../../src/components/basket-count-component'
import { initialState } from '../../src/reducers/basket-reducer'
import Button from 'muicss/lib/react/button'

const defaultProps = {
  basketState: initialState,
  page: 'CheckoutPage',
  redirect: sinon.fake()
}

describe('BasketCountComponent', () => {
  it('should match a correct DOM snapshot', () => {
    const component = shallow(<BasketCountComponent {...defaultProps} />)
    expect(component).to.matchSnapshot()
  })

  it('should respond to a continue shopping button click', () => {
    const component = shallow(<BasketCountComponent {...defaultProps} />)
    component.find(Button).first().simulate('click')
    expect(defaultProps.redirect.calledOnce).to.equal(true)
    expect(defaultProps.redirect.calledWith({
      type: 'PRODUCTS_PAGE'
    })).to.equal(true)
  })
})