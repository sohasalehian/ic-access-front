import React from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

class EditableTable extends React.Component {

  constructor(props) {
    super(props)
  }


  componentDidMount() {
    var rows = [];
    UserService.getAllUsers().then(
      (response) => {
        if (response.status === 200) {
          response.data.forEach((item, index) => {
            var roles = '';
            item.roles.forEach((role, i) => {
              roles += role.name + ',';
            });
            roles = roles.slice(0, -1);
            console.log('^^^^^^^^^^^^^'+item.username+"=========="+roles);
            rows.push({
              id: item.id,
              username: item.username,
              password: item.password ? 'have' : 'dont have',
              hiddenPassword: item.password,
              email: item.email,
              roles: roles
            });
          });
        } else {
          alert(response.message);
          this.setState({errorMessage: response.message})
          console.log(response.message);
        }
      }
    );
    this.setState({rows})
  }

  state = {
    rows: []
  }

  handleRowDel(row) {
    UserService.deleteUser(row.id);
    var index = this.state.rows.indexOf(row);
    this.state.rows.splice(index, 1);
    this.setState(this.state.rows);
  };

  handleRowApply(row) {
    if (row.id === 0) {
      UserService.createUser(row);
      row.id = 10;//// TODO: id returned from API
    } else {
      UserService.updateUser(row);
    }
  };
  handleRowRole(row) {
    this.props.history.push('/test');
  }
  handleAddEvent(evt) {
    var row = {
      id: 0,
      username: "",
      password: "",
      email: "",
      roles: ""
    }
    this.state.rows.push(row);
    this.setState(this.state.rows);
  }

  handleRowTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var rows = this.state.rows.slice();
    var newRows = rows.map(function(row) {
      for (var key in row) {
        if (key == item.name && row.id == item.id) {
          row[key] = item.value;
        }
      }
      return row;
    });
    this.setState({rows:newRows});
  };

  render() {
    return (
      <div>
        <RowTable onRowTableUpdate={this.handleRowTable.bind(this)}
                  onRowAdd={this.handleAddEvent.bind(this)}
                  onRowDel={this.handleRowDel.bind(this)}
                  onRowApply={this.handleRowApply.bind(this)}
                  onRowRole={this.handleRowRole.bind(this)}
                  rows={this.state.rows}/>
      </div>
    );
  }
}

class RowTable extends React.Component {
  render() {
    var onRowTableUpdate = this.props.onRowTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowApply = this.props.onRowApply;
    var rowRole = this.props.onRowRole;
    var rows = this.props.rows.map(function(row) {
      return (
        <EditableRow row={row} key={row.id}
          onRowTableUpdate={onRowTableUpdate}
          onDelEvent={rowDel.bind(this)}
          onApplyEvent={rowApply.bind(this)}
          onRoleEvent={rowRole.bind(this)} />
      )
    });

    return (
      <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        {/*<button type="button" onClick={this.props.onApply} className="btn btn-success pull-right">Apply</button>*/}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>username</th>
              <th>password</th>
              <th>email</th>
              <th>roles</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class EditableRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.row);
  }
  onApplyEvent() {
    this.props.onApplyEvent(this.props.row);
  }
  onRoleEvent() {
    this.props.onRoleEvent(this.props.row);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableCell readonly={{is: true}} onRowTableUpdate={this.props.onRowTableUpdate} cellData={{
          "type": "username",
          value: this.props.row.username,
          id: this.props.row.id
        }}/>
        <EditableCell readonly={{is: true}} onRowTableUpdate={this.props.onRowTableUpdate} cellData={{
          type: "password",
          value: this.props.row.password,
          id: this.props.row.id
        }}/>
        <EditableCell readonly={{is: true}} onRowTableUpdate={this.props.onRowTableUpdate} cellData={{
          type: "email",
          value: this.props.row.email,
          id: this.props.row.id
        }}/>
        <EditableCell readonly={{is: true}} onRowTableUpdate={this.props.onRowTableUpdate} cellData={{
          type: "roles",
          value: this.props.row.roles,
          id: this.props.row.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
        <td className="del-cell">
          <input type="button" onClick={this.onApplyEvent.bind(this)} value="Apply" className="del-btn"/>
        </td>
        <td className="del-cell">
          <Link to={"/test"} className="del-btn">
            Roles
          </Link>
        </td>
      </tr>
    );
  }
}

class EditableCell extends React.Component {
  render() {
    return (
      <td>
        {this.props.readonly.is ?
          <input readonly type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} />
          :
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onRowTableUpdate}/>
        }
      </td>
    );
  }
}


export default EditableTable;
// ReactDOM.render( < EditableTable / > , document.getElementById('container'));
