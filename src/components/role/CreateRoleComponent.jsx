import React, { Component } from 'react';
import { toast } from 'react-toastify';
import RoleService from '../../services/role.service';

class CreateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            name: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }

    componentDidMount(){
      if(this.state.id === '_add') {
        return
      } else {
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

        if(this.state.id === '_add') {
          RoleService.createRole(role).then(res => {
            toast.success(res.data);
            this.props.close();
          }).catch(function (error) {
            toast.error(error.response.data.message);
          });
        } else {
          RoleService.updateRole(role, this.state.id).then( res => {
            toast.success(res.data);
            this.props.close();
          }).catch(function (error) {
            toast.error(error.response.data.message);
          });
        }
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    render() {
        return (
            <form>
                <div className = "form-group">
                    <label> Role Name: </label>
                    <input placeholder="Name" name="name" className="form-control"
                        value={this.state.name} onChange={this.changeNameHandler}/>
                </div>

                <button className="btn btn-success" onClick={this.saveOrUpdateRole}>Save</button>
            </form>
        )
    }
}

export default CreateRoleComponent
