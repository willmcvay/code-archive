// @flow
import * as React from 'react'
import { AppContext } from './app-provider'
import type { AppActions, AppState, AppStore } from '../core/types'

type Props = {
  children?: React.Node
}

const AppConsumer: React.StatelessFunctionalComponent<Props> = props => (
  <AppContext.Consumer>
    {context =>
      React.Children.map(props.children, child =>
        React.cloneElement(child, {
          ...context
        })
      )
    }
  </AppContext.Consumer>
)

export default AppConsumer
