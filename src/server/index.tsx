import * as React from 'react'
import * as ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import template from './app/template'
import fetcher from './app/fetcher'
import routes from '../shared/routes/routes'
import App from '../client/components/App'

export default (req: any, res: any, next: any) => {
  const route = routes().props.children.find((route: any) => route.props.path === req.url)

  if (!route) {
    return res.status(404).send('This is not the page you\'re looking for... move along...')
  }

  const appData: any = fetcher(route.props.children)
  const bundlePath = process.env.NODE_ENV === 'production' ?
    '/client.js' :
    'http://localhost:8000/client.js'

  Promise.all(appData).then((responses: any) => {
    const markup = ReactDomServer.renderToString(
      <StaticRouter context={{}} location={req.url}>
        <App />
      </StaticRouter>
    )
    const filteredData = responses.filter((response: any) => response.status < 400)
    const mappedData = filteredData.map((response: any) => response.data)
    console.log('Rendering page on server, appData: ', mappedData)
    return res.send(template(markup, bundlePath, JSON.stringify(mappedData)))
  })
  .catch((error: Error) => {
    console.error(`Failed to fetch appData: ${error}`)
    return res.send(template(ReactDomServer.renderToString(<div>Oops, something went wrong...</div>)))
  })
}
