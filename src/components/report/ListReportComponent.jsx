import React from 'react';
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

class ListReportComponent extends React.Component {

  componentDidMount () {
    this.fetchData();
  }

  componentDidUpdate () {
    if (this.state.reload) {
      this.fetchData();
      this.setState({reload: false});
    }
  }

  getChildrenKeys (node) {
    var allKeys = [node.key];
    node.children.forEach((item) => {
      this.getChildrenKeys(item).forEach((key) => {
        allKeys.push(key)
      });
    });
    return allKeys;
  }

  fetchData () {
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
        var allKeys = this.getChildrenKeys(res.data);

        this.setState({
          treeData,
          allKeys,
          selectedNode: rootNode
        });
    });
  }

  state = {
    searchValue: '',
    selectedKeys: ['root'],
    selectedNode: {},
    expandedKeys: ['root'],
    treeData: [],
    menuOpen: false,
    chosenNode: '',
    isModalVisible: false,
    node: {
      name: '',
      link: '',
    },
    reload: false,
    showConfig: false,
    // selectedSite: "E0016L"
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      searchValue: value,
      expandedKeys: value === '' ? ['root'] : this.state.allKeys
    });
  };

  hideModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  setSelectedSite = (selectedSite) => {
    console.log("============" + selectedSite);
    this.setState({selectedSite: selectedSite});
  };

  render() {

    const onRightClick = (info) => {
      info.node.selected = true;
      this.setState({
        menuOpen: true,
        chosenNode: info.node,
        selectedKeys: [info.node.key],
        menuX: info.event.screenX,
        menuY: info.event.screenY - 70
      });
    };

    const onSelect = (key, info) => {
      this.setState({
        selectedKeys: [info.node.key],
        selectedNode:info.node
      });
    };

    const filterTreeNode = (node) => {
      return(node.title.includes(this.state.searchValue));
    };

    const onExpand = (expandedKeys, info) => {
      this.setState({expandedKeys});
    };

    const confirmDelete = () => {
      let msg = this.state.chosenNode.isLeaf ?
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
                ReportService.deleteReport(this.state.chosenNode.id).then( res => {
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

              this.setState({
                isModalVisible: false,
                reload: true
              });
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
        this.setState({
          isModalVisible: true,
          doAdd: true,
        });
      } else {
        this.setState({
          isModalVisible: true,
          doAdd: false,
          node: {
            name: this.state.chosenNode.title,
            link: this.state.chosenNode.link
          }
        });
      }
    };

    const handleOk = (e, values) => {
      if (this.state.doAdd) {
        ReportService.createReport({
          name: values.name,
          parent: this.state.chosenNode.key === 'root' ? null : this.state.chosenNode.id,
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
          link: this.state.chosenNode.isLeaf ? values.link : null
        }, this.state.chosenNode.id).then( res => {
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

      this.setState({
        isModalVisible: false,
        reload: true
      });
      this.form && this.form.reset();
    };

    const handleCancel = () => {
      this.setState({
        isModalVisible: false
      });
      this.form && this.form.reset();
    };

    const isChartTest = () => {
      const id = parseInt(this.state.selectedKeys[0].replace('user','').replace('report',''));
      if (!id) {
        return false;
      }

      if (id % 2 === 0) {
        return false;
      }

      return true;
    }

    const isLeafSelected = () => {
      return this.state.selectedNode.isLeaf;
    }

    const isInvalid = false;
    var form = '';

    return (
      <>
        <div className='main-tree-container'>
          <div className='left-panel'>
            <div className={'config-tree-toggle ' + (this.state.showConfig ? 'light' : 'dark')}
              style={isLeafSelected() ? {} : {pointerEvents: "none", opacity: "0.4"}}>
              <ToggleButton disabled={true}
                inactiveLabel={<><FontAwesomeIcon icon="folder" />/<FontAwesomeIcon icon="folder-open" /></>}
                activeLabel={<><FontAwesomeIcon icon="chart-bar" />/<FontAwesomeIcon icon="cogs" /></>}
                activeLabelStyle={{color: '#414244'}}
                colors={{
                  activeThumb: {
                    base: 'rgb(62,130,247)',
                    hover: 'rgb(52,120,237)'
                  },
                  inactiveThumb: {
                    base: 'rgb(62,130,247)',
                    hover: 'rgb(52,120,237)'
                  },
                  active: {
                    base: '#b3b3b3',
                  },
                  inactive: {
                    base: 'rgb(65,66,68)',
                  }
                }}
                thumbAnimateRange={[-10, 36]}
                thumbStyle={{left: '0 !important'}}
                value={this.state.showConfig}
                onToggle={(value) => {
                  const prev = this.state.showConfig;
                  this.setState({
                    showConfig: !prev
                  });
                }} />
            </div>

            {(isLeafSelected() && this.state.showConfig) ?
              <ChartConfig setSelectedSite={this.setSelectedSite} selectedSite={this.state.selectedNode.link}/>
            :
              <div className='tree-container'>
                <Input placeholder="Search" onChange={this.onChange} />

                <DirectoryTree
                  multiple
                  defaultExpandAll
                  onRightClick={onRightClick}
                  onSelect={onSelect}
                  onExpand={onExpand}
                  treeData={this.state.treeData}
                  filterTreeNode={filterTreeNode}
                  selectedKeys={this.state.selectedKeys}
                  autoExpandParent={true}
                  expandedKeys={this.state.expandedKeys}
                />
              </div>
            }
          </div>
          <div className='right-panel'>
            {isLeafSelected() ?
              (isChartTest() ?
                <ChartTest />
              :
                <RechartsLineChart selectedSite={this.state.selectedSite} />
              )
            :
              <p>No Content</p>
            }
          </div>

        </div>



        <Modal visible={this.state.isModalVisible}
            id='Modal'
            footer={null}
            title={this.state.doAdd ? 'Add ' : ('Edit ' + (this.state.chosenNode.isLeaf ? 'Report' : 'Category'))}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            keyboard
            maskClosable
            destroyOnClose
        >
          <AvForm onValidSubmit={handleOk} ref={c => (this.form = c)}>
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
                  value={this.state.node.name}
                  onChange
                />
            </AvGroup>
            {(this.state.doAdd || this.state.chosenNode.isLeaf) &&
            <AvGroup>
              <AvField
                name="link"
                label="Link"
                placeholder='link/to/report'
                type="link"
                value={this.state.node.link}
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

        <div onMouseLeave={() => {this.setState({menuOpen: false})}}
          className={'tree-menu ' + (this.state.menuOpen ? 'open' : 'colse')}
          style={{top: this.state.menuY, left: this.state.menuX}}>
            <Button color="primary" type="submit" onClick={() => showModal('add')} disabled={this.state.chosenNode.isLeaf || (this.state.chosenNode.key && this.state.chosenNode.key.startsWith("user"))}>
              <FontAwesomeIcon icon="plus" />
            </Button>
            <Button color="secondary" type="submit" onClick={() => showModal('edit')} disabled={this.state.chosenNode.key === 'root' || (this.state.chosenNode.key && this.state.chosenNode.key.startsWith("user"))}>
              <FontAwesomeIcon icon="pencil-alt" />
            </Button>
            <Button color="danger" type="submit" onClick={confirmDelete} disabled={this.state.chosenNode.key === 'root' || (this.state.chosenNode.key && this.state.chosenNode.key.startsWith("user"))}>
              <FontAwesomeIcon icon="trash" />
            </Button>
        </div>

      </>
    );
  }
}

export default ListReportComponent;
