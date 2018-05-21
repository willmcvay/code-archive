// @flow
import * as React from 'react'
import { DEFAULT_STATE } from '../constants/state'
import type { AppActions, AppState } from '../core/types'
import * as stateUtils from './state-utils'

export const AppContext = React.createContext(DEFAULT_STATE)

type Props = {
  children?: React.Node
}

class AppProvider extends React.Component<Props, AppState> {
  state = DEFAULT_STATE

  numberTapped = (numberTapped: number) => {
    this.setState({
      ...this.state,
      lastSelected: stateUtils.getLastSelected(this.state, numberTapped),
      currentPin: stateUtils.getCurrentPin(this.state, numberTapped)
    })
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
