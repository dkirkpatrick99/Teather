import React from 'react';
import { connect } from 'react-redux';
// import MessageBoard from './messageBoard';
import SideBarContainer from '../sideBar/sideBar_container'
import BoardHeader from '../boardHeader/boardHeader'
import ChannelShowContainer from '../channel/channel_show_container'
import { logout } from '../../actions/session_actions'
import { fetchAllUsers, fetchUser } from "../../actions/user_actions";
import { fetchMemberships, receiveMembership } from "../../actions/membership_actions";
import { fetchChannel, fetchAllChannels } from "../../actions/channel_actions";
import { fetchAllDirects, fetchDirect, fetchUserDirects } from "../../actions/direct_actions";
import { fetchAllMessages } from "../../actions/message_actions";
// import ListenerContainer from '../channel/listener_container';
import Modal from '../modal/modal';

class MessageBoard extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        debugger
        this.props.fetchAllUsers()
            .then(() => {
                this.props.fetchAllChannels();
            //     this.props.fetchAllDirects();
            //     this.props.fetchMemberships();
            //     this.props.fetchAllMessages();
            }
        )
        App.NotificationsChannel = App.cable.subscriptions.create(
            { channel: "NotificationsChannel", currentUserId: this.props.currentUser },
            {
                received: data => {
                    debugger
                    switch (data.type) {

                        case "membershipAdd":
                            this.props
                                .receiveMembership(data.membership);
                            break;
                        case "directAdd":
                            this.props
                                .fetchDirect(data.directId);
                            break;
                        case "channelAdd":
                            this.props
                                .fetchChannel(data.channelId);
                            break;
                        case "userAdd":
                            this.props.fetchUserDirects(this.props.currentUser);
                            this.props
                                .fetchUser(data.userId);

                            break;
                    }
                }
            }
        );
    }
    componentDidUpdate() { }

    componentWillUnmount() {
        App.NotificationsChannel.unsubscribe();
    }

    

    // houses all of the main app components and is the only route rendered while 
    // a user is logged in
    render(){
        return (
            <div className="client-main-container">
                <BoardHeader history={this.props.history} />
                <div className="flex-container">
                    <SideBarContainer type={this.props.type} typeId={this.props.typeId}/>
                    <ChannelShowContainer type={this.props.type} typeId={this.props.typeId} history={this.props.history}/>
                </div>
                {/* <ListenerContainer type={this.props.type} typeId={this.props.typeId}/> */}
                <Modal history={this.props.history}/>
                
            </div>

        )
    }

}

// export default MessageBoard

const mapSTP = (state, ownProps) => {
    const currentUserId = !isNaN(state.session.id) ? state.session.id : state.session.id.id
    return {
        // channelId: ownProps.match.params,
        currentUser: currentUserId,
        type: ownProps.match.params.type,
        typeId: ownProps.match.params.type_id,
        history: ownProps.history
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllChannels: () => dispatch(fetchAllChannels()),
        fetchAllDirects: () => dispatch(fetchAllDirects()),
        fetchChannel: id => dispatch(fetchChannel(id)),
        fetchUser: id => dispatch(fetchUser(id)),
        fetchMemberships: () => dispatch(fetchMemberships()),
        fetchAllMessages: () => dispatch(fetchAllMessages()),
        receiveMembership: membership => dispatch(receiveMembership(membership)),
        fetchDirect: id => dispatch(fetchDirect(id)),
        fetchUserDirects: (userId) => dispatch(fetchUserDirects(userId))
    };
};

export default connect(mapSTP, mapDispatchToProps)(MessageBoard);