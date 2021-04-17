import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BookListPage from '@src/pages/BookListPage';
import CardListPage from '@src/pages/CardListPage';
import BorrowListPage from '@src/pages/BorrowListPage';
import SideNav from './components/SideNav';

const App = () => {
  return (
    <BrowserRouter>
      <Route component={SideNav}/>
      <div
        style={{
          width: 'calc(100% - 240px)',
          marginLeft: 240,
          minHeight: '100vh',
          backgroundColor: 'rgb(245, 248, 249)'
        }}>
        <Switch>
          <Route path="/books" component={BookListPage}/>
          <Route path="/cards" component={CardListPage}/>
          <Route path="/borrow" component={BorrowListPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
