import React, { Component } from 'react'
import UserService from "../../services/user.service";

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data});
        })
    }

    render() {
        return (
            <div className="container">
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View User Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Username: </label>
                            <label> { this.state.user.username }</label>
                        </div>
                        <div className = "row">
                            <label> id: </label>
                            <label> { this.state.user.id }</label>
                        </div>
                        <div className = "row">
                            <label> Email: </label>
                            <label> { this.state.user.email }</label>
                        </div>
                    </div>
                </div>
                <div className = "card col-md-6 offset-md-3">
                  <a href="/users">back</a>
                </div>
            </div>
        )
    }
}

export default ViewUserComponent
