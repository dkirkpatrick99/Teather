import React from 'react';
import { connect } from 'react-redux';
// import MessageBoard from './messageBoard';
import SideBarContainer from '../sideBar/sideBar_container'
import BoardHeader from '../boardHeader/boardHeader'
import ChannelShowContainer from '../channel/channel_show_container'
import { logout } from '../../actions/session_actions'

class MessageBoard extends React.Component {

    constructor(props) {
        super(props);
    };

    render(){
        return (
            <div className="client-main-container">
                <BoardHeader />
                <div className="flex-container">
                <SideBarContainer />
                <ChannelShowContainer />
                </div>
                
            </div>

        )
    }

}

// export default MessageBoard



const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(MessageBoard);