import axios from 'axios';
import router from '../router'
import {
  Toast
} from 'vant';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (!config.params.hideLoading) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
    }
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    Toast.clear();
    const data = response.data;
    return data;
  },
  error => {
    Toast.clear();
    const status = error.response.status;
    if (status == 401) {
      const current = router.currentRoute.fullPath;
      if (current != '/login') {
        router.push(`/login?redirect=${current}`)
      }
    } else if (status == 500) {
      Toast.fail('服务器异常');
    } else if (status != 200) {
      Toast.fail('请检查请求是否正确');
    }
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}
