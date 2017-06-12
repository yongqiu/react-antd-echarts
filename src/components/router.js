'use strict';
import ReactDom from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
// 引入单个页面（包括嵌套的子页面）
import myIntroduce from './introduce.js';   
import UserCountByDay from './echarts/UserCountByDay.js';       //表格
import QueryErrorPage from './table/table.js';
import Sider from './sider.js';




// 配置路由
ReactDom.render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <IndexRoute component={myIntroduce} />
            <Route path="myIntroduce" component={myIntroduce} />
            <Route path="echarts/UserCountByDay" component={UserCountByDay} />
            <Route path="/table/QueryErrorPage" component={QueryErrorPage} />
        </Route>
    </Router>
), document.getElementById('app'));
