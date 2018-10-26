import * as React from 'react'
import { Route, Switch } from 'react-router'
import { MatchesUpcoming } from '../../client/components/MatchesUpcoming'
import { routes } from './routes'

export const Router = () => (
  <Switch>
    <Route exact path={routes.DEFAULT}>
      <MatchesUpcoming />
    </Route>
    <Route exact path={routes.MATCHES_UPCOMING} >
      <MatchesUpcoming />
    </Route>
  </Switch>
)
