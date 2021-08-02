import React, { useState, useEffect } from "react";
import MoService from "../../services/mo.service";
import { Menu, Dropdown, Collapse, Radio, DatePicker, Button, Input, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./QueryDetails.scss";
import { SettingOutlined } from '@ant-design/icons';
import { CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { Option, OptGroup } = Select;

const QueryDetails = (props) => {
  const [moEntities, setMoEntities] = useState([]);
  const [selectedMoEntity, setSelectedMoEntity] = useState("");
  const [moEntityMenu, setMoEntityMenu] = useState([]);

  const [moViews, setMoViews] = useState([]);
  const [selectedMoView, setSelectedMoView] = useState("");
  const [moViewMenu, setMoViewMenu] = useState([]);

  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState("");
  const [elementMenu, setElementMenu] = useState([]);
  const [disableElementDropdown, setDisableElementDropdown] = useState(true);

  const [kpis, setKpis] = useState([]);
  const [selectedKpi, setSelectedKpi] = useState("");
  const [kpiMenu, setKpiMenu] = useState([]);
  const [disableKpiSelect, setDisableKpiSelect] = useState(true);

  const [timeInterval, setTimeInterval] = useState(0);
  const [timeOption, setTimeOption] = useState("absolute");
  const [relativeTo, setRelativeTo] = useState(1);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const [selectedSpecificHours, setSelectedSpecificHours] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const forceUpdate = React.useReducer(() => ({}))[1]

  const addToSpecificHours = (number) => {
    var temp = selectedSpecificHours;
    temp[number] = !temp[number];
    setSelectedSpecificHours(temp);
    forceUpdate();
  }

  const timeIntervalOptions = [
    { label: '5 min', value: 0 },
    { label: '15 min', value: 1 },
    { label: '30 min', value: 2, disabled: true },
    { label: 'hourly', value: 3 },
    { label: 'daily', value: 4 },
    { label: 'weekly', value: 5 },
    { label: 'monthly', value: 6 },
    { label: 'quarterly', value: 7, disabled: true },
    { label: 'yearly', value: 8, disabled: true },
  ];

  useEffect(() => {
    MoService.getAllMoEntities().then((res) => {
      setMoEntities(res.data);
      setSelectedMoEntity("");

      const moEntityMenuItsms = [];
      for (let moEntity of res.data) {
        moEntityMenuItsms.push(<Menu.Item key={moEntity}>{moEntity}</Menu.Item>);
      }

      var moEntityMenu = (
        <Menu onClick={(e) => {setSelectedMoEntity(e.key); setSelectedElement("");}}>
          {moEntityMenuItsms}
        </Menu>
      );
      setMoEntityMenu(moEntityMenu);
    });
  }, []);

  useEffect(() => {
    MoService.getAllMoViews().then((res) => {
      setMoViews(res.data);
      setSelectedMoView("");

      const moViewMenuItsms = [];
      for (let moView of res.data) {
        moViewMenuItsms.push(<Menu.Item key={moView}>{moView}</Menu.Item>);
      }

      var moViewMenu = (
        <Menu onClick={(e) => {setSelectedMoView(e.key); setSelectedElement("");}}>
          {moViewMenuItsms}
        </Menu>
      );
      setMoViewMenu(moViewMenu);
    });
  }, []);

  useEffect(() => {
    if (selectedMoEntity !== null && selectedMoEntity !== ""
        && selectedMoView !== null && selectedMoView !== "") {
      MoService.getElements(selectedMoEntity, selectedMoView).then((res) => {
        setElements(res.data);
        if (selectedElement === "") {
          setSelectedElement(res.data[0]);
        }

        const elementMenuItsms = [];
        for (let  element of res.data) {
          elementMenuItsms.push(<Menu.Item key={element}>{element}</Menu.Item>);
        }

        var elementMenu = (
          <Menu onClick={(e) => {setSelectedElement(e.key)}}>
            {elementMenuItsms}
          </Menu>
        );
        setElementMenu(elementMenu);

        setDisableElementDropdown(res.data.length === 0);
      });

      MoService.getKpis(selectedMoEntity, selectedMoView).then((res) => {
        setKpis(res.data);
        if (selectedKpi === "") {
          setSelectedKpi(res.data[0]);
        }

        const kpiMenuItsms = [];
        for (let kpi of res.data) {
          kpiMenuItsms.push(<Option key={kpi}>{kpi}</Option>);
        }

        var kpiMenu = (
          <Select onClick={(e) => {setSelectedKpi(e.key)}}
            disabled={disableKpiSelect}
            placeholder="Please select KPIs"
            onChange={handleKpiSelect}
            mode="multiple" showSearch>
            {kpiMenuItsms}
          </Select>
        );
        setKpiMenu(kpiMenu);

        setDisableKpiSelect(false);
      });
    }
  }, [selectedMoEntity, selectedMoView]);

  function handleKpiSelect(value) {
    console.log(`selected ${value}`);
  }

  const genExtra = () => (
    <SettingOutlined
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const onApply = (e) => {
    const newApplyPopup = [];
    if (selectedElement === "") {
      return;
    } else {
      props.setQueryDetails({element: selectedElement});
    }
  }

  function onOkDatePicker(value, valueStrings) {
    setFrom(value[0]);
    setTo(value[1])
  }

  function changePeriods(e) {
    const { value } = e.target;
    const reg = /^[1-9]\d*$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      setRelativeTo(value);
    }
  }

  return (
    <>
      <div >
        <button onClick={onApply} className="apply-button btn btn-info">Apply</button>
      </div>

      <Collapse
      	accordion
      	bordered={false}
      	defaultActiveKey={['1']}
      	expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="element-collapse-custom-collapse"
      >
        <Panel header="MO Entity" key="1" extra={genExtra()}>
          <div className="each-detail">
            MO Entity:{" "}
            <Dropdown overlay={moEntityMenu} trigger={['click']} placement="bottomCenter" arrow>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {selectedMoEntity} <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div className="each-detail">
            MO View:{" "}
            <Dropdown overlay={moViewMenu} trigger={['click']} placement="bottomCenter" arrow>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {selectedMoView} <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div className="each-detail">
            {(selectedMoView !== null && selectedMoView !== "" ?
              (selectedMoView.charAt(0) + selectedMoView.substring(1).toLowerCase())
              : "Element") + ": "}
            <Dropdown overlay={elementMenu} trigger={['click']}
              placement="bottomCenter" arrow
              disabled={disableElementDropdown}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {selectedElement} <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Panel>

        <Panel header="KPI" key="2" extra={genExtra()}>
          <div className="each-detail">
            KPIs:{" "}
            {kpiMenu}
          </div>
        </Panel>

        <Panel header="Time" key="3" extra={genExtra()}>
          <div className="each-detail column">
            Time Interval:
            <Radio.Group className="interval-radio-button-wrapper"
              options={timeIntervalOptions}
              onChange={(e) => {setTimeInterval(e.target.value)}}
              value={timeInterval}
              optionType="button"
              buttonStyle="solid"
            />
          </div>

          <div className="each-detail column fix-height-100">
            <Radio.Group
              options={["absolute", "relative to"]}
              onChange={(e) => {setTimeOption(e.target.value)}}
              value={timeOption}
              optionType="button"
            />

          {timeOption === "absolute" ?
            <>
              From/To:
              <RangePicker
                size={"small"}
                showTime={timeInterval < 3 ? { format: 'HH:mm' } :
                      (timeInterval === 3 ?  { format: 'HH' } : false)}
                ranges={
                  timeInterval < 5 ? {
                    Today: [moment().startOf('day'), moment().endOf('day')],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                  } : {
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                  }
                }
                onChange={onOkDatePicker}
              />
            </>
          :
            <div className="flex-row">
             previous
             <Input className="period-input" value={relativeTo} onChange={changePeriods} />
             period(s)
            </div>
          }
          </div>

          {timeInterval < 4 &&
            <div className="each-detail column">
              Specific Hours:
              <div>
                {selectedSpecificHours.map((item, i)=>{
                  return (
                    <Button className="hours-btn-circle"
                      type={selectedSpecificHours[i] ? "primary" : "dashed"}
                      shape="circle"
                      onClick={() => {addToSpecificHours(i)}}>
                      {i}
                    </Button>
                  );
                 })}
              </div>
            </div>
          }
        </Panel>
      </Collapse>
    </>
  );
};

export default QueryDetails;
