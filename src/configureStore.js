import {applyMiddleware,createStore} from 'redux';
import rootReducer from './reducers/store';
import thunkMiddleware from 'redux-thunk';


export default function configureStore(preloadedState){

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );
}
