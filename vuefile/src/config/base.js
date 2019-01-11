import promise from 'es6-promise';
import axios from "axios";
import qs from 'qs'
import jsonp from 'jsonp'
promise.polyfill()
var baseUrl = '/'
// // 环境判断
if (process.env.NODE_ENV === 'development') {
 baseUrl = 'http://localhost:8082'
} else {
  baseUrl = process.env.API_URL
}
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
  headers: {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json; charset=UTF-8'
	}
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.type == 'formData' || config.method != 'post'){
      return config
    }
    config.data = qs.stringify(config.data)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
export function post(url,params) {
	return instance({
		url,
		method: "post",
		params,
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		}
  })
}

export function get(url,params) {
	return instance({
		url,
		method: "get",
		params
	})
}
export function getJsonp(url,data,option){
  url+=(url.indexOf("?") < 0 ? "?" : "&") + params(data) 
  return new Promise(function(resolve,reject){
  jsonp(url,option,(err,data)=>{
      if(!err){
          resolve(data)
      }else{
          reject(err)
      }
  })
})
}
function params(data){
  let url='';
  for(let k in data){
      let val = data[k]!==undefined?data[k]:''
      url+=`&${k}=${encodeURIComponent(val)}`
  }
return url?url.substring(1):''
}

// import axios from 'axios'
// var baseUrl = '/'
// // var version = '1.0.1'
// // 环境判断
// if (process.env.NODE_ENV === 'development') {
//   // baseUrl = 'http://192.168.8.32:8082/'
// } else if (process.env.NODE_ENV === 'test') {
//   baseUrl = 'test'
// } else if (process.env.NODE_ENV === 'production') {
//   baseUrl = 'prodction'
// }

// // http://localhost:9010/department/querySubDepar
// let axi = axios.create({
//   baseUrl: baseUrl,
//   timeOut: 8000,
//   headers: {
//     'Content-Type': 'application/json; charset=UTF-8'
//   }
// })
// var get = (params) => {
//   return axi.get(params.url).then(response => {
//     params.success && params.success(response.data)
//   }).catch((error) => {
//     params.fail && params.fail(error)
//   })
// }
// let post = (refs) => {
//   // 判断是否有数据 转换为表单数据
//   var formData = new FormData()
//   if (refs.data) {
//     for (var key in refs.data) {
//       formData.append(key, refs.data[key])
//     }
//     refs.data = formData
//   }
//   return axi({
//     method: 'post',
//     url: refs.url,
//     data: refs.data,
//     headers: {
// 			'Content-Type': 'application/json; charset=UTF-8'
// 		}
//   }).then(res => {
//     refs.success && refs.success(res.data)
//   }).catch(error => {
//     refs.fail && refs.fail(error)
//   })
// }
// export {post, get}
