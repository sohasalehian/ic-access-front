import React, { Component } from 'react';
import { Modal } from 'antd';

import RoleService from '../../services/role.service';
import CreateRoleComponent from './CreateRoleComponent';
import ViewRoleComponent from './ViewRoleComponent';

class ListRoleComponent extends Component {
    RoleModalEnum = {
      CREATE: "Create",
      UPDATE: "Update",
      VIEW: "View"
    }

    constructor(props) {
      super(props)

      this.state = {
        roles: [],
        isModalVisible: false,
        modalCompType: null,
        id2update: null,
        id2view: null,
        fetch: true
      }
      this.addRole = this.addRole.bind(this);
      this.editRole = this.editRole.bind(this);
      this.deleteRole = this.deleteRole.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
      RoleService.getAllRoles().then((res) => {
        this.setState({ roles: res.data, fetch: false});
      });
    }

    componentDidUpdate() {
      if (this.state.fetch) {
        RoleService.getAllRoles().then((res) => {
          this.setState({ roles: res.data, fetch: false});
        });
      }
    }

    deleteRole(id){
      RoleService.deleteRole(id).then( res => {
        this.setState({roles: this.state.roles.filter(role => role.id !== id)});
      });
    }

    viewRole(id) {
      this.setState({
        isModalVisible: true,
        modalCompType: this.RoleModalEnum.VIEW,
        id2view: id
      });
    }

    editRole(id) {
      this.setState({
        isModalVisible: true,
        modalCompType: this.RoleModalEnum.UPDATE,
        id2update: id
      });
    }

    addRole() {
      this.setState({
        isModalVisible: true,
        modalCompType: this.RoleModalEnum.CREATE
      });
    }

    hideModal = () => {
      this.setState({
        isModalVisible: false,
        modalCompType: null,
        id2update: null,
        id2view: null,
        fetch: true
      });
    };

    render() {
      return (
        <>
          <div className="container">
               <h2 className="text-center">Roles List</h2>
               <div className = "row">
                  <button className="btn btn-primary" onClick={this.addRole}> Add Role</button>
               </div>
               <br></br>
               <div className = "row">
                      <table className = "table table-striped table-bordered">
                          <thead>
                              <tr>
                                  <th> Role Name</th>
                                  <th> Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  this.state.roles.map(
                                      role =>
                                      <tr key = {role.id}>
                                           <td> {role.name} </td>
                                           <td>
                                               <button onClick={ () => this.deleteRole(role.id)} className="btn btn-danger">Delete </button>
                                               {/*<button style={{marginLeft: "10px"}} onClick={ () => this.editRole(role.id)} className="btn btn-info">Update</button>*/}
                                               <button style={{marginLeft: "10px"}} onClick={ () => this.viewRole(role.id)} className="btn btn-info">View </button>
                                           </td>
                                      </tr>
                                  )
                              }
                          </tbody>
                      </table>

               </div>

          </div>

          <Modal visible={this.state.isModalVisible} id='Modal'
              onOk={this.hideModal}
              onCancel={this.hideModal}
              footer={null}
              title={null}
              keyboard
              maskClosable
              destroyOnClose
          >
            <div className="card">
              <center><h3> {this.state.modalCompType + " Role"} </h3></center>
              {this.state.modalCompType === this.RoleModalEnum.CREATE &&
                <CreateRoleComponent id="_add" close={this.hideModal} />
              }
              {this.state.modalCompType === this.RoleModalEnum.UPDATE &&
                <CreateRoleComponent id={this.state.id2update} close={this.hideModal} />
              }
              {this.state.modalCompType === this.RoleModalEnum.VIEW &&
                <ViewRoleComponent id={this.state.id2view} close={this.hideModal} />
              }
            </div>
          </Modal>
        </>
      )
    }
}

export default ListRoleComponent
