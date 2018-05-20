// @flow
import React from 'react'
import { render } from 'react-dom'
import { css } from './styles/app.scss'
import App from './core/app'

const container = document.getElementById('app-container')
if (container) {
  render(<App />, container)
}
