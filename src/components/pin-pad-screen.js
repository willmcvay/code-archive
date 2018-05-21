// @flow
import * as React from 'react'
import type { AppState } from '../core/types'
import * as pinConstants from '../constants/pin-constants'

type Props = AppState

const PinPadScreen: React.StatelessFunctionalComponent<Props> = props => (
  <div className="dots">
    {props.displayText.map(text => <div className="dot">{text}</div>)}
  </div>
)

export default PinPadScreen
