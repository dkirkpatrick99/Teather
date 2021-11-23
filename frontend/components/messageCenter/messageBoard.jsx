import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
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

const MessageBoard = (props) => {

    useEffect(() => {
        props.fetchAllUsers()
            .then(() => {
                props.fetchAllChannels();
            }
            )
        App.NotificationsChannel = App.cable.subscriptions.create(
            { channel: "NotificationsChannel", currentUserId: props.currentUser },
            {
                received: data => {
                    switch (data.type) {

                        case "membershipAdd":
                            props
                                .receiveMembership(data.membership);
                            break;
                        case "directAdd":
                            props
                                .fetchDirect(data.directId);
                            break;
                        case "channelAdd":
                            props
                                .fetchChannel(data.channelId);
                            break;
                        case "userAdd":
                            props.fetchUserDirects(props.currentUser);
                            props
                                .fetchUser(data.userId);

                            break;
                    }
                }
            }
        );
    }, [])

    useEffect(() => {
        App.NotificationsChannel.unsubscribe();
    }) 
    
    // componentWillUnmount() {
    //     App.NotificationsChannel.unsubscribe();
    // }

    

    // houses all of the main app components and is the only route rendered while 
    // a user is logged in
    return (
        <div className="client-main-container">
            <BoardHeader history={props.history} />
            <div className="flex-container">
                <SideBarContainer type={props.type} typeId={props.typeId}/>
                <ChannelShowContainer type={props.type} typeId={props.typeId} history={props.history}/>
            </div>
            {/* <ListenerContainer type={this.props.type} typeId={this.props.typeId}/> */}
            <Modal history={props.history}/>
            
        </div>

    )

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