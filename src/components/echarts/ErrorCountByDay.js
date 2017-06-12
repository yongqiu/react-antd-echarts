import React, { Component, PropTypes } from 'react';
import { Menu, Dropdown, Icon, message } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import * as Service from '../../services/getUserCountServer';
import '../../styles/echarts.css';

//定义props
let defaultProps = {
    className:'Echartsaaa',
}


class AppStartCountByDay extends Component {
    static propTypes = {
        className: PropTypes.string,
    };
    constructor(props) {
        super(props);
        this.state= {
            androidData :{},
            myDate:[],
            countDay:7
        }
    };
    requestServer(countDay){
        let newDate = new Date();
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
        let today = Date.parse(newDate);
        let trargtday = today - (countDay-1)*24*3600*1000;
        let requestData = {
            headers: {
                'Authorization': '96179ce8939c4cdfacba65baab1d5ff8',
                'Accept-Language':'en-US'
            },
            urldata:{
                appid:'01',
                startdate:trargtday,
                enddate:today,
                os:'android'
            }
        };
        Service.getErrorCountByDay(requestData).then(function(result){
          console.log(result)
            this.setState({
              androidData:result
            })
            this.showChart(countDay);
        }.bind(this));
    };
    componentDidMount() {
        this.requestServer(7);
    };
    getNewDate = (countDay) =>{
      let myDate =[];
      for (let i = 0; i<countDay; i++){
        let newDate = new Date();
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
        let today = Date.parse(newDate);
        let trargtday = today - i*24*3600*1000;
        myDate.push(trargtday);
      };
      this.setState({
        myDate:myDate
      })  
    };
    //获取y轴型号对应的数据
    getModelData =(Model,countDay) =>{
      let myDate = this.state.myDate;
      let resDate = [];
      let Modeldata = [];
      for (let i = 0; i<Model.length; i++) {
        let newDate = new Date(Model[i].day);
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
        let getday = Date.parse(newDate);    
        resDate.push(getday); 
      }
      for(let i = 0; i<countDay; i++){
        let index = resDate.indexOf(myDate[i]);

        if (index >= 0) {
          Modeldata[i] = Model[index].errorcount;
        }else{
          Modeldata[i] = 0;
        }
      }
      let reModeldata = Modeldata.reverse();
      return reModeldata;
    };
    //获取x轴时间轴
    getDateLine = (countDay)=>{
      let myDate = this.state.myDate;
      let dateline= [];
      for (let i = 0; i<countDay; i++){
        let date = new Date(myDate[i]);
        let month = date.getMonth()+ 1;
        let day = date.getDate();
        let str = `${month}月${day}日`;
        dateline.push(str);
      }
      let reDateline = dateline.reverse();
      return reDateline;
    };

    showChart = (countDay) => {
      var android = this.state.androidData.data.rows;
      this.getNewDate(countDay);
      let Modeldata = this.getModelData(android,countDay);
      let dateline = this.getDateLine(countDay);
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption({
          title:{
            text:'Get app start count per day'
          },
          tooltip : {
              trigger: 'axis'
          },
          legend: {
              data:['Android'],
              show:true
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : dateline
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'Android',
                  type:'line',
                  stack: '总量',
                  data:Modeldata
              },
          ]
      });
    };
    selectClick =({key}) =>{
      let ret = key.split("_")[1];
      let countDay;
      if (ret == 0) {
        countDay = 7;
      }else if(ret == 1){
        countDay = 15;
      }else{
        countDay = 31;
      }
      this.requestServer(countDay);
    };
    render() {
        const ChoiceDate = () => {
                const menu = (
                  <Menu onClick={this.selectClick}>
                    <Menu.Item>
                      <a key="1" rel="noopener noreferrer" href="javascript:;">一周内</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a key="2" rel="noopener noreferrer" href="javascript:;">15日内</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a key="3" rel="noopener noreferrer" href="javascript:;">30日内</a>
                    </Menu.Item>
                  </Menu>
                );
                return (
                  <div className="choiceBox"> 
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" href="javascript:;">
                        选择查看的日期 <Icon type="down" />
                      </a>
                    </Dropdown>   
                  </div>
                   
                );
        }
        return (
            <div>
              <ChoiceDate/>
              <div id="main" style={{ width: 900, height: 450 }} className="chartsbox"></div>  
            </div>
            
        );
    }
}

AppStartCountByDay.defaultProps = defaultProps;
export default AppStartCountByDay;