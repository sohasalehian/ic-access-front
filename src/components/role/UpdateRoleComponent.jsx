import React, { Component } from 'react'
import RoleService from '../../services/role.service';

class UpdateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }

    componentDidMount(){
        RoleService.getRoleById(this.state.id).then( (res) =>{
            let role = res.data;
            this.setState({name: role.name});
        });
    }

    updateRole = (e) => {
        e.preventDefault();
        let role = {name: this.state.name, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('role => ' + JSON.stringify(role));
        console.log('id => ' + JSON.stringify(this.state.id));
        RoleService.updateRole(role, this.state.id).then( res => {
            this.props.history.push('/roles');
        });
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/roles');
    }

    render() {
        return (
            <div className="container">
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Role</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="First Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateRole}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateRoleComponent
