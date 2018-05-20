import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import { CheckoutPage, basketTotal } from '../../src/pages/checkout-page'
import { initialState as initialBasketState } from '../../src/reducers/basket-reducer'
import { initialState as initialProductState } from '../../src/reducers/product-reducer'
import Button from 'muicss/lib/react/button'

const defaultProps = {
	productState: initialProductState,
	basketState: initialBasketState,
	removeFromBasket: sinon.fake()
}

describe('CheckoutPage', () => {
	it('should match a correct DOM snapshot', () => {
		const component = shallow(<CheckoutPage {...defaultProps} />)
		expect(component).to.matchSnapshot()
	})

	it('should calculate a basket total', () => {
		const basketState = {
			skus: [ 1, 3, 3 ]
		}

		const productState = {
			products: [
				{
					sku: 1,
					price: 1.23
				},
				{
					sku: 3,
					price: 3.33
				}
			]
		}

		expect(basketTotal(basketState, productState)).to.deep.equal(
			productState.products[0].price + (productState.products[1].price * 2)
		)
	})
})
