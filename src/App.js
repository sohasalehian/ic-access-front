import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ToggleButton from 'react-toggle-button';
import { Button } from 'reactstrap';


import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import TreeTest from "./components/TreeTest";

import ListUserComponent from './components/user/ListUserComponent';
import CreateUserComponent from './components/user/CreateUserComponent';
import UpdateUserComponent from './components/user/UpdateUserComponent';
import UpdateUserPasswordComponent from './components/user/UpdateUserPasswordComponent';
import ViewUserComponent from './components/user/ViewUserComponent';
import ListUserRoleComponent from './components/userrole/ListUserRoleComponent';

import ListRoleComponent from './components/role/ListRoleComponent';
import CreateRoleComponent from './components/role/CreateRoleComponent';
import UpdateRoleComponent from './components/role/UpdateRoleComponent';
import ViewRoleComponent from './components/role/ViewRoleComponent';

import ListReportComponent from "./components/report/ListReportComponent";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import { withNamespaces } from 'react-i18next';
import i18n from './config/i18n';

const App = ({ t }) => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [isFa, setIsFa] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowManagerBoard(currentUser.roles.includes("ROLE_MANAGER"));
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <Router history={history}>
      <div className='main-div'>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          <ToggleButton
            inactiveLabel={'en'}
            activeLabel={'fa'}
            colors={{
              activeThumb: {
                base: 'rgb(250,250,250)',
              },
              inactiveThumb: {
                base: 'rgb(62,130,247)',
              },
              active: {
                base: 'rgb(207,221,245)',
                hover: 'rgb(177, 191, 215)',
              },
              inactive: {
                base: 'rgb(65,66,68)',
                hover: 'rgb(95,96,98)',
              }
            }}
            thumbAnimateRange={[-10, 36]}
            value={isFa}
            onToggle={(value) => {
              setIsFa(!isFa);
              if (value) {
                changeLanguage('en');
              } else {
                changeLanguage('fa');
              }
            }} />
          <Link to={"/"} className="navbar-brand">
            {t('app title')}
          </Link>

          {/*

          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                {t('home')}
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  {t('users')}
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/roles"} className="nav-link">
                  {t('roles')}
                </Link>
              </li>
            )}


            {(showAdminBoard || showManagerBoard || showModeratorBoard) && (
              <li className="nav-item">
                <Link to={"/reports"} className="nav-link">
                  {t('reports')}
                </Link>
              </li>
            )}
          </div>
          */}

          {currentUser ?
            (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    {t('LogOut')}
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    {t('Login')}
                  </Link>
                </li>
              </div>
            )
          }
        </nav>

        <div className='main-content-div'>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
              {/* Same as
          <ToastContainer />*/}

          <Switch>
            <Route path = "/" exact component = {currentUser ? Home : Login}></Route>
            <Route path = "/login" exact component = {Login}></Route>
            <Route path = "/home" exact component = {Home}></Route>

            <Route exact path="/profile" component={Profile} />
            <Route path="/admin" component={BoardAdmin} />

            <Route path = "/users" component = {ListUserComponent}></Route>
            <Route path = "/add-user/:id" component = {CreateUserComponent}></Route>
            <Route path = "/user-password/:id" component = {UpdateUserPasswordComponent}></Route>
            <Route path = "/view-user-role/:id" component = {ListUserRoleComponent}></Route>
            <Route path = "/view-user/:id" component = {ViewUserComponent}></Route>
            {/* <Route path = "/update-user/:id" component = {UpdateUserComponent}></Route> */}

            <Route path = "/roles" component = {ListRoleComponent}></Route>
            <Route path = "/add-role/:id" component = {CreateRoleComponent}></Route>
            <Route path = "/view-role/:id" component = {ViewRoleComponent}></Route>
            {/* <Route path = "/update-role/:id" component = {UpdateRoleComponent}></Route> */}

            <Route path="/reports" component={ListReportComponent} />

            <Route path="/test" component={TreeTest} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default withNamespaces()(App);
