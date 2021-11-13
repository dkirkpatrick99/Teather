import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { fetchAllUsers } from '../../actions/user_actions'
import { fetchAllChannels } from "../../actions/channel_actions";

const mapStateToProps = (state) => {
    return {
        errors: state.errors.sessionErrors,
        formType: 'Login to',
        navLink: <Link to="/signup">sign up instead</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllChannels: () => dispatch(fetchAllChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
