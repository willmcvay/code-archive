import * as React from 'react'
import { Route, Switch } from 'react-router'
import App from '../../client/components/App'

export default (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/'>
        <App />
      </Route>
      <Route exact path='/match' >
        <App />
      </Route>
    </Switch>
  )
}
