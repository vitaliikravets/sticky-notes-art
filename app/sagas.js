
import { useInjectSaga } from './utils/injectSaga';
import createSagaMiddleware from 'redux-saga';

import generatorPageSaga from './containers/GeneratorPage/saga';

export default function createSaga(){
  const reduxSagaMonitorOptions = {};

  useInjectSaga({ 'GeneratorPage', generatorPageSaga });

  return createSagaMiddleware(reduxSagaMonitorOptions);
};
