import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Tree, Input } from 'antd';
import ReportService from "../../services/report.service";
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChartTest from './ChartTest';
import RechartsLineChart from './RechartsLineChart';
import ChartConfig from './ChartConfig';
import ReportTree from './ReportTree';
import SlideTool from '../util/SlideTool';
import ToggleButton from 'react-toggle-button';

const { DirectoryTree } = Tree;

const ListReportComponent = (props) => {

  const [showConfig, setShowConfig] = useState(false);

  //used in SlideTool
  const [slideToLeft, setSlideToLeft] = useState(false);

  //used in ReportTree
  const [selectedNode, setSelectedNode] = useState({key: 'root', link:'ali'});
  const [expandedKeys, setExpandedKeys] = useState(["root", "root"]);

  //used in ChartConfig
  const [chartConfig, setChartConfig] = useState({});

  const changeSelectedNode = (node) => {
    setChartConfig({});
    setSelectedNode(node);
  }

  const isInvalid = false;
  var form = '';

  return (
    <>
      <div className='main-tree-container'>
        <SlideTool
          slideToLeft={slideToLeft}
          defaultLeft={
            <ReportTree
            gotoConfig={() => {console.log("22222222222222");setSlideToLeft(true);}}
            setSelectedNode={changeSelectedNode}
            expandedKeys={expandedKeys} setExpandedKeys={setExpandedKeys} />
          }
          slideLeft={
            <ChartConfig setChartConfig={setChartConfig} selectedNode={selectedNode}/>
          }
          deactiveSlide={!selectedNode.isLeaf}
          right={
            selectedNode.isLeaf ?
              (Object.keys(chartConfig).length === 0 ?
                <p>Apply Chart Configurations</p>
              :
                <RechartsLineChart chartConfig={chartConfig} />
              )
            :
              <p>Select a Leaf</p>
          }
        />
      </div>

    </>
  );
};

export default ListReportComponent;
