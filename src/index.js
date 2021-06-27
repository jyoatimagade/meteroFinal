import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import AppNavigation from './_navigation/AppNavigation';
import reducers from './_stores/_reducers/'
import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk'; //Thunk middleware for Redux
import { Provider } from 'react-redux';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
      applyMiddleware(apiMiddleware, thunk)
  )
);


ReactDOM.render(
 <Provider store={store}>
   <BrowserRouter>
      <AppNavigation />
   </BrowserRouter>
   
 </Provider>, 
  document.getElementById('root')
);


