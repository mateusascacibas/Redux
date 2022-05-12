import React from 'react';
import RoutesFunction from './routes';
import { Router } from 'react-router-dom';
import history from './services/history';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './store'


export default function App() {
 return (
   <Provider store={store}>
   <Router history = {history}>
   <Header/>
    <RoutesFunction/>
   </Router>
   </Provider>
  );
}
