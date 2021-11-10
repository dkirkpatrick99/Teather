import { connect } from 'react-redux';
import React from 'react';
import SideBar from './sideBar';
import { fetchChannels, fetchChannel, createChannel} from '../../actions/channel_actions'
import { fetchUsers, fetchUser } from '../../actions/user_actions'
import { logout } from '../../actions/session_actions'
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = (state, ownProps) => {
    // debugger
    return {
        userChannels: state.entities.channels,
        currentUser: state.entities.users[state.session.id],
        memberships: state.entities.memberships,
        channelID: ownProps.channelId.channel_id,
        allUsers: state.entities.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchChannels: () => dispatch(fetchChannels()),
        createChannel: (channel) => dispatch(createChannel(channel)),
        logout: () => dispatch(logout()),
        openModal: modal => dispatch(openModal(modal))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);