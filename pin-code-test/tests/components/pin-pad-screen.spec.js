import React from 'react'
import { shallow } from 'enzyme'
import PinPadScreen from '../../src/components/pin-pad-screen'

const defaultProps = {
  currentPin: [1],
  displayText: [1, '*', '*', '*'],
  numberAttempts: 1
}

describe('PinPadScreen', () => {
  it('should match a DOM snapshot', () => {
    expect(shallow(<PinPadScreen {...defaultProps} />)).toMatchSnapshot()
  })
})
