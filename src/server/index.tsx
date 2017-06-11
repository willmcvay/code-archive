import * as React from 'react'
import * as ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { template } from './app/template'
import { initialState } from './app/initialState'
import { Router } from '../shared/routes/router'
import { setUpDb } from './app/database'
import { matchRoute } from '../shared/routes/routes'
import { Provider } from 'react-redux'

export default (req: any, res: any, next: any) => {

  if (!matchRoute(req.url)) {
    return res.status(404).send(template(ReactDomServer.renderToString(<div>Route not found...</div>)))
  }

  setUpDb()

  initialState(req.url).then((store: any) => {
    const markup = ReactDomServer.renderToString(
      <Provider store={store}>
        <StaticRouter context={{}} location={req.url}>
          <Router />
        </StaticRouter>
      </Provider>
    )
    console.log('Rendering page on server, initialState: ', store.getState())
    return res.send(template(markup, JSON.stringify(store.getState())))
  })
  .catch((error: Error) => {
    console.error(`Failed to fetch initialState: ${error}`)
    return res.send(template(ReactDomServer.renderToString(<div>Oops, something went wrong...</div>)))
  })
}
