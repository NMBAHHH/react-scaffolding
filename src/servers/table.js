import {
    request
} from '../request';

// 获取表格数据
export function getTable(params = {}) {
    return request({
        url: 'getTable',
        options: {
            method: 'POST',
            body: params,
        }
    });
}

// get请求
export function get(params) {
    return request({
        url: `get?count=${count}&selectValue=${selectValue}`,
        options: {
            method: 'GET',
            body: params,
        }
    });
}