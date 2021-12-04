import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import MessageFromContainer from '../message/message_form'
import { getUserPic, userChannels } from '../../util/functions'

class ChannelShow extends React.Component {

    constructor(props) {
        super(props);
        this.state;
    };

    componentDidMount(props) {
        console.log("didmount")
        this.props.fetchAllChannels();
        this.props.fetchAllUsers();
        this.props.fetchMemberships();
        if(this.props.currentUser){
            this.props.fetchUserDirects(this.props.currentUser.id)
        }
        if(this.props.type === 'channel'){
            this.props.fetchChannelMessages(this.props.typeId)
        } else if (this.props.type === 'direct') {
            this.props.fetchDirectMessages(this.props.typeId)
        }

        const { typeId, receiveMessage, type } = this.props;
        let check = false;
        let userNavables = userChannels(this.props.memberships, this.props.currentUser.id, this.props.allChannels, this.props.userDirects)
        if (this.props.type === 'channel') {
            check = userNavables.channels.includes(parseInt(typeId)) ? check = true : check = false
            if (!check) this.props.history.push(`/client/channel/1`)
        }
        if (this.props.type === 'direct') {
            check = userNavables.directs.includes(parseInt(typeId)) ? check = true : check = false
            if (!check) this.props.history.push(`/client/channel/1`)
        }
        this.configChat();

        // const chatType = type === "channel" ? "ChatChannel" : "ChatDirect"
        // App.channel = App.cable.subscriptions.create(
        //     { channel: chatType, id: typeId }, //slip data inside object and include id there history push
        //     {
        //         received: data => {
        //             let incomingMessage = JSON.parse(data.message);
        //             switch (data.type) {
        //                 case "message":
        //                     receiveMessage(incomingMessage);
        //                     break;
        //                 case "edit":
        //                     receiveMessage(incomingMessage);
        //                     break;
        //             }
        //         },
        //         speak: function (message) {
        //             return this.perform("speak", message);
        //         },
        //         load: function () {
        //             return this.perform("load");
        //         }
        //     }
        // );
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('compdidupdate')
        let prevTypeId = prevProps.typeId;
        let propTypeId = this.props.typeId
        let propsType = this.props.type
        let check = false;
        if(prevTypeId && prevTypeId !== this.props.typeId || prevProps.type !== this.props.type || prevProps.userDirects !== this.props.userDirects) {
            this.configChat()
            this.getCurrentChannel(this.props)
            let userNavables = userChannels(this.props.memberships, this.props.currentUser.id, this.props.allChannels, this.props.userDirects)
            if (this.props.type === 'channel') {
                check = userNavables.channels.includes(parseInt(propTypeId)) ? check = true : check = false
                if (!check) this.props.history.push(`/client/channel/1`)
            }  
            if (this.props.type === 'direct') {
                check = userNavables.directs.includes(parseInt(propTypeId)) ? check = true : check = false
                if (!check) this.props.history.push(`/client/channel/1`)
            }
        }
        if (!this.props.history.location.pathname.includes(propsType)) this.props.history.push(`/client/channel/1`)
        var elem = document.querySelector('.messages-main-container');
        if (elem) elem.scrollTop = elem.scrollHeight;

    }

    configChat() {
        console.log('config chat')
        const { type, receiveMessage } = this.props;
        const chatType = type === "channel" ? "ChatChannel" : "ChatDirect"
        App.channel = App.cable.subscriptions.create(
            { channel: chatType, id: this.props.typeId }, //slip data inside object and include id there history push
            {
                received: data => {
                    let incomingMessage = JSON.parse(data.message);
                    switch (data.type) {
                        case "message":
                            receiveMessage(incomingMessage);
                            break;
                        case "edit":
                            receiveMessage(incomingMessage);
                            break;
                    }
                },
                speak: function (message) {
                    return this.perform("speak", message);
                },
                // load: function () {
                //     debugger
                //     return this.perform("load");
                // }
            }
        );
    }

    getCurrentChannel(props) {
        if(this.props.type === 'channel'){
            props.fetchChannelMessages(props.typeId)
        } else if( this.props.type === 'direct') {
            props.fetchDirectMessages(props.typeId)
        }
    } 

    handleHistoryButtons(field) {
        if(field === 'back') {
            this.props.history.goBack()
        } else if(field === 'forward'){
            this.props.history.goForward()
        }
    }

    unsubscribe(){
        const membership = Object.values(this.props.memberships).find(membership => membership.memberable_id === this.props.currentChannel.id && membership.user_id === this.props.currentUser.id)
        if(membership) {
            this.props.destroyMembership(membership.id)
        }
    }

    deleteChannel() {
        if(this.props.type === 'channel'){
            this.props.destroyChannel(this.props.typeId)
        } else if(this.props.type === 'direct') {
            this.props.destroyDirect(this.props.typeId)
        }
        this.props.history.push(`/client/channel/1`)
    }

    render() {
        if (!this.props.currentUser) {
            return(
                <div></div>
            )
        }

        let currentMessages
        let channelName = "Loading Channel Name"
        let deleteChannelButton;
        let deleteMembershipButton;
        let showOption;
        let partySize = this.props.currentChannel ? <div>Party: {this.props.currentChannel.user_ids.length}</div> : null
        if(this.props.currentUser && this.props.currentChannel) {
            deleteChannelButton = this.props.type === 'direct' || (this.props.currentChannel.admin_id === this.props.currentUser.id && this.props.currentChannel.name !== "Global") ? 
                    <div className='user-option-button' onClick={() => this.deleteChannel()}>Delete for everyone</div>
                : null
    
            deleteMembershipButton = this.props.currentChannel.name !== "Global" ? 
                <div className='user-option-button' onClick={() => this.unsubscribe()}>Unsubscribe</div>
                : null
            showOption = deleteChannelButton ? deleteChannelButton : deleteMembershipButton
        }

        // if (this.state && Object.keys(this.props.allUsers).length > 1) {
            currentMessages = Object.keys(this.props.messages).length !== 0 ? 
                Object.values(this.props.messages).map(message => {
                    let date = new Date(message.created_at)
                    let dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
                    let formalName = message.formal_name
                    let pic = getUserPic(formalName)
                    return (
                        <li className="message-channel-show-contain" key={message.id}>
                            <img className="message-user-pic" src={pic} alt=""/>
                            <div className='message-item-contain'>
                                <div className='message-sender-contain'>
                                    <div className='message-sender-name'>{formalName}</div>
                                    <p className='message-time-stamp'>{dateFormat}</p>
                                </div>
                                <p className="message-body-text">{message.body}</p>
                            </div>
                        </li>)
                }) : "Loading messages..."  
        // }

        if(this.props.currentChannel && this.props.userDirects){
            channelName = this.props.type === "channel" ? this.props.currentChannel.name : this.props.userDirects[this.props.typeId].name
        }
        return(
            <div className="channel-show-main">
                <div className="name-of-channel-container">
                    <div className='channel-show-options-flex'>
                        <div className="name-of-channel"># {channelName}</div>
                        {showOption}
                    </div>
                    <div className='channel-show-users-container'>
                        {partySize}
                    </div>
                </div>

                <div className="messages-main-container">
                    <ul className="messages-list">
                        {currentMessages}
                    </ul>
                </div>
                < MessageFromContainer type={this.props.type} typeName={channelName} typeId={this.props.typeId} currentUserId={this.props.currentUser.id}/>
                
            </div>
        )
    }

};

export default withRouter(ChannelShow);