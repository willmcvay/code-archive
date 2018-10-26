// @flow
import * as React from 'react'
import type { AppState } from '../core/types'

type Props = AppState

const PinPadScreen: React.StatelessFunctionalComponent<Props> = props => (
  <div className="dots">
    {props.displayText.map((text, index) => (
      <div className="dot" key={index}>
        {text}
      </div>
    ))}
  </div>
)

export default PinPadScreen
