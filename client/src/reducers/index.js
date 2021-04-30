import { combineReducers } from 'redux';

const userReducer = (current_user={}, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log(action.payload)

            return current_user

        default:
            return current_user;
    }
};

export default combineReducers({
    current_user: userReducer,
});