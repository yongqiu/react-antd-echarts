import React, { Component, PropTypes } from 'react';
import { Table, Icon } from 'antd';
const columns = [{
  title: 'ERROR',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'id',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'details',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="javascript:;">Delete</a>
      <span className="ant-divider" />
    </span>
  ),
}];
const data = [{
  key: '1',
  name: '暂无数据',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: '暂无数据',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: '暂无数据',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
class  QueryErrorPage extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}

export default QueryErrorPage;
