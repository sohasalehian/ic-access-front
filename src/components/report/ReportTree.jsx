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
import ToggleButton from 'react-toggle-button';

const { DirectoryTree } = Tree;

const ReportTree = (props) => {

  const [searchValue, setSearchValue] = useState('');
  const [allKeys, setAllKeys] = useState(['root']);
  const [selectedKeys, setSelectedKeys] = useState(props.selectedNode ? [props.selectedNode.key] : ['root']);
  const [treeData, setTreeData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [chosenNode, setChosenNode] = useState('');//right-clicked node :-)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [doAdd, setDoAdd] = useState(false);
  const [node, setNode] = useState({
    name: '',
    link: '',
  });

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (reload) {
      fetchData();
      setReload(false);
    }
  }, [reload]);

  const getChildrenKeys = (node) => {
    var allKeys = [node.key];
    node.children.forEach((item) => {
      getChildrenKeys(item).forEach((key) => {
        allKeys.push(key)
      });
    });
    return allKeys;
  };

  const fetchData = () => {
    ReportService.getAllReports().then((res) => {
        const rootNode = {
          title: 'Root',
          key: 'root',
          children: res.data.children
        }
        const treeData = [
          rootNode
        ];
        var root = res.data;
        root.key = 'root';
        var allKeys = getChildrenKeys(res.data);

        setTreeData(treeData);
        setAllKeys(allKeys);
    });
  };

  const onChange = e => {
    const { value } = e.target;

    setSearchValue(value);
    props.setExpandedKeys(value === '' ? ['root'] : allKeys);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onRightClick = (info) => {
    info.node.selected = true;
    setMenuOpen(true);
    setChosenNode(info.node);
    setSelectedKeys([info.node.key]);
    props.setSelectedNode(info.node);
    setMenuX(info.event.screenX);
    setMenuY(info.event.screenY - 70);
  };

  const onSelect = (key, info) => {
    setSelectedKeys([info.node.key]);
    props.setSelectedNode(info.node);
    if (info.node.isLeaf) {
      console.log("1111111111");
      props.gotoConfig();
    }
  };

  const filterTreeNode = (node) => {
    return(node.title.includes(searchValue));
  };

  const onExpand = (expandedKeys, info) => {
    props.setExpandedKeys(expandedKeys);
  };

  const confirmDelete = () => {
    let msg = chosenNode.isLeaf ?
      'Are you sure you want to delete Report?' :
      (
        <>
          <div>Are you sure you want to delete Category?</div>
          <div>All subcategories and Reports under this category will be deleted too!</div>
        </>
      );
      confirmAlert({
        message: msg,
        buttons: [
          {
            label: 'Delete',
            onClick: () => {
              ReportService.deleteReport(chosenNode.id).then( res => {
                  toast.success(res.data.message, {

                  });
              }).catch(function (error) {
                toast.error(error.response.data.message, {
                  position: "top-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });

            setIsModalVisible(false);
            setReload(true);
            }
          },
          {
            label: 'Abort',
            onClick: () => {}
          }
        ]
      });
  };

  const showModal = (whatFor) => {
    if (whatFor === 'add') {
      setIsModalVisible(true);
      setDoAdd(true);
    } else {
      setIsModalVisible(true);
      setDoAdd(false);
      setNode({
    		name: chosenNode.title,
    		link: chosenNode.link
      });
    }
  };

  const handleOk = (e, values) => {
    if (doAdd) {
      ReportService.createReport({
        name: values.name,
        parent: chosenNode.key === 'root' ? null : chosenNode.id,
        link: values.link
      }).then( res => {
          toast.success(res.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }).catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      ReportService.updateReport({
        name: values.name,
        parent: 0,
        link: chosenNode.isLeaf ? values.link : null
      }, chosenNode.id).then( res => {
          toast.success(res.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }).catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }

    setIsModalVisible(false);
    setReload(true);

    form && form.reset();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form && form.reset();
  };

  const isChartTest = () => {
    const id = parseInt(selectedKeys[0].replace('user','').replace('report',''));
    if (!id) {
      return false;
    }

    if (id % 2 === 0) {
      return false;
    }

    return true;
  }

  const isInvalid = false;
  var form = '';

  return (
    <>
      <div className='tree-container'>
        <Input placeholder="Search" onChange={onChange} />

        <DirectoryTree
          multiple
          defaultExpandAll
          onRightClick={onRightClick}
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
          filterTreeNode={filterTreeNode}
          selectedKeys={selectedKeys}
          expandedKeys={props.expandedKeys}
        />
      </div>

      <Modal visible={isModalVisible}
          id='Modal'
          footer={null}
          title={doAdd ? 'Add ' : ('Edit ' + (chosenNode.isLeaf ? 'Report' : 'Category'))}
          onOk={hideModal}
          onCancel={hideModal}
          keyboard
          maskClosable
          destroyOnClose
      >
        <AvForm onValidSubmit={handleOk} ref={c => (form = c)}>
          <AvGroup>
              <AvField
                type="text"
                className="form-control"
                name="name"
                label="Name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: 'required field',
                  },
                  minLength: {
                    value: 3,
                    errorMessage: 'minimum lenght of 3',
                  },
                  maxLength: {
                    value: 50,
                    errorMessage: 'maximum lenght of 50',
                  },
                }}
                value={node.name}
                onChange
              />
          </AvGroup>
          {(doAdd || chosenNode.isLeaf) &&
          <AvGroup>
            <AvField
              name="link"
              label="Link"
              placeholder='link/to/report'
              type="link"
              value={node.link}
            />
          </AvGroup>
          }
          <Button onClick={handleCancel} replace color="info">
            <span className="d-none d-md-inline">
              Back
            </span>
          </Button>
          &nbsp;
          <Button color="primary" type="submit" disabled={isInvalid} style={{marginLeft: "10px"}} >
            Save
          </Button>
        </AvForm>
      </Modal>

      <div onMouseLeave={() => {setMenuOpen(false)}}
        className={'tree-menu ' + (menuOpen ? 'open' : 'colse')}
        style={{top: menuY, left: menuX}}>
          <Button color="primary" type="submit" onClick={() => showModal('add')} disabled={chosenNode.isLeaf || (chosenNode.key && chosenNode.key.startsWith("user"))}>
            <FontAwesomeIcon icon="plus" />
          </Button>
          <Button color="secondary" type="submit" onClick={() => showModal('edit')} disabled={chosenNode.key === 'root' || (chosenNode.key && chosenNode.key.startsWith("user"))}>
            <FontAwesomeIcon icon="pencil-alt" />
          </Button>
          <Button color="danger" type="submit" onClick={confirmDelete} disabled={chosenNode.key === 'root' || (chosenNode.key && chosenNode.key.startsWith("user"))}>
            <FontAwesomeIcon icon="trash" />
          </Button>
      </div>

    </>
  );
};

export default ReportTree;
