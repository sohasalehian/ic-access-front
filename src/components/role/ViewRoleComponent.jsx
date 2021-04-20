import React, {useState, useEffect} from 'react'
import RoleService from "../../services/role.service";

function ViewRoleComponent(props) {
  const [id] = useState(props.id);
  const [role, setRole] = useState({});

  useEffect(() => {
      RoleService.getRoleById(id).then( res => {
          setRole(res.data);
      })
  });

  return (
    <>
      <table className = "table table-striped table-bordered">
        <tr>
          <td><b>Name</b></td>
          <td>{role.name}</td>
        </tr>
        <tr>
          <td><b>ID</b></td>
          <td>{role.id}</td>
        </tr>
      </table>
    </>
  );
}
export default ViewRoleComponent;
