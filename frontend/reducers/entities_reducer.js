import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import channelsReducer from "./channels_reducer";
import membershipsReducer from "./memberships_reducer";
import messagsReducer from "./messages_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    messages: messagsReducer,
    memberships: membershipsReducer
});

export default entitiesReducer;