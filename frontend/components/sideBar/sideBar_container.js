import { connect } from 'react-redux';
import React from 'react';
import SideBar from './sideBar';
import { fetchAllChannels, fetchChannel, createChannel} from '../../actions/channel_actions'
import { fetchAllUsers, fetchUser } from '../../actions/user_actions'
import { logout } from '../../actions/session_actions'
import { openModal } from '../../actions/modal_actions';
import { fetchUserDirects } from '../../actions/direct_actions'


const mapStateToProps = (state, ownProps) => {
    debugger
    return {
        userChannels: state.entities.channels,
        currentUser: state.entities.users[state.session.id],
        memberships: state.entities.memberships,
        channelID: ownProps.channelId.channel_id,
        allUsers: state.entities.users,
        userDirects: state.entities.directs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchAllChannels: () => dispatch(fetchAllChannels()),
        createChannel: (channel) => dispatch(createChannel(channel)),
        logout: () => dispatch(logout()),
        openModal: modal => dispatch(openModal(modal)),
        fetchUserDirects: () => dispatch(fetchUserDirects(id))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);