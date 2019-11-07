/* eslint-disable no-undef */
/*
 * Socket集成
 * @Author: Jiang
 * @Date: 2019-08-27 18:00:15
 * @Last Modified by: Jiang
 * @Last Modified time: 2019-11-07 11:03:14
 */
import io from 'socket.io-client';
import { SOCKET_URL } from '../../config';

let SOCKET = '', USER = '';

const agentOnline = () => {
    if(sessionStorage.user) {
        if(!SOCKET) {
            SOCKET = io(SOCKET_URL);
        }
        SOCKET.emit('agentOnline', { loginName: USER.loginName });
    }
};

const agentOffline = () => {
    if(sessionStorage.user) {
        USER = JSON.parse(sessionStorage.user);
        SOCKET.emit('agentOffline', { loginName: USER.loginName });
    }
};

const disconnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.on('disconnect');
};

const disconnectFn = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.disconnect();
};

const offConnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.off('connect');
};

const onConnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.on('connect', () => {
        agentOnline();
    });
};

const removeAllListeners = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.removeAllListeners();
};

export {
    agentOnline,
    agentOffline,
    disconnect,
    disconnectFn,
    offConnect,
    onConnect,
    removeAllListeners
};
