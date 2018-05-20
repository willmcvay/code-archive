import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { CheckoutFailurePage } from '../../src/pages/checkout-failure-page'
import { initialState } from '../../src/reducers/card-reducer'
import Button from 'muicss/lib/react/button'

const defaultProps = {
  cardState: initialState,
  redirect: sinon.fake()
}

describe('CheckoutFailurePage', () => {
  it('should match a correct DOM snapshot', () => {
    const component = shallow(<CheckoutFailurePage {...defaultProps} />)
    expect(component).to.matchSnapshot()
  })

  it('should respond to a return to checkout button click', () => {
    const component = shallow(<CheckoutFailurePage {...defaultProps} />)
    component.find(Button).first().simulate('click')
    expect(defaultProps.redirect.calledOnce).to.equal(true)
    expect(defaultProps.redirect.calledWith({
      type: 'CHECKOUT_PAGE'
    })).to.equal(true)
  })
})