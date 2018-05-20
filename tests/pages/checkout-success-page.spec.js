import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { CheckoutSuccessPage } from '../../src/pages/checkout-success-page'

describe('CheckoutSuccessPage', () => {
  it('should match a correct DOM snapshot', () => {
    const component = shallow(<CheckoutSuccessPage />)
    expect(component).to.matchSnapshot()
  })
})