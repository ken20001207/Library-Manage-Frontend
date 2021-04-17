import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import 'rsuite/lib/styles/index.less';

const ele = document.getElementById('ipl-progress-indicator');
if (ele) {
  setTimeout(() => {
    ele.classList.add('available');
    setTimeout(() => {
      ele.outerHTML = '';
    }, 500);
  }, 1000);
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
