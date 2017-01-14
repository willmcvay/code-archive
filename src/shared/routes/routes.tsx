'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IndexRoute, Route } from 'react-router';
import App from '../../client/components/App';

export default (): JSX.Element => {
  return (
    <Route path="/" component={ App }>

    </Route>
  );
};
