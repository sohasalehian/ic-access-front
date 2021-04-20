import React, { Component } from 'react';
import { toast } from 'react-toastify';
import UserService from '../../services/user.service'
import RoleService from '../../services/role.service';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Transfer } from 'antd';

// TODO: Transferlist component to be used here
class ListUserRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userid: this.props.id,
            userRoles: [],
            allRoles: []
        }
        // this.addUserRole = this.addUserRole.bind(this);
        this.updateUserRoles = this.updateUserRoles.bind(this);
    }

    componentDidMount(){
      this.getData();
    }

    getData(){
      const userRoles = [];
      const allRoles = [];
      RoleService.getAllRoles().then((res) => {
          console.log(res.data);
          res.data.forEach((item) => {
            const data = {
              key: item.name,
              title: item.name,
              description: "("+item.id+")",
              chosen: false,
            };
            allRoles.push(data);
          });
          this.setState({
            allRoles: allRoles
          });
          console.log(allRoles);
      });
      UserService.getUserById(this.state.userid).then((res) => {
          console.log(res.data);

          res.data.roles.forEach((item) => {
            const data = {
              key: item.name,
              title: item.name,
              description: "("+item.id+")",
              chosen: true,
            };
            userRoles.push(data.key);
          });
          this.setState({
            userRoles: userRoles,
            user: res.data
          });
          console.log(userRoles);
      });
    }

    updateUserRoles() {
      let user = this.state.user;
      user.roles = this.state.userRoles;
      delete user.password
      console.log('user => ' + JSON.stringify(user));

      UserService.updateUser(user, this.state.id).then(res =>{
        toast.success(res.data.message);
        this.props.close();
      }).catch(function (error) {
        toast.error(error.response.data.message);
      });
    }


    getMock = () => {
        const userRoles = [];
        const allRoles = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            userRoles.push(data.key);
          }
          allRoles.push(data);
        }
        this.setState({ allRoles, userRoles });
    };

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = userRoles => {
        this.setState({ userRoles });
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    render() {
      return (
        <>
          <Transfer style={{height: '300px'}}
            dataSource={this.state.allRoles}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.userRoles}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            render={item => item.title}
          />
          <center>
            <button
              className="btn btn-primary"
              style={{width: 'fit-content'}}
              onClick={ () => this.updateUserRoles()}
            >
              Apply
            </button>
          </center>
        </>
      )
    }
}

export default ListUserRoleComponent
