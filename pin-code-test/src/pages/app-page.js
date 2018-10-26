// @flow
import * as React from 'react'
import { hot } from 'react-hot-loader'
import PinPad from '../components/pin-pad'
import type { AppStore } from '../core/types'

const AppPage: React.StatelessFunctionalComponent<AppStore> = props => (
  <PinPad {...props} />
)

export default hot(module)(AppPage)
