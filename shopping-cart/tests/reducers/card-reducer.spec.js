import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as actionTypes from '../../src/constants/action-types'
import CardReducer from '../../src/reducers/card-reducer'

describe('CardReducer', () => {
	it('should update the number in the card state', () => {
		const action = {
			type: actionTypes.UPDATE_CARD_NUMBER,
			data: 'SomeCardNumber'
		}
		const newState = CardReducer(undefined, action)

		expect(newState.cardNumber).to.equal(action.data)
	})

	it('should set payment errors on the card state', () => {
		const action = {
			type: actionTypes.CHECKOUT_FAILURE_PAGE,
			data: {
				errors: [
					{
						field: 'cardError',
						msg: 'card invalid'
					}
				]
			}
		}
		const newState = CardReducer(undefined, action)

		expect(newState.paymentErrors).to.equal(action.data.errors)
	})
})
