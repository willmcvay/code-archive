// @flow
import * as React from 'react'
import type { AppState } from '../core/types'
import * as pinConstants from '../constants/pin-constants'

type Props = AppState

const PinPadScreen: React.StatelessFunctionalComponent<Props> = props => {
  return (
    <div className="dots">
      <div className="dot">{props.currentPin[0] || '*'}</div>
      <div className="dot">{props.currentPin[1] || '*'}</div>
      <div className="dot">{props.currentPin[2] || '*'}</div>
      <div className="dot">{props.currentPin[3] || '*'}</div>
    </div>
  )
}

export default PinPadScreen
