import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { ProductComponent } from '../../src/components/product-component'
import Button from 'muicss/lib/react/button'

const defaultProps = {
  sku: 1,
  name: 'Name',
  description: 'Description',
  price: 1,
	addToBasket: sinon.fake()
}


describe('ProductComponent', () => {
  it('should match a correct DOM snapshot', () => {
    const component = shallow(<ProductComponent {...defaultProps} />)
    expect(component).to.matchSnapshot()
  })

  it('should respond to an add to basket click', () => {
    const component = shallow(<ProductComponent {...defaultProps} />)
    component.find(Button).first().simulate('click')
    expect(defaultProps.addToBasket.calledOnce).to.equal(true)
    expect(defaultProps.addToBasket.calledWith(1)).to.equal(true)
  })
})