import React, {useState, useEffect} from 'react'
import UserService from "../../services/user.service";

function ViewUserComponent(props) {
  const [id] = useState(props.id);
  const [user, setUser] = useState({});

  useEffect(() => {
      UserService.getUserById(id).then( res => {
          setUser(res.data);
      })
  });

  return (
    <>
      <table className = "table table-striped table-bordered">
        <tr>
          <td><b>Username</b></td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td><b>ID</b></td>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td><b>Email</b></td>
          <td>{user.email}</td>
        </tr>
      </table>
    </>
  );
}
export default ViewUserComponent;
