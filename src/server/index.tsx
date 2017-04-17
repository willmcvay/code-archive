import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import template from './app/template';
import fetcher from './app/fetcher';
import routes from '../shared/routes/routes';

export default (req: any, res: any, next: any) => {
  match({
    routes: routes(),
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, `${redirectLocation.pathname}${redirectLocation.search}`);
    }

    if (err) {
      next(err);
      return res.send(500, err.message);
    }

    if (!renderProps) {
      return res.status(404).send('This is not the page you\'re looking for... move along...');
    }

    const appData: any = fetcher(renderProps);
    const bundlePath = process.env.NODE_ENV === 'production' ?
      '/client.js' :
      'http://localhost:4444/client.js';

    Promise.all(appData)
      .then((responses: any) => {
        const markup = ReactDomServer.renderToString(<RouterContext {...renderProps} />);
        const filteredData = responses.filter((response: any) => response.status < 400);
        const mappedData = filteredData.map((response: any) => response.data);
        console.log('Rendering page on server, appData: ', mappedData);
        return res.send(template(markup, bundlePath, JSON.stringify(mappedData)));
      })
      .catch((error) => {
        console.error(`Failed to fetch appData: ${error}`);
        return res.send(template(ReactDomServer.renderToString(<div>Oops, something went wrong...</div>)));
      });
  });
};
