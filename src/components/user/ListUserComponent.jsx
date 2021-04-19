import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UserService from "../../services/user.service";

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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
    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }
    editUserPassword(id){
        confirmAlert({
          title: 'Confirm to change Password',
          message: 'Are you sure you want to change password?',
          buttons: [
            {
              label: 'Confirm',
              onClick: () => {
                  this.props.history.push(`/user-password/${id}`);
              }
            },
            {
              label: 'Abort',
              onClick: () => {}
            }
          ]
        });

    }
    veiwUserRole(id){
        this.props.history.push(`/view-user-role/${id}`);
    }

    componentDidMount(){
        UserService.getAllUsers().then((res) => {
            this.setState({ users: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    render() {
        return (
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
        )
    }
}

export default ListUserComponent
