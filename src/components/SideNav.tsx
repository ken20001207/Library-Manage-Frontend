import React from 'react';
import { Icon, Nav, Sidenav } from 'rsuite';
import { useHistory } from 'react-router-dom';

function SideNav() {
  const history = useHistory();
  return <Sidenav
    style={{
      width: 240,
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'white'
    }}>
    <Sidenav.Header>
      <div
        style={{
          padding: 20,
          width: '100%',
          backgroundColor: '#34c3ff',
        }}>
        <h1
          style={{
            color: 'white',
            fontSize: 18, margin: 0, lineHeight: '24px'
          }}>
          图书信息管理系统
        </h1>
        <p style={{ color: 'white', fontSize: 12, opacity: 0.8, margin: 0 }}>
          By 3190106167 林沅霖
        </p>
      </div>
    </Sidenav.Header>
    <Sidenav.Body>
      <Nav>
        <Nav.Item
          active={history.location.pathname.includes('books')}
          icon={<Icon icon="book"/>}
          onClick={() => history.push('/books')}>
          图书管理
        </Nav.Item>
        <Nav.Item
          active={history.location.pathname.includes('cards')}
          icon={<Icon icon="id-card"/>}
          onClick={() => history.push('/cards')}>
          借书证管理
        </Nav.Item>
        <Nav.Item
          active={history.location.pathname.includes('borrow')}
          icon={<Icon icon="clock-o"/>}
          onClick={() => history.push('/borrow')}>
          借阅管理
        </Nav.Item>
      </Nav>
    </Sidenav.Body>
  </Sidenav>;
}

export default SideNav;
