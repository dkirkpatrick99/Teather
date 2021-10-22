import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import ChannelShow from './channel_show';
import { fetchUsers } from '../../actions/user_actions'
import { fetchChannels } from "../../actions/channel_actions";

const mapStateToProps = (state) => {
    return {
        channels: state.entities.channels,
        memberships: state.entities.memberships,
        messages: state.entities.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchChannels: () => dispatch(fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow);
