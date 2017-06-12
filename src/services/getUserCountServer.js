import fetch from 'isomorphic-fetch';
let headers = { 
  'Accept': 'application/json', 
  'Content-Type': 'application/json',
  'Accept-Language': 'en-US',
  'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
};

let body = {
  appid: '1003', 
  userid: localStorage.username ? localStorage.username : sessionStorage.username,
  buyername: localStorage.username ? localStorage.username : sessionStorage.username
};

function parseJSON(response) {
    return response.json();
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({ data }))
        .catch((err) => ({ err }));
};

export function getUserCountByDay(values) {
  var urldata = values.urldata;
  const requestURL = 'http://120.76.128.139:7180' + '/device/getUserCountByDay?appid='+urldata.appid+'&startdate='+urldata.startdate+'&enddate='+urldata.enddate+'&os='+urldata.os;
  let requestData = {
    method: 'GET',
    headers: { ...headers , ...values.headers }
  };
  return request( requestURL , requestData );
}


export function getAppStartCountByDay(values) {
  var urldata = values.urldata;
  const requestURL = 'http://120.76.128.139:7180' + '/device/getAppStartCountByDay?appid='+urldata.appid+'&startdate='+urldata.startdate+'&enddate='+urldata.enddate+'&os='+urldata.os;
  let requestData = {
    method: 'GET',
    headers: { ...headers , ...values.headers }
  };
  return request( requestURL , requestData );
}

export function getErrorCountByDay(values) {
  var urldata = values.urldata;
  const requestURL = 'http://120.76.128.139:7180' + '/device/getErrorCountByDay?appid='+urldata.appid+'&startdate='+urldata.startdate+'&enddate='+urldata.enddate+'&os='+urldata.os;
  let requestData = {
    method: 'GET',
    headers: { ...headers , ...values.headers }
  };
  return request( requestURL , requestData );
}