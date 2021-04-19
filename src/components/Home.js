import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// import {MDBDataTableV5} from 'mdbreact';

import UserService from "../services/user.service";
import RoleService from "../services/role.service";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Home</h3>
      </header>
      <div>
           <div className = "row">
              <button className="btn btn-primary" onClick={() => history.push('/users')}>Users</button>
           </div>
           <br></br>
           <div className = "row">
              <button className="btn btn-primary" onClick={() => history.push('/roles')}>Roles</button>
           </div>
           <br></br>
           <div className = "row">
              <button className="btn btn-primary" onClick={() => history.push('/reports')}>Reports</button>
           </div>
           <br></br>
      </div>
    </div>
  );
};

export default Home;
