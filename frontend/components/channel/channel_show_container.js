import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import ChannelShow from './channel_show';
import { fetchAllUsers , fetchUser } from '../../actions/user_actions'
import { fetchAllChannels, fetchChannel, destroyChannel } from "../../actions/channel_actions";
import { fetchChannelMessages, fetchDirectMessages, receiveMessage } from '../../actions/message_actions'
import { fetchMemberships, destroyMembership } from '../../actions/membership_actions'
import { fetchUserDirects, fetchDirect } from '../../actions/direct_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        allChannels: state.entities.channels,
        memberships: state.entities.memberships,
        messages: state.entities.messages,
        currentChannel: state.entities.channels[ownProps.typeId],
        currentUser: state.entities.users[state.session.id],
        allUsers: state.entities.users,
        userDirects: state.entities.directs,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllChannels: () => dispatch(fetchAllChannels()),
        fetchChannelMessages: (channelId) => dispatch(fetchChannelMessages(channelId)),
        fetchDirectMessages: (directId) => dispatch(fetchDirectMessages(directId)),
        fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchMemberships: () => dispatch(fetchMemberships()),
        destroyMembership: (membershipId) => dispatch(destroyMembership(membershipId)),
        destroyChannel: (channelId) => dispatch(destroyChannel(channelId)),
        fetchUserDirects: (id) => dispatch(fetchUserDirects(id)),
        receiveMessage: message => dispatch(receiveMessage(message)),
        fetchDirect: (directId) => dispatch(fetchDirect(directId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow);
