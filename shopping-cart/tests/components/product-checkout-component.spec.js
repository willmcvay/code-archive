import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { ProductCheckoutComponent } from '../../src/components/product-checkout-component'
import Button from 'muicss/lib/react/button'

const defaultProps = {
  sku: 1,
  name: 'Name',
  description: 'Description',
  price: 1,
	basketState: {
    skus: [1]
  },
	removeFromBasket: sinon.fake()
}

describe('ProductCheckoutComponent', () => {
	it('should match a correct DOM snapshot', () => {
		const component = shallow(<ProductCheckoutComponent {...defaultProps} />)
		expect(component).to.matchSnapshot()
	})

	it('should respond to a remove from basket click by passing the correct sku', () => {
		const component = shallow(<ProductCheckoutComponent {...defaultProps} />)
		component.find(Button).first().simulate('click')
		expect(defaultProps.removeFromBasket.calledOnce).to.equal(true)
		expect(defaultProps.removeFromBasket.calledWith(1)).to.equal(true)
	})
})
