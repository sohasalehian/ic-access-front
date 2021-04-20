import React, { Component } from 'react';
import { Modal } from 'antd';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UserService from "../../services/user.service";

import CreateUserComponent from './CreateUserComponent';
import ViewUserComponent from './ViewUserComponent';
import UpdateUserPasswordComponent from './UpdateUserPasswordComponent';
import ListUserRoleComponent from '../userrole/ListUserRoleComponent';

class ListUserComponent extends Component {
    UserModalEnum = {
        CREATE: "Create",
        UPDATE: "Update",
        VIEW: "View",
        PASSWORD: "Password for",
        ROLE: "Role of",
    }

    constructor(props) {
      super(props)

      this.state = {
          users: [],
          isModalVisible: false,
          modalCompType: null,
          id2update: null,
          id2view: null,
          id2password: null,
          id2role: null,
          fetch: true
      }
      this.addUser = this.addUser.bind(this);
      this.editUser = this.editUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
      UserService.getAllUsers().then((res) => {
        this.setState({ users: res.data, fetch: false});
      });
    }

    componentDidUpdate() {
      if (this.state.fetch) {
        UserService.getAllUsers().then((res) => {
          this.setState({ users: res.data, fetch: false});
        });
      }
    }

    deleteUser (id) {
        if (id === 1) {
            confirmAlert({
              title: 'Confirm to delete',
              message: 'Are you sure you want to delete "admin"?',
              buttons: [
                {
                  label: 'Delete',
                  onClick: () => {
                    UserService.deleteUser(id).then( res => {
                      this.setState({users: this.state.users.filter(user => user.id !== id)});
                    });
                  }
                },
                {
                  label: 'Abort',
                  onClick: () => {}
                }
              ]
            });
        } else {
            UserService.deleteUser(id).then( res => {
                this.setState({users: this.state.users.filter(user => user.id !== id)});
            });
        }
    }

    viewUser(id) {
      this.setState({
        isModalVisible: true,
        modalCompType: this.UserModalEnum.VIEW,
        id2view: id
      });
    }

    editUser(id) {
      this.setState({
        isModalVisible: true,
        modalCompType: this.UserModalEnum.UPDATE,
        id2update: id
      });
    }

    editUserPassword(id) {
        // confirmAlert({
        //   title: 'Confirm to change Password',
        //   message: 'Are you sure you want to change password?',
        //   buttons: [
        //     {
        //       label: 'Confirm',
        //       onClick: () => {
                this.setState({
                  isModalVisible: true,
                  modalCompType: this.UserModalEnum.PASSWORD,
                  id2password: id
                });
        //       }
        //     },
        //     {
        //       label: 'Abort',
        //       onClick: () => {}
        //     }
        //   ]
        // });
    }

    veiwUserRole(id) {
      this.setState({
        isModalVisible: true,
        modalCompType: this.UserModalEnum.ROLE,
        id2role: id
      });
    }

    addUser() {
        this.setState({
          isModalVisible: true,
          modalCompType: this.UserModalEnum.CREATE
        });
    }

    hideModal = () => {
      this.setState({
        isModalVisible: false,
        modalCompType: null,
        id2update: null,
        id2view: null,
        id2password: null,
        id2role: null,
        fetch: true
      });
    };

    render() {
        return (
          <>
            <div className="container">
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>User ID</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user =>
                                        <tr key = {user.id}>
                                             <td> {user.username} </td>
                                             <td> {user.id}</td>
                                             <td> {user.email}</td>
                                             <td>
                                                 <button onClick={ () => this.editUser(user.id)} className="btn btn-info">Update</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(user.id)} className="btn btn-info">View</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.editUserPassword(user.id)} className="btn btn-primary">Password</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.veiwUserRole(user.id)} className="btn btn-info">Role</button>
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
                <center><h3> {this.state.modalCompType + " User"} </h3></center>
                {this.state.modalCompType === this.UserModalEnum.CREATE &&
                  <CreateUserComponent id="_add" close={this.hideModal} />
                }
                {this.state.modalCompType === this.UserModalEnum.UPDATE &&
                  <CreateUserComponent id={this.state.id2update} close={this.hideModal} />
                }
                {this.state.modalCompType === this.UserModalEnum.VIEW &&
                  <ViewUserComponent id={this.state.id2view} close={this.hideModal} />
                }
                {this.state.modalCompType === this.UserModalEnum.PASSWORD &&
                  <UpdateUserPasswordComponent id={this.state.id2password} close={this.hideModal} />
                }
                {this.state.modalCompType === this.UserModalEnum.ROLE &&
                  <ListUserRoleComponent id={this.state.id2role} close={this.hideModal} />
                }
              </div>
            </Modal>
          </>
        )
    }
}

export default ListUserComponent
