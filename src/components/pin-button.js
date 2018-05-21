// @flow
import * as React from 'react'
import type { AppActions } from '../core/types'
import * as pinConstants from '../constants/pin-constants'

type Props = AppActions & {
  value: number
}

const PinButton: React.StatelessFunctionalComponent<Props> = props => (
  <div className="number" onClick={() => props.numberTapped(props.value)}>
    {props.value}
  </div>
)

export default PinButton
