import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import { fetchAllUsers } from '../../actions/user_actions'
import { fetchAllChannels } from "../../actions/channel_actions";

const mapStateToProps = (state) => {
    debugger
    return {
        errors: state.errors.sessionErrors,
        formType: 'Sign Up for',
        navLink: <Link to="/login">log in instead</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllChannels: () => dispatch(fetchAllChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
