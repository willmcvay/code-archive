// @flow
import * as React from 'react'
import type { AppStore } from '../core/types'
import * as pinConstants from '../constants/pin-constants'
import PinButton from './pin-button'
import PinPadScreen from './pin-pad-screen'

const PinPad: React.StatelessFunctionalComponent<AppStore> = props => (
  <div className="pin-pad">
    <PinPadScreen {...props.state} />
    <div className="numbers">
      {pinConstants.KEYPAD_NUMBERS.map(value => (
        <PinButton value={value} {...props.actions} />
      ))}
    </div>
  </div>
)

export default PinPad
