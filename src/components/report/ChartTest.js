import React, { useState, useEffect, PureComponent } from "react";
import { Label, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataService from "../../services/data.service";
import RandomColor from "../../util/RandomColor";

const ChartTest = () => {
  const [data1, setData1] = useState([
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
  const [data2, setData2] = useState([
  {
    date: '05/11',
    '4G_CELL_AVAIL_IR': 48.5,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 2400,
    amt: 2400,
  },
  {
    date: '05/12',
    '4G_CELL_AVAIL_IR': 31.2,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 1398,
    amt: 2210,
  },
  {
    date: '05/13',
    '4G_CELL_AVAIL_IR': 89,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 9800,
    amt: 2290,
  },
  {
    date: '05/14',
    '4G_CELL_AVAIL_IR': 22,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 3908,
    amt: 2000,
  },
  {
    date: '05/15',
    '4G_CELL_AVAIL_IR': 18.5,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 4800,
    amt: 2181,
  },
  {
    date: '05/16',
    '4G_CELL_AVAIL_IR': 64.1,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 3800,
    amt: 2500,
  },
  {
    date: '05/17',
    '4G_CELL_AVAIL_IR': 40.4,
    '4G_PAYLOAD_TOTAL_MBYTE_IR': 4300,
    amt: 2100,
  },
  ]);

  return (
    <>
      <h2>Chart1</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            minTickGap="1"
            tickSize="3"
            tick={<CustomizedAxisTick />}
            reversed={true}
            label={{ value: 'Date', angle: -90, position: 'right' }}
            unit={"/2021"}
            tickMargin="-3" />
          <YAxis
            tickCount="10"
            type="number"
            domain={[dataMin => (0 - Math.abs(dataMin) + 120), dataMax => (dataMax * 1.5)]}
            ticks={[821, 2000, 3353, 4623, 5945, 6780, 7543, 8554, 9000, 9333]}
            interval={0}
            reversed={true} />
          <Tooltip
            separator=": "
            cursor={{ stroke: '#444', strokeWidth: 2, strokeDasharray: [3, 3] }}
            viewBox={{ x: 0, y: 0, width: 300, height: 300 }}
            itemStyle={{background: '#ffb'}}
            wrapperStyle={{border: '#999 solid 3px'}}
            contentStyle={{background: '#eec'}}
            labelStyle={{fontSize: '18px'}} />
          <Legend
            verticalAlign="top"
            iconType="wye"
            iconSize="12"
            align="right"
            payload={[{ value: '4G_PAYLOAD_TOTAL', color: '#8884d8', type: 'line', id: 'ID01' },
                      { value: '4G_CELL_AVAIL', color: '#82ca9d', type: 'cross', id: 'ID02' },
                      { value: 'soha', color: '#fa8204', type: 'star', id: 'ID03' }]} />
          <Line
            type="monotone"
            dataKey="4G_PAYLOAD_TOTAL_MBYTE_IR"
            stroke="#8884d8"
            activeDot={{ r: 8 }} />
          <Line
            type="monotone"
            dataKey="4G_CELL_AVAIL_IR"
            stroke="#82ca9d" />
          <Line
            type="monotone"
            dataKey="amt"
            stroke="#fa8204" label={<CustomizedLabel />}
            name="soha" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Chart2</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data2}
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
          <YAxis yAxisId="left" unit="Mb" />
          <YAxis yAxisId="right" orientation="right" unit="%" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="4G_PAYLOAD_TOTAL_MBYTE_IR" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="4G_CELL_AVAIL_IR" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartTest;

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }
}
