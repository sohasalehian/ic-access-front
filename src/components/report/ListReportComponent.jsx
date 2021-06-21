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
import RechartsLineChart from '../chart/RechartsLineChart';
import QueryDetails from '../querydetails/QueryDetails';
import ReportTree from './ReportTree';
import DoubleSlideTool from '../util/doubleslide/DoubleSlideTool';
import ToggleButton from 'react-toggle-button';

const { DirectoryTree } = Tree;

const ListReportComponent = (props) => {

  const [showConfig, setShowConfig] = useState(false);

  //used in DoubleSlideTool
  const [slideToLeft, setSlideToLeft] = useState(false);

  //used in ReportTree
  const [selectedNode, setSelectedNode] = useState({key: 'root', link:'ali'});
  const [expandedKeys, setExpandedKeys] = useState(["root", "root"]);

  //used in QueryDetails
  const [reportQueryDetails, setReportQueryDetails] = useState({});

  const changeSelectedNode = (node) => {
    setReportQueryDetails({});
    setSelectedNode(node);
  }

  const isInvalid = false;
  var form = '';

  return (
    <>
      <div className='main-tree-container'>
        <DoubleSlideTool
          slideToLeft={slideToLeft}
          defaultLeft={
            <ReportTree
            gotoConfig={() => {console.log("22222222222222");setSlideToLeft(true);}}
            setSelectedNode={changeSelectedNode}
            expandedKeys={expandedKeys} setExpandedKeys={setExpandedKeys} />
          }
          slideLeft={
            <QueryDetails setQueryDetails={setReportQueryDetails} selectedNode={selectedNode}/>
          }
          deactiveSlide={!selectedNode.isLeaf}
          right={
            selectedNode.isLeaf ?
              (Object.keys(reportQueryDetails).length === 0 ?
                <p>Apply Chart Configurations</p>
              :
                <RechartsLineChart queryDetails={reportQueryDetails} />
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
