import {
    request
} from '../request';

// 获取表格数据
export function getTable(params = {}) {
    return request({
        url: 'getTable',
        options: {
            method: 'POST',
            body: params
        }
    });
}