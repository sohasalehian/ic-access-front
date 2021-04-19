import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Tree } from 'antd';
import ReportService from "../services/report.service";

const { DirectoryTree } = Tree;

const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      {
        title: 'leaf 0-0',
        key: '0-0-0',
      },
      {
        title: 'leaf 0-1',
        key: '0-0-1',
      },
      {
        title: 'parent 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf 0-0-2-0',
            key: '0-0-2-0',
            isLeaf: true,
          },
          {
            title: 'leaf 0-0-2-1',
            key: '0-0-2-1',
            isLeaf: true,
          },
        ],
      }
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      {
        title: 'leaf 1-0',
        key: '0-1-0',
        isLeaf: true,
      },
      {
        title: 'leaf 1-1',
        key: '0-1-1',
        isLeaf: true,
      },
    ],
  },
];

class TreeTest extends React.Component {

  componentDidMount () {
    ReportService.getAllReports().then((res) => {
        console.log(res.data.children);
        const withRoot = [
          {
            title: 'Root',
            key: 'root',
            children: res.data.children
          }
        ];
        this.setState({ treeData: withRoot});
    });
  }

  state = {
    treeData: [],
    menuOpen: false,
    chosenNode: '',
  };

  render() {
    const onSelect = (keys, info) => {
      console.log('Trigger Select', keys, info);
      console.log(info.node);
      if (info.node.isLeaf) {
        // this.props.history.push(info.node.link);
        this.setState({menuOpen: true, chosenNode: info.node})
        console.log(info.node.link);
      } else {
        this.setState({menuOpen: true, chosenNode: info.node})
        console.log(this.state);
      }
    };

    const onExpand = () => {
      console.log('Trigger Expand');
    };

    return (
      <div className='main-tree-container'>
        <div className='tree-container'>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={this.state.treeData}
          />
        </div>

        <div className={'tree-menu ' + (this.state.menuOpen ? 'open' : 'colse')}>
          <span> name: </span>
          <span> {this.state.chosenNode.title} </span>
          {this.state.chosenNode.isLeaf ?
            <div>
              <span> link: </span>
              <span> {this.state.chosenNode.link} </span>
              <a href={'/edit-leaf/'+this.state.chosenNode.key}> edit </a>
            </div>
          :
            <div>
              <a href={'/add-leaf/'+this.state.chosenNode.key}> add leaf </a>
              <a href={'/add-category/'+this.state.chosenNode.key}> add category </a>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default TreeTest;
