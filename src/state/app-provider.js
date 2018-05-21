// @flow
import * as React from 'react'
import { DEFAULT_STATE } from '../constants/state'
import { MAX_ATTEMPTS, LOCKED_TIME } from '../constants/pin-constants'
import type { AppActions, AppState } from '../core/types'
import {
  getCurrentPin,
  getDisplayText,
  getIsDisabled,
  getNumberAttempts
} from './state-utils'

export const AppContext = React.createContext(DEFAULT_STATE)

type Props = {
  children?: React.Node
}

class AppProvider extends React.Component<Props, AppState> {
  state = DEFAULT_STATE
  lockedTimer: ?any

  componentDidUpdate() {
    if (getIsDisabled(this.state) && !this.lockedTimer) {
      this.lockedTimer = setTimeout(() => {
        this.setState(DEFAULT_STATE)
      }, LOCKED_TIME)
    }
  }

  numberTapped = (numberTapped: number) => {
    if (!getIsDisabled(this.state)) {
      this.setState({
        currentPin: getCurrentPin(this.state, numberTapped),
        displayText: getDisplayText(this.state, numberTapped),
        numberAttempts: getNumberAttempts(this.state, numberTapped)
      })
    }
  }

  get actions(): AppActions {
    return {
      numberTapped: this.numberTapped
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          actions: {
            ...this.actions
          },
          state: {
            ...this.state
          }
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider
