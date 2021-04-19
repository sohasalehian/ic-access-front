import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CloseableTabs from 'react-closeable-tabs';
import { Button } from 'reactstrap';

import ListUserComponent from './user/ListUserComponent';
import ListRoleComponent from './role/ListRoleComponent';
import ListReportComponent from "./report/ListReportComponent";

class TabTest extends React.Component {
  state = {
    data: [
      {
        tab: 'Home',
        component: <div><h1>WELCOME TO ACCESS CONTROL APP</h1></div>,
        id: 0,
        closeable: false
      },
      {
        tab: 'Users',
        component: <ListUserComponent />,
        id: 1,
        closeable: true
      },
      {
        tab: 'Item detail 2',
        component: <div>Item details for 2</div>,
        id: 2,
        closeable: true
      },
      {
        tab: 'Item detail 3',
        component: <div>Item details for 3</div>,
        id: 3,
        closeable: true
      }
    ],
    activeIndex: 0
  };

  addItem = () => {
    const id = new Date().valueOf();
    this.setState({
      data: this.state.data.concat({
        tab: 'New item ' + id,
        component: (
          <div>
            Your new component data for {id.toString().substring(6, 10)}
          </div>
        ),
        id: id,
        closeable: true
      }),
      activeIndex: this.state.data.length
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.addItem}>Users</Button>
        <Button onClick={this.addItem}>Roles</Button>
        <Button onClick={this.addItem}>Reports</Button>
        <CloseableTabs
          tabPanelColor='#dee2e6'
          data={this.state.data}
          onCloseTab={(id, newIndex) => {
            this.setState({
              data: this.state.data.filter(item => item.id !== id),
              activeIndex: 0
            });
          }}
          activeIndex={this.state.activeIndex}
        />
      </div>
    );
  }
}

export default TabTest;
