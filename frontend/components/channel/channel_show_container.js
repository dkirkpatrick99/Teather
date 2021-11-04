import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import ChannelShow from './channel_show';
import { fetchUsers , fetchUser } from '../../actions/user_actions'
import { fetchChannels, fetchChannel } from "../../actions/channel_actions";
import { fetchMessages } from '../../actions/message_actions'


const mapStateToProps = (state, ownProps) => {
    let currentChannel = state.entities.channels[ownProps.channelId]
    
    return {
        channels: state.entities.channels,
        memberships: state.entities.memberships,
        messages: state.entities.messages,
        currentChannel: currentChannel,
        currentUser: state.entities.users[state.session.id],
        // channelId: ownProps.channelID,
        allUsers: state.entities.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchChannels: () => dispatch(fetchChannels()),
        fetchMessages: () => dispatch(fetchMessages()),
        fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow);
