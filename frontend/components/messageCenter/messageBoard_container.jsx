import { connect } from 'react-redux';
import React from 'react';
import MessageBoard from './messageBoard';

const mapStateToProps = (state) => {
    return {
        // errors: state.errors.session,
        // formType: 'login',
        // navLink: <Link to="/signup">sign up instead</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processForm: (user) => dispatch(login(user)),
        // fetchUsers: () => dispatch(fetchUsers()),
        // fetchChannels: () => dispatch(fetchChannels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);