import React, { useState, useEffect, PureComponent } from "react";
import { Label, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataService from "../../services/data.service";
import RandomColor from "../../util/RandomColor";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const RechartsLineChart = () => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [menu, setMenu] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [colors, setColors] = useState([]);
  const [data, setData] = useState([
  {
    date: '05/11',
    '4G_CELL_AVAIL_IR': 4000,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 2400,
    amt: 2400,
  },
  {
    date: '05/12',
    '4G_CELL_AVAIL_IR': 3000,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 1398,
    amt: 2210,
  },
  {
    date: '05/13',
    '4G_CELL_AVAIL_IR': 2000,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 9800,
    amt: 2290,
  },
  {
    date: '05/14',
    '4G_CELL_AVAIL_IR': 2780,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 3908,
    amt: 2000,
  },
  {
    date: '05/15',
    '4G_CELL_AVAIL_IR': 1890,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 4800,
    amt: 2181,
  },
  {
    date: '05/16',
    '4G_CELL_AVAIL_IR': 2390,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 3800,
    amt: 2500,
  },
  {
    date: '05/17',
    '4G_CELL_AVAIL_IR': 3490,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 4300,
    amt: 2100,
  },
]);

  useEffect(() => {
    DataService.getAllSites().then((res) => {
      console.log(res.data);
      setSites(res.data);
      setSelectedSite(res.data[0]);
    });
  }, []);

  useEffect(() => {
    DataService.getDataBySite('W1077X').then((res) => {
        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.kpis);

        var r = [];
        // var r = RandomColor.generateRandomColors(res.data.kpis.length);
        var r = RandomColor.getRandomColors(res.data.kpis.length);
        console.log(r);

        setData(res.data.data);
        setKpis(res.data.kpis);
        setColors(r);
    });
  }, []);

  return (
    <>
      <center><h3>Chart-Title</h3></center>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {selectedSite} <DownOutlined />
        </a>
      </Dropdown>
      <p/>
      <ResponsiveContainer width="100%" height="75%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date">
            <Label position="right" offset="20">Date</Label>
          </XAxis>
          {/* <YAxis yAxisId="left1" unit=" MB" />
          <YAxis yAxisId="left2" unit=" Kbps" /> */}
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" unit="%" />
          <Tooltip />
          <Legend />
          <Line yAxisId="right" type="monotone" dataKey={kpis[0]} stroke={colors[0]} activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey={kpis[1]} stroke={colors[1]} />
          <Line yAxisId="left" type="monotone" dataKey={kpis[2]} stroke={colors[2]} />
          <Line yAxisId="left" type="monotone" dataKey={kpis[3]} stroke={colors[3]} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RechartsLineChart;
