// import { connect } from 'react-redux';
// import Listener from './listener';
// import { receiveMessage } from '../../actions/message_actions';

// const mapStateToProps = (state, ownProps) => {
//     return ({
//         currentUser: state.session.id,
//         currentChannel: ownProps.typeId,
//         memberships: Object.values(state.entities.memberships)
//     })
// };

// const mapDispatchTopProps = dispatch => ({
//     receiveMessage: payload => dispatch(receiveMessage(payload))
// });

// export default connect(mapStateToProps, mapDispatchTopProps)(Listener);

import { connect } from "react-redux";
import Listener from "./listener";
import { fetchAllUsers, fetchUser } from "../../actions/user_actions";
import { fetchMemberships, receiveMembership } from "../../actions/membership_actions";
import { fetchChannel, fetchAllChannels } from "../../actions/channel_actions";
import { fetchAllDirects, fetchDirect } from "../../actions/direct_actions";
import { fetchAllMessages } from "../../actions/message_actions";

const mapState = state => {
    const currentUserId = !isNaN(state.session.id) ? state.session.id : state.session.id.id

    return {
        currentUser: currentUserId
    };
};

const mapDispatch = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllChannels: () => dispatch(fetchAllChannels()),
        fetchAllDirects: () => dispatch(fetchAllDirects()),
        fetchChannel: id => dispatch(fetchChannel(id)),
        fetchUser: id => dispatch(fetchUser(id)),
        fetchMemberships: () => dispatch(fetchMemberships()),
        fetchAllMessages: () => dispatch(fetchAllMessages()),
        receiveMembership: membership => dispatch(receiveMembership(membership)),
        fetchDirect: id => dispatch(fetchDirect(id)),
    };
};
export default connect(
    mapState,
    mapDispatch
)(Listener);