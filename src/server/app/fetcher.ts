import actionMap from '../actions/actionMap';

const getActionKeys = (renderProps: any) => {
  return renderProps.components.map((component: any) => {
    return [].concat(component.actionKeys() || []);
  });
};

export default (renderProps: any) => {
  return getActionKeys(renderProps).map((key: string) => {
    console.log('here I am', actionMap[key]);
    return actionMap[key]();
  });
};
