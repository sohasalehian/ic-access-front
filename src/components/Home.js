import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CloseableTabs from 'react-closeable-tabs';
import { Button } from 'reactstrap';

import Profile from "./Profile";

import ListUserComponent from './user/ListUserComponent';
import ListRoleComponent from './role/ListRoleComponent';
import ListReportComponent from "./report/ListReportComponent";
import ListQueryComponent from "./query/ListQueryComponent";

class Home extends React.Component {
  state = {
    data: [
      {
        tab: 'Home',
        component: <Profile />,
        id: 0,
        closeable: false
      // },
      // {
      //   tab: 'Roles',
      //   component: <ListRoleComponent />,
      //   id: 1,
      //   closeable: true
      // },
      // {
      //   tab: 'Users',
      //   component: <ListUserComponent />,
      //   id: 2,
      //   closeable: true
      // },
      // {
      //   tab: 'Reports',
      //   component: <ListReportComponent />,
      //   id: 3,
      //   closeable: true
      },
      {
        tab: 'Query',
        component: <ListQueryComponent />,
        id: 1,
        closeable: true
      }
    ],
    activeIndex: 1
  };

  addItem = (name) => {
    if (name === 'Users' || name === 'Roles' || name === 'Reports') {
      var __FOUND = this.state.data.find(function(tab, index) {
      	if(tab.tab === 'Users' || tab.tab === 'Roles' || tab.tab === 'Reports')
      		return true;
      });
      if (__FOUND) {
        return;
      }
    }

    const id = new Date().valueOf();
    this.setState({
      data: this.state.data.concat({
        tab: name,
        component:
        name === 'Query' ? (
          <ListQueryComponent />
        ) : (
        name === 'Reports' ? (
          <ListReportComponent />
        ) : (
        name === 'Users' ? (
          <ListUserComponent />
        ) : (
        name === 'Roles' ? (
          <ListRoleComponent />
        ) : (
          <div>
            Your new component data for {id.toString().substring(6, 10)}
          </div>
        )))),
        id: id,
        closeable: true
      }),
      activeIndex: this.state.data.length
    });
  };

  render() {
    return (
      <div className="tab-container">
        <Button className="tab-opener" style={{left: '220px'}}
          onClick={() => this.addItem('Users')}>Users</Button>
        <Button className="tab-opener" style={{left: '310px'}}
          onClick={() => this.addItem('Roles')}>Roles</Button>
        <Button className="tab-opener" style={{left: '400px'}}
          onClick={() => this.addItem('Reports')}>Reports</Button>
        <Button className="tab-opener" style={{left: '490px'}}
          onClick={() => this.addItem('Query')}>Query</Button>
        <CloseableTabs
          tabPanelColor='#dfe2e6'
          data={this.state.data}
          onCloseTab={(id, newIndex) => {
            this.setState({
              data: this.state.data.filter(item => item.id !== id),
              activeIndex: this.state.activeIndex - 1
            });
          }}
          activeIndex={this.state.activeIndex}
        />
      </div>
    );
  }
}

export default Home;
