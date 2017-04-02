// import * as express from 'express';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import template from './app/template';
import routes from '../shared/routes/routes';

// const router = express.Router();

export default (req: any, res: any, next: any) => {
  // router.use( ( req: any, res: any, next: any ) => {
  console.log('hereIam', req.url)
  match({
    routes: routes(),
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    console.log('hereIam')
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

    // const appData: any = fetcher( renderProps );
    // const appData = {};
    const bundlePath = process.env.NODE_ENV === 'production' ?
      '/public/client.js' :
      'http://localhost:4444/client.js';

    // Promise.all( appData )
    //   .then( ( responses: any ) => {
    const markup = ReactDomServer.renderToString(<RouterContext {...renderProps} />);
    console.log('Rendering page on server');
    // return res.send( template( markup, bundlePath, JSON.stringify( responses ) ) );
    console.log(markup, 'HEREIAM')
    return res.send(template(markup, bundlePath, JSON.stringify({data: 'hi there'})));
    // })
    // .catch( ( error ) => {
    //   console.error( `Failed to fetch appData: ${error}` );
    //   return res.send( template( ReactDomServer.renderToString(<div>Oops, something went wrong...</div> ) ) );
    // });
  });
  // });
  // return router;
};
