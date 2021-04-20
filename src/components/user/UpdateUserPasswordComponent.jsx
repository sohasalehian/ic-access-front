import React, { Component } from 'react'
import { toast } from 'react-toastify';
import UserService from '../../services/user.service';

class UpdateUserPasswordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            password: ''
        }
        this.updateUserPassword = this.updateUserPassword.bind(this);
    }

    updateUserPassword = (e) => {
        e.preventDefault();
        let password = {password: this.state.password};
        console.log('password => ' + JSON.stringify(password));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUserPassword(password, this.state.id).then( res => {
            toast.success(res.data.message);
            this.props.close();
        }).catch(function (error) {
          toast.error(error.response.data.message);
        });
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    render() {
      return (
        <form>
          <div className = "form-group">
            <label> Password: </label>
            <input placeholder="Password" name="password" className="form-control"
                value={this.state.password} onChange={this.changePasswordHandler}/>
          </div>
          <center>
            <button className="btn btn-success" onClick={this.updateUserPassword}>Save</button>
          </center>
        </form>
      )
    }
}

export default UpdateUserPasswordComponent
