import {
    request
} from '../request';

export function getTable() {
    return request({
        url: 'getTable',
        options: {
            method: 'GET'
        }
    });
}