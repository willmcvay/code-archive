// @flow
import React from 'react'
import { render } from 'react-dom'
import { css } from './styles/app.scss'
import AppPage from './pages/app-page'

const container = document.getElementById('app-container')
if (container) {
  render(<AppPage />, container)
}
