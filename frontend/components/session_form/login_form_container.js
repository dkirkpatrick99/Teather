import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { fetchUsers } from '../../actions/user_actions'
import { fetchChannels } from "../../actions/channel_actions";

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'Login to',
        navLink: <Link to="/signup">sign up instead</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchChannels: () => dispatch(fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
