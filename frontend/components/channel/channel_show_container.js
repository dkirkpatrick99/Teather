import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import ChannelShow from './channel_show';
import { fetchAllUsers , fetchUser } from '../../actions/user_actions'
import { fetchAllChannels, fetchChannel, destroyChannel } from "../../actions/channel_actions";
import { fetchChannelMessages, fetchDirectMessages, receiveMessage } from '../../actions/message_actions'
import { fetchMemberships, destroyMembership } from '../../actions/membership_actions'
import { fetchUserDirects, fetchDirect, destroyDirect } from '../../actions/direct_actions'

const mapStateToProps = (state, ownProps) => {
    const currentUserId = !isNaN(state.session.id) ? state.session.id : state.session.id.id
    const currentChannel = ownProps.type === "channel" ? state.entities.channels[ownProps.typeId] : state.entities.directs[ownProps.typeId]
    return {
        allChannels: state.entities.channels,
        memberships: state.entities.memberships,
        messages: state.entities.messages,
        currentChannel: currentChannel,
        currentUser: state.entities.users[currentUserId],
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
        destroyDirect: (directId) => dispatch(destroyDirect(directId)),
        fetchUserDirects: (id) => dispatch(fetchUserDirects(id)),
        receiveMessage: message => dispatch(receiveMessage(message)),
        fetchDirect: (directId) => dispatch(fetchDirect(directId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow);
