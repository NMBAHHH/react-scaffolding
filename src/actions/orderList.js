import * as api from '../servers/table';

// 获取表格数据
export const GET_TABLE = 'getTable';
export function getTable(params) {
    return {
        type: GET_TABLE,
        payload: api.getTable(params)
    };
}