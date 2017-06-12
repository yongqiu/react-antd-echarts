'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';

// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

// 引入单个页面（包括嵌套的子页面）
import myIntroduce from './introduce.js';   
import UserCountByDay from './echarts/UserCountByDay.js';       //表格
import AppStartCountByDay from './echarts/AppStartCountByDay.js';         //表单
import ErrorCountByDay from './echarts/ErrorCountByDay.js';    
import QueryErrorPage from './table/table.js';


let routeMap = {
    '/myIntroduce': '0',
    '/echarts/UserCountByDay': '1',
    '/echarts/AppStartCountByDay': '2',
    '/echarts/ErrorCountByDay': '3',
    '/table/QueryErrorPage': '4'
};

// 配置导航
class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            username: ''
        };
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    componentWillMount() {
        var route = this.props.location.pathname;   
        this.setState({
            current: routeMap[route] || '0'
        });
    }

    componentDidMount() {
        this.setState({
            username: 'wyq'
        });
    }

    render() {
        return (
            <div>
                <div id="leftMenu">
                    <img src={require('../images/logo.png')} width="50" id="logo"/>
                    <Menu theme="dark"
                        onClick={this.handleClick.bind(this)}
                        style={{ width: 200 }}
                        defaultOpenKeys={['sub1', 'sub2']}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <Menu.Item key="0"><Link to="/myIntroduce"><Icon type="mail" />Dashboard</Link></Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="bars" /><span>CountCharts</span></span>}>
                            <Menu.Item key="1"><Link to="/echarts/UserCountByDay">UserCount</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/echarts/AppStartCountByDay">AppStart</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/echarts/ErrorCountByDay">ErrorCount</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="bars" /><span>ListPage</span></span>}>
                            <Menu.Item key="4"><Link to="/table/QueryErrorPage">新增设备</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/table/QueryErrorPage">错误列表</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


// 配置路由
ReactDom.render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <IndexRoute component={myIntroduce} />
            <Route path="myIntroduce" component={myIntroduce} />
            <Route path="echarts/UserCountByDay" component={UserCountByDay} />
            <Route path="echarts/AppStartCountByDay" component={AppStartCountByDay} />
            <Route path="echarts/ErrorCountByDay" component={ErrorCountByDay} />
            <Route path="/table/QueryErrorPage" component={QueryErrorPage} />
        </Route>
    </Router>
), document.getElementById('app'));
