import React from 'react'
import { mount } from 'enzyme'
import ChildComponent from '../../src/components/child-component'

describe('ChildComponent', () => {
  it('should render a component', () => {
    const component = mount(<ChildComponent />)
    expect(
      component
        .find('div')
        .first()
        .text()
    ).toContain('I Am A Child')
  })
})
