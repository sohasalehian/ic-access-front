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
        const withRoot = [
          {
            title: 'Root',
            key: 'root',
            children: res.data.children
          }
        ];
        var root = res.data;
        root.key = 'root';
        var allKeys = this.getChildrenKeys(res.data);

        console.log(allKeys);

        this.setState({ treeData: withRoot, allKeys});
    });
  }

  state = {
    searchValue: '',
    selectedKeys: ['root'],
    expandedKeys: ['root'],
    treeData: [],
    menuOpen: false,
    chosenNode: '',
    isModalVisible: false,
    node: {
      name: '',
      link: '',
    },
    reload: false
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      searchValue: value,
      expandedKeys: value === '' ? ['root'] : this.state.allKeys
    });
  };

  render() {

    const onRightClick = (info) => {
      console.log(info.node);
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
      this.props.history.push(info.node.link);
      this.setState({selectedKeys: [info.node.key]});
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

    const isInvalid = false;
    var form = '';

    return (
      <div className="container">
        <div className='main-tree-container'>
          <div className='tree-container'>
          <Input style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />

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

          <div className='devider'>
          </div>
          <div className='details-container'>
          </div>

        </div>
        <Modal visible={this.state.isModalVisible} id='Modal' footer={null}
        title={this.state.doAdd ? 'Add ' : ('Edit ' + (this.state.chosenNode.isLeaf ? 'Report' : 'Category'))}>
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

      </div>
    );
  }
}

export default ListReportComponent;
