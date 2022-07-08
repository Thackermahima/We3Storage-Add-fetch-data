import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = "vrjgOjrbwpOQxJYqpOiQUvgkJLSCLXROO2XnhcIg";
const serverUrl = "https://ar6tewkfl2sx.usemoralis.com:2053/server";
root.render(
  <BrowserRouter>

  <React.StrictMode>
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <App />
 </MoralisProvider>
  </React.StrictMode>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
