import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import App from './app'

//rendering <App> component to 'app' in our index.html
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,
  document.getElementById('app')
)
