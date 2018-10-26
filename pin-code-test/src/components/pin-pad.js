// @flow
import * as React from 'react'
import type { AppStore } from '../core/types'
import { KEYPAD_NUMBERS } from '../constants/pin-constants'
import PinButton from './pin-button'
import PinPadScreen from './pin-pad-screen'

const PinPad: React.StatelessFunctionalComponent<AppStore> = props => (
  <div className="pin-pad">
    <PinPadScreen {...props.state} />
    <div className="numbers">
      {KEYPAD_NUMBERS.map(value => (
        <PinButton key={value} value={value} {...props.actions} />
      ))}
    </div>
  </div>
)

export default PinPad
