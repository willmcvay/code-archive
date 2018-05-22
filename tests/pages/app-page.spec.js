import React from 'react'
import { shallow } from 'enzyme'
import AppPage from '../../src/pages/app-page'

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

describe('AppPage', () => {
  it('should match a DOM snapshot', () => {
    expect(shallow(<AppPage {...defaultProps} />)).toMatchSnapshot()
  })
})
