import { combineReducers } from 'redux';

const userReducer = (current_user={}, action) => {
    switch (action.type) {
    
        default:
            return current_user;
    }
};

export default combineReducers({
    current_user: userReducer,
});