import React, { Component } from 'react'
import RoleService from '../../services/role.service';

class ViewRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            role: {}
        }
    }

    componentDidMount(){
        RoleService.getRoleById(this.state.id).then( res => {
            this.setState({role: res.data});
        })
    }

    render() {
        return (
            <div className="container">
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center">View Role Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>Role Name:</label>
                            <label>{this.state.role.name}</label>
                        </div>
                    </div>
                </div>
                <div className = "card col-md-6 offset-md-3">
                  <a href="/roles">back</a>
                </div>
            </div>
        )
    }
}

export default ViewRoleComponent
