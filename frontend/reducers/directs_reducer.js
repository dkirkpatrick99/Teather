import {
    RECEIVE_ALL_DIRECTS,
    RECEIVE_DIRECT,
    REMOVE_DIRECT
} from "../actions/direct_actions";

import merge from "lodash/merge";

export default (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_ALL_DIRECTS:
            return merge({}, action.directs);
        case RECEIVE_DIRECT:
            return merge({}, state, { [action.direct.id]: action.direct });
        case REMOVE_DIRECT:
            newState = merge({}, state);
            delete newState[action.directId];
            return newState;
        default:
            return state;
    }
};