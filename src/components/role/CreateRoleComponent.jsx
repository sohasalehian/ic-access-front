import React, { Component } from 'react'
import RoleService from '../../services/role.service';

class CreateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            RoleService.getRoleById(this.state.id).then( (res) =>{
                let role = res.data;
                this.setState({name: role.name});
            });
        }
    }

    saveOrUpdateRole = (e) => {
        e.preventDefault();
        let role = {name: this.state.name};
        console.log('role => ' + JSON.stringify(role));

        if(this.state.id === '_add'){
            RoleService.createRole(role).then(res =>{
                this.props.history.push('/roles');
            });
        }else{
            RoleService.updateRole(role, this.state.id).then( res => {
                this.props.history.push('/roles');
            });
        }
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    cancel(){
        this.props.history.push('/roles');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Role</h3>
        }else{
            return <h3 className="text-center">Update Role</h3>
        }
    }
    render() {
        return (
            <div className="container">
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {this.getTitle}
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Role Name: </label>
                                            <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateRole}>Save</button>
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

export default CreateRoleComponent
