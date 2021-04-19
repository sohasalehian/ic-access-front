import React, { Component } from 'react'
import UserService from "../../services/user.service";

class UpdateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            id: '',
            email: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            console.log("================"+user);
            this.setState({
                username: user.username,
                id: user.id,
                email : user.email
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, id: this.state.id, email: this.state.email};
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUser(user, this.state.id).then( res => {
            this.props.history.push('/users');
        });
    }

    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changeIdHandler= (event) => {
        this.setState({id: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
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
                                <h3 className="text-center">Update User</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Usernam: </label>
                                            <input placeholder="Usernam" name="username" className="form-control"
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Id: </label>
                                            <input placeholder="Id" name="id" className="form-control"
                                                value={this.state.id} onChange={this.changeIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email Address" name="email" className="form-control"
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateUser}>Save</button>
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

export default UpdateUserComponent
