import * as React from 'react';
import { Route } from 'react-router';
import App from '../../client/components/App';

export default (): JSX.Element => {
  return (
    <Route path='/' component={ App }>

    </Route>
  );
};
