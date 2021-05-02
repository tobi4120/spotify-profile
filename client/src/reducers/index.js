import { combineReducers } from 'redux';

const userReducer = (current_user={}, action) => {
    switch (action.type) {
        case "GET_USER_INFO":

            return action.payload.data

        default:
            return current_user;
    }
};

export default combineReducers({
    current_user: userReducer,
});