import React, { Component } from 'react'
import { toast } from 'react-toastify';
import UserService from '../../services/user.service';

class UpdateUserPasswordComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            password: ''
        }
        this.updateUserPassword = this.updateUserPassword.bind(this);
    }

    componentDidMount(){
    }

    updateUserPassword = (e) => {
        e.preventDefault();
        let password = {password: this.state.password};
        console.log('password => ' + JSON.stringify(password));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUserPassword(password, this.state.id).then( res => {
            console.log(res);
            toast.success(res.data.message, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.props.history.push('/users');
        }).catch(function (error) {
          toast.error(error.response.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div className="container">
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update User Password</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Password" name="password" className="form-control"
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateUserPassword}>Save</button>
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

export default UpdateUserPasswordComponent
