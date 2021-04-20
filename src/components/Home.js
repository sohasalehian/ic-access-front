import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CloseableTabs from 'react-closeable-tabs';
import { Button } from 'reactstrap';

import Profile from "./Profile";

import ListUserComponent from './user/ListUserComponent';
import ListRoleComponent from './role/ListRoleComponent';
import ListReportComponent from "./report/ListReportComponent";

function Home(props) {
  const [data, setData] = useState([
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
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const addItem = (name) => {
    if (name === 'Users') {
      var __FOUND = data.find(function(tab, index) {
      	if(tab.tab == 'Users')
      		return true;
      });
      if (__FOUND) {
        return;
      }
    }

    if (name === 'Roles') {
      var __FOUND = data.find(function(tab, index) {
        if(tab.tab == 'Roles')
          return true;
      });
      if (__FOUND) {
        return;
      }
    }

    const id = new Date().valueOf();
    var prevData = data;
    prevData.concat({
      tab: name,
      component: name === 'Reports' ? (
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
          )
        )
      ),
      id: id,
      closeable: true
    });
    setData(prevData);
    setActiveIndex(data.length);
  };

  return (
    <div>
      <Button className="tab-opener" style={{left: '220px'}}
        onClick={() => addItem('Users')}>Users</Button>
      <Button className="tab-opener" style={{left: '300px'}}
        onClick={() => addItem('Roles')}>Roles</Button>
      <Button className="tab-opener" style={{left: '380px'}}
        onClick={() => addItem('Reports')}>Reports</Button>
      <CloseableTabs
        tabPanelColor='#dee2e6'
        data={data}
        onCloseTab={(id, newIndex) => {
          var prevData = data;
          prevData.filter(item => item.id !== id);
          setData(prevData);
          setActiveIndex(0);
        }}
        activeIndex={activeIndex}
      />
    </div>
  );
}

export default Home;
