import React from "react";
import RoleService from "../services/role.service";

class EditableTable2 extends React.Component {

  componentDidMount() {
    var rows = [];
    RoleService.getAllRoles().then(
      (response) => {
        if (response.status === 200) {
          response.data.forEach((item, index) => {
            console.log('^^^^^^^^^^^^^'+item.name);
            rows.push({
              id: item.id,
              name: item.name
            });
          });
        } else {
          alert(response.message);
          this.setState({errorMessage: response.message})
        }
      }
    );
    this.setState({rows})
  }

  state = {
    rows: []
  }

  handleRowDel(row) {
    RoleService.deleteRole(row.id).then(
      (response) => {
        console.log('^^^^^^^^^^^^^'+response);
        if (response.status === 200) {
          var index = this.state.rows.indexOf(row);
          this.state.rows.splice(index, 1);
          this.setState(this.state.rows);
        } else {
          this.setState({errorMessage: response.message})
        }
      });
  };

  handleRowApply(row) {
    if (row.id === 0) {
      RoleService.createRole(row);
      row.id = 10;//// TODO: id returned from API
    } else {
      RoleService.updateRole(row);
    }
  };

  handleAddEvent(evt) {
    var row = {
      id: 0,
      name: ""
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
                  rows={this.state.rows} />
      </div>
    );
  }
}

class RowTable extends React.Component {
  render() {
    var onRowTableUpdate = this.props.onRowTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowApply = this.props.onRowApply;
    var rows = this.props.rows.map(function(row) {
      return (
        <EditableRow row={row} key={row.id}
          onRowTableUpdate={onRowTableUpdate}
          onDelEvent={rowDel.bind(this)}
          onApplyEvent={rowApply.bind(this)} />
      )
    });

    return (
      <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        {/*<button type="button" onClick={this.props.onApply} className="btn btn-success pull-right">Apply</button>*/}
        <table className="table table-bordered" style={{width: '30%'}}>
          <thead>
            <tr>
              <th>name</th>
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
  render() {
    return (
      <tr className="eachRow">
        <EditableCell onRowTableUpdate={this.props.onRowTableUpdate} cellData={{
          "type": "name",
          value: this.props.row.name,
          id: this.props.row.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
        <td className="del-cell">
          <input type="button" onClick={this.onApplyEvent.bind(this)} value="Apply" className="del-btn"/>
        </td>
      </tr>
    );
  }
}

class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onRowTableUpdate}/>
      </td>
    );
  }
}

export default EditableTable2;
// ReactDOM.render( < EditableTable / > , document.getElementById('container'));
