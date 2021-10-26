import { connect } from 'react-redux';
import React from 'react';
import { fetchUsers } from '../../actions/user_actions';
import { fetchChannels } from  '../../actions/channel_actions'
import { logout } from '../../actions/session_actions'

class BoardHeader extends React.Component{

    constructor(props) {
        super(props)
    }

    componentDidMount(props) {
        this.props.fetchUsers();
        this.props.fetchChannels();
    }

    render () {
        return (
            <div className="board-header-container">
                <div className="search-input-container">
                    <input className="search-input" type="text" placeholder="Search users and channels"/>
                    {/* <button className="header-button" onClick={this.props.logout}>Log Out</button>  */}
                </div>
                <div className="user-status-image">
                    <div>icon</div>
                </div>

            </div>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        allUsers: state.entities.users,
        allChannels: state.entities.channels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchChannels: () => dispatch(fetchChannels()),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);