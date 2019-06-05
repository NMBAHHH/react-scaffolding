const initialState = {
    card: {},
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CARD':
            return Object.assign({}, state, {
                card: action
            });
        default:
            return state;
    }
};
export default home;
