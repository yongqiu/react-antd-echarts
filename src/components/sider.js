import React from 'react';

import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';

// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

let routeMap = {
    '/myIntroduce': '0',
    '/echarts/UserCountByDay': '1',
    '/echarts/AppStartCountByDay': '2',
    '/echarts/ErrorCountByDay': '3',
    '/table/QueryErrorPage': '4'
};// 配置导航
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
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="bars" /><span>ListPage</span></span>}>
                            <Menu.Item key="4"><Link to="/table/QueryErrorPage">新增设备</Link></Menu.Item>
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

export default Sider;