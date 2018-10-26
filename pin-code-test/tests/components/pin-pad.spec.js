import React from 'react'
import { shallow } from 'enzyme'
import PinPad from '../../src/components/pin-pad'

const defaultProps = {
  state: {
    currentPin: [1],
    displayText: [1, '*', '*', '*'],
    numberAttempts: 1
  },
  actions: {
    numberTapped: jest.fn()
  }
}

describe('PinPad', () => {
  it('should match a DOM snapshot', () => {
    expect(shallow(<PinPad {...defaultProps} />)).toMatchSnapshot()
  })
})
