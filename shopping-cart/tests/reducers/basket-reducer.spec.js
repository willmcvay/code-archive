import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as actionTypes from '../../src/constants/action-types'
import BasketReducer from '../../src/reducers/basket-reducer'

describe('BasketReducer', () => {
  it('should add an item to the basket state', () => {
    const action = {
      type: actionTypes.ADD_TO_BASKET,
      data: 1
    }
    const newState = BasketReducer(undefined, action)

    expect(newState.skus[0]).to.equal(action.data)
  })

  it('should remove an item from the basket state', () => {
    const action = {
      type: actionTypes.REMOVE_FROM_BASKET,
      data: 1
    }
    const state = {
      skus: [1,1]
    }
    const newState = BasketReducer(state, action)

    expect(newState.skus).to.deep.equal([])
  })
})