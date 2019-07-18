// 合并特定的reducer
export function getObjReducer(state, payload, target) {
    if(!state && !payload) {
        return;
    }
    let oldState = state.toJS();
    return Object.assign({}, oldState[target], payload);
}

// 根据当前域名，获取不同的环境
export function getApi() {
    let getApi = '';
    if(location.hostname === 'localhost') {
        // 本地环境
        getApi = '//localhost:9000/api/v1/';
    }
    if(location.hostname === 'downfuture.com') {
        // 正式环境
        getApi = '//downfuture.com:9000/api/v1/';
    }
    return getApi;
}
