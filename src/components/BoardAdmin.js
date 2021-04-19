import React, { useState, useEffect } from "react";
import EditableTable from "./EditableTable";
import EditableTable2 from "./EditableTable2";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // UserService.getAdminBoard().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //
    //     setContent(_content);
    //   }
    // );
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <header className="jumbotron">
          <h3>Users</h3>
        </header>
        <EditableTable />
      </div>
      <div className="container">
        <header className="jumbotron">
          <h3>Roles</h3>
        </header>
        <EditableTable2 />
      </div>
    </React.Fragment>
  );
};

export default BoardAdmin;
