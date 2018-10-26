import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as actionTypes from '../../src/constants/action-types'
import ProductReducer from '../../src/reducers/product-reducer'

describe('ProductReducer', () => {
	it('should update fetching status', () => {
		const action = {
			type: actionTypes.FETCH_PRODUCTS
		}
		const newState = ProductReducer(undefined, action)

		expect(newState.isFetching).to.equal(true)
	})

	it('should receive a list of products', () => {
		const action = {
			type: actionTypes.RECEIVE_PRODUCTS,
			data: [
				{
					sku: 1,
					name: 'Name',
					description: 'Description',
					price: 1
				}
			]
		}
		const newState = ProductReducer(undefined, action)

		expect(newState.products).to.deep.equal(action.data)
		expect(newState.isFetching).to.equal(false)
	})
})
