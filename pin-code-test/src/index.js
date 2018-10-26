// @flow
import React from 'react'
import { render } from 'react-dom'
import { css } from './styles/app.scss'
import AppPage from './pages/app-page'
import AppProvider from './state/app-provider'
import AppConsumer from './state/app-consumer'

const container = document.getElementById('app-container')
if (container) {
  render(
    <AppProvider>
      <AppConsumer>
        <AppPage />
      </AppConsumer>
    </AppProvider>,
    container
  )
}
