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
import ReportTree from '../report/ReportTree';
import SingleSlideTool from '../util/singleslide/SingleSlideTool';
import ToggleButton from 'react-toggle-button';

const { DirectoryTree } = Tree;

const ListReportComponent = (props) => {

  const [showConfig, setShowConfig] = useState(false);

  //used in SingleSlideTool
  const [slideToLeft, setSlideToLeft] = useState(false);

  //used in ReportTree
  const [selectedNode, setSelectedNode] = useState({key: 'root', link:'ali'});
  const [expandedKeys, setExpandedKeys] = useState(["root", "root"]);

  //used in QueryDetails
  const [queryDetails, setQueryDetails] = useState({});

  const changeSelectedNode = (node) => {
    setQueryDetails({});
    setSelectedNode(node);
  }

  const isInvalid = false;
  var form = '';

  return (
    <>
      <div className='main-tree-container'>
        <SingleSlideTool
          slideToLeft={slideToLeft}
          defaultLeft={
            <ReportTree
            gotoConfig={() => {console.log("22222222222222");setSlideToLeft(true);}}
            setSelectedNode={changeSelectedNode}
            expandedKeys={expandedKeys} setExpandedKeys={setExpandedKeys} />
          }
          slideLeft={
            <QueryDetails setQueryDetails={setQueryDetails} selectedNode={selectedNode}/>
          }
          deactiveSlide={!selectedNode.isLeaf}
          right={
            selectedNode.isLeaf ?
              (Object.keys(queryDetails).length === 0 ?
                <p>Apply Chart Configurations</p>
              :
                <RechartsLineChart queryDetails={queryDetails} />
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