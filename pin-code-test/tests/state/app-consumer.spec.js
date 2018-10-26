import React from 'react'
import { shallow } from 'enzyme'
import AppConsumer from '../../src/state/app-consumer'
import AppPage from '../../src/pages/app-page'

describe('AppConsumer', () => {
  it('should match a DOM snapshot', () => {
    expect(
      shallow(
        <AppConsumer>
          <AppPage />
        </AppConsumer>
      )
    ).toMatchSnapshot()
  })
})
