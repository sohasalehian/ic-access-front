import React, { useState, useEffect, useLayoutEffect, PureComponent } from "react";
import { Label, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataService from "../../services/data.service";
import RandomColor from "../../util/RandomColor";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const RechartsLineChart = (props) => {
  const [kpis, setKpis] = useState([]);
  const [xTickInterval, setXTickInterval] = useState(0);
  const [colors, setColors] = useState([]);
  const [data, setData] = useState([]);

  function updateXTickCount() {
    // console.log("data -> " + JSON.stringify(data));
    // console.log("data.length -> " + data.length);
    // console.log("(.77 * window.innerWidth - 280) / 15 -> " + (.77 * window.innerWidth - 280) / 15);
    // console.log((Math.floor(data.length / ((.77 * window.innerWidth - 280) / 15))) - 1);
    setXTickInterval((Math.floor(data.length / ((.77 * window.innerWidth - 280) / 15))) - 1);
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateXTickCount);
    updateXTickCount();
    return () => window.removeEventListener('resize', updateXTickCount);
  }, [data]);

  useEffect(() => {
    console.log("-------------" + props.selectedSite);
    DataService.getDataBySite(props.selectedSite).then((res) => {

        var r = [];
        // var r = RandomColor.generateRandomColors(res.data.kpis.length);
        var r = RandomColor.getRandomColors(res.data.kpis.length);

        setData(res.data.data);
        setKpis(res.data.kpis);
        setColors(r);
    });
  }, [props.selectedSite]);

  return (
    <>
      <ResponsiveContainer width="100%" height="70%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          style={{marginTop: '20px'}}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={<VerticalXAxisTick />}
            interval={xTickInterval/* 2  means "two in between". based on lenght of data*/}
            >
            <Label
              position="bottom"
              offset="85">
              Date
            </Label>
          </XAxis>

          <YAxis style={{fontSize: '.8rem'}}
            yAxisId="right1" orientation="right" unit="%"
            domain={['dataMin', 'dataMax']} stroke={colors[0]}
            label={{value: kpis[1], position: "top", offset:10, fontSize: 10, fill: colors[0]}} />
          <YAxis style={{fontSize: '.8rem'}}
            yAxisId="right2" orientation="right" unit="%"
            domain={['dataMin', 'dataMax']} stroke={colors[1]}
            label={{ value: kpis[1], position: "inside", angle: 90, dx: 33, fontSize: 10, fill: colors[1]}} />
          <YAxis style={{fontSize: '.7rem'}}
            yAxisId="left1"
            domain={['dataMin', 'dataMax']} stroke={colors[2]}
            label={{ value: kpis[2], position: "top", offset:10, fontSize: 10, fill: colors[2]}} />
          <YAxis style={{fontSize: '.7rem'}}
            yAxisId="left2"
            domain={['dataMin', 'dataMax']} stroke={colors[3]}
            label={{ value: kpis[3], position: "inside", angle: -90, dx: -33, fontSize: 10, fill: colors[3]}} />
          <Tooltip />
          <Line yAxisId="right1" type="monotone" dataKey={kpis[0]} stroke={colors[0]} activeDot={{ r: 8 }} />
          <Line yAxisId="right2" type="monotone" dataKey={kpis[1]} stroke={colors[1]} />
          <Line yAxisId="left1" type="monotone" dataKey={kpis[2]} stroke={colors[2]} />
          <Line yAxisId="left2" type="monotone" dataKey={kpis[3]} stroke={colors[3]} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RechartsLineChart;


class VerticalXAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text style={{fontSize: '.7rem'}} x={0} y={0} dy={5} textAnchor="end" fill="#666" transform="rotate(-90)">
          {payload.value}
        </text>
      </g>
    );
  }
}
