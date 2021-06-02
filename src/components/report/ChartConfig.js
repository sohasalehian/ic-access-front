import React, { useState, useEffect } from "react";
import DataService from "../../services/data.service";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ChartConfig = (props) => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(props.selectedSite ? props.selectedSite : "");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    DataService.getAllSites().then((res) => {
      setSites(res.data);
      if (selectedSite === "") {
        setSelectedSite(res.data[0]);
        props.setSelectedSite(res.data[0]);
      }

      const menuItsms = [];
      for (let  site of res.data) {
        menuItsms.push(<Menu.Item key={site}>{site}</Menu.Item>);
      }

      var menu = (
        <Menu onClick={onSelectSite}>
          {menuItsms}
        </Menu>
      );
      setMenu(menu);
    });
  }, []);

  const onSelectSite = (e) => {
    console.log("++++++++++++" + window.innerWidth);
    setSelectedSite(e.key);
    props.setSelectedSite(e.key);
  }

  return (
    <>
      <center>
        <h4>Chart-Title</h4>
        <div className="site-dropdown">
          For Site:{" "}
          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {selectedSite} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </center>
    </>
  );
};

export default ChartConfig;
