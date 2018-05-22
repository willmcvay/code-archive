import React from 'react'
import { shallow } from 'enzyme'
import PinButton from '../../src/components/pin-button'

const defaultProps = {
  value: 1,
  numberTapped: jest.fn()
}

describe('PinButton', () => {
  it('should match a DOM snapshot', () => {
    expect(shallow(<PinButton {...defaultProps} />)).toMatchSnapshot()
  })

  it('should respond correctly to being clicked', () => {
    const component = shallow(<PinButton {...defaultProps} />)
    component
      .find('.number')
      .first()
      .simulate('click')

    expect(defaultProps.numberTapped).toHaveBeenCalledTimes(1)
  })
})
