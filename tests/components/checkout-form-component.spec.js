import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { CheckoutFormComponent, paymentPayload } from '../../src/components/checkout-form-component'
import { initialState as initialBasketState } from '../../src/reducers/basket-reducer'
import { initialState as initialCardState } from '../../src/reducers/card-reducer'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'

const defaultProps = {
	basketState: initialBasketState,
	cardState: initialCardState,
	updateCardNumber: sinon.fake(),
	submitPayment: sinon.fake()
}

const event = {
	target: {
		value: 'CARD_NUMBER'
	},
	preventDefault: () => null
}

describe('CheckoutFormComponent', () => {
	it('should match a correct DOM snapshot', () => {
		const component = shallow(<CheckoutFormComponent {...defaultProps} />)
		expect(component).to.matchSnapshot()
	})

	it('should respond to a checkout button click and submit a payment', () => {
		const component = shallow(<CheckoutFormComponent {...defaultProps} />)
		component.find(Button).first().simulate('click', event)

		expect(defaultProps.submitPayment.calledOnce).to.equal(true)
		expect(
			defaultProps.submitPayment.calledWith({
				basket: [],
				cardNumber: ''
			})
		).to.equal(true)
	})

	it('should respond to an input change event and update the form value', () => {
		const component = shallow(<CheckoutFormComponent {...defaultProps} />)
		component.find(Input).first().simulate('change', event)

		expect(defaultProps.updateCardNumber.calledOnce).to.equal(true)
		expect(defaultProps.updateCardNumber.calledWith(event.target.value)).to.equal(true)
	})

	it('should correctly serialize a payload', () => {
		const basketState = {
			skus: [ 1, 5, 1, 2, 5, 5 ]
		}
		const expected = {
			cardNumber: event.target.value,
			basket: [
				{
					sku: 1,
					quantity: 2
				},
				{
					sku: 5,
					quantity: 3
				},
				{
					sku: 2,
					quantity: 1
				}
			]
		}

		expect(paymentPayload(basketState, event.target.value)).to.deep.equal(expected)
	})
})
