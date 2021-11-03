import React from 'react';
import { connect } from 'react-redux';
// import MessageBoard from './messageBoard';
import SideBarContainer from '../sideBar/sideBar_container'
import BoardHeader from '../boardHeader/boardHeader'
import ChannelShowContainer from '../channel/channel_show_container'
import { logout } from '../../actions/session_actions'
import ListenerContainer from '../channel/listener_container';
import Modal from '../modal/modal';

class MessageBoard extends React.Component {

    constructor(props) {
        super(props);
    };

    // houses all of the main app components and is the only route rendered while 
    // a user is logged in
    render(){
        return (
            <div className="client-main-container">
                <BoardHeader />
                <div className="flex-container">
                <SideBarContainer channelId={this.props.channelId}/>
                <ChannelShowContainer channelId={this.props.channelId.channel_id}/>
                </div>
                <ListenerContainer />
                <Modal />
                
            </div>

        )
    }

}

// export default MessageBoard

const mapSTP = (state, ownProps) => {
    return {
        channelId: ownProps.match.params
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapSTP, mapDispatchToProps)(MessageBoard);