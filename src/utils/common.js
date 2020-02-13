import { CONSTANT } from './constant.js';

// 拼接url
export function getUrl(url) {
  let temp = url.replace(CONSTANT.host, '');
  let result;
  if (temp.indexOf('?') >= 0) {
    result = [temp, '&udid=', CONSTANT.udid];
  } else {
    result = [temp, '?udid=', CONSTANT.udid];
  }
  result.push('&vc=580&deviceModel=ONEPLUS%20A6000');
  return result.join('');
}
