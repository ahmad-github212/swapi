import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { BrowserRouter } from 'react-router-dom';
import {DataProvider} from './context' ;
ReactDOM.render(
  <DataProvider>
    <BrowserRouter>
      <App/>
    
  </BrowserRouter>
  </DataProvider>
  
    
    ,
 
  document.getElementById('root')
);


