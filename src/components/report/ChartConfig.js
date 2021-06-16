import React, { useState, useEffect } from "react";
import DataService from "../../services/data.service";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./ChartConfig.scss";

const ChartConfig = (props) => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    DataService.getAllSites().then((res) => {
      setSites(res.data);
      if (selectedSite === "") {
        setSelectedSite(res.data[0]);
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
  }

  const onApply = (e) => {
    props.setChartConfig({site: selectedSite});
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
        <div onClick={onApply}>
          <button onClick={onApply} className="apply-button btn btn-info">Apply</button>
        </div>
      </center>
    </>
  );
};

export default ChartConfig;
