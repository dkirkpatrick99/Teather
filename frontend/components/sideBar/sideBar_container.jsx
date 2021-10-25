import { connect } from 'react-redux';
import React from 'react';
import SideBar from './sideBar';
import { fetchChannels, fetchChannel, createChannel} from '../../actions/channel_actions'
import { fetchUsers, fetchUser } from '../../actions/user_actions'

const mapStateToProps = (state) => {
    return {
        userChannels: state.entities.channels,
        currentUser: state.entities.users[state.session.id],
        memberships: state.entities.memberships
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchChannels: () => dispatch(fetchChannels()),
        createChannel: (channel) => dispatch(createChannel(channel))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);