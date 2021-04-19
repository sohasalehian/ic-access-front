import React, { Component } from 'react'
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import UserService from "../../services/user.service";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            email: '',
            password: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        } else {
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    username: user.username,
                    id: user.id,
                    email: user.email
                });
            });
        }
    }
    saveOrUpdateUser = (e, values) => {
        e.preventDefault();
        console.log(values);
        // let user = {username: this.state.username, password: this.state.password, email: this.state.email};
        // console.log('user => ' + JSON.stringify(user));

        if(this.state.id === '_add') {
            UserService.createUser(values).then(res =>{
                this.props.history.push('/users');
            });
        } else {
            UserService.updateUser(values, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }

    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
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

    // saveUser = (event, values) => {
    //     if (isNew) {
    //       props.createUser(values);
    //     } else {
    //       props.updateUser(values);
    //     }
    //     handleClose();
    //   };

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        const isInvalid = false;
        let user = {
          username: '',
          email: '',
          password: ''
        };
        return (
            <div className="container">
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {this.getTitle}
                                <div className = "card-body">
                                    <AvForm onValidSubmit={this.saveOrUpdateUser}>
                                      <AvGroup>
                                          <Label for="login">
                                            Username:
                                          </Label>
                                          <AvField
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            validate={{
                                              required: {
                                                value: true,
                                                errorMessage: 'required field',
                                              },
                                              pattern: {
                                                value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                                                errorMessage: 'username pattern: ' + '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                                              },
                                              minLength: {
                                                value: 3,
                                                errorMessage: 'minimum lenght of 3',
                                              },
                                              maxLength: {
                                                value: 50,
                                                errorMessage: 'maximum lenght of 50',
                                              },
                                            }}
                                            value={user.username}
                                          />
                                      </AvGroup>
                                      {this.state.id === '_add' &&
                                        <AvGroup>
                                            <Label for="password">
                                              Password:
                                            </Label>
                                            <AvField
                                              type="text"
                                              className="form-control"
                                              name="password"
                                              validate={{
                                                required: {
                                                  value: true,
                                                  errorMessage: 'required field',
                                                },
                                                minLength: {
                                                  value: 6,
                                                  errorMessage: 'minimum lenght of 6',
                                                },
                                                maxLength: {
                                                  value: 40,
                                                  errorMessage: 'maximum lenght of 40',
                                                },
                                              }}
                                              value={user.password}
                                            />
                                        </AvGroup>
                                      }
                                      <AvGroup>
                                        <AvField
                                          name="email"
                                          label="Email:"
                                          placeholder='example@example.com'
                                          type="email"
                                          validate={{
                                            required: {
                                              value: true,
                                              errorMessage: 'required field',
                                            },
                                            email: {
                                              errorMessage: 'invalid email address',
                                            },
                                            minLength: {
                                              value: 5,
                                              errorMessage: 'minimum lenght of 5',
                                            },
                                            maxLength: {
                                              value: 254,
                                              errorMessage: 'maximum lenght of 254',
                                            },
                                          }}
                                          value={user.email}
                                        />
                                      </AvGroup>

                                      <Button tag={Link} to="/users" replace color="info">
                                        <span className="d-none d-md-inline">
                                          Back
                                        </span>
                                      </Button>
                                      &nbsp;
                                      <Button color="primary" type="submit" disabled={isInvalid} style={{marginLeft: "10px"}}>
                                        Save
                                      </Button>
                                    </AvForm>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateUserComponent
