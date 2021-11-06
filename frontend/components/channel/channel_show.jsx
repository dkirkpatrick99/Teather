import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import MessageFromContainer from '../message/message_form'
import { getUserPic } from '../../util/functions'

class ChannelShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channelId: this.props.channelId,
            messages: this.props.messages
        }
    };

    componentDidMount(props) {
        this.props.fetchChannels();
        this.props.fetchUsers();
        this.props.fetchChannel(this.props.channelId)
            .then(payload => {
                this.setState({ channelId: Object.values(payload)[1].channel.id, messages: Object.values(payload)[1].messages})
            });

    }

    // componentDidUpdate(prevProps, prevState) {
    //     let prevMessages = Object.values(prevProps.messages);
    //     let prevChannelId = prevProps.channelId;
    //     let propChannelId = this.props.channelId
    //     if(prevChannelId && prevChannelId !== this.props.channelId) {
    //         this.getCurrentChannel(this.props)
    //     }
    //     if(prevMessages.length < Object.values(this.props.messages).length) {
    //         this.getCurrentChannel(this.props)
    //     }
    //     var elem = document.querySelector('.messages-main-container');
    //     if (elem) elem.scrollTop = elem.scrollHeight;
    //     const currentChannel = parseInt(this.props.channelId);
    //     if (Object.keys(this.props.memberships).length !== 0) {
    //         const check = Object.values(this.props.memberships).find(membership => membership.channel_id === currentChannel)
    //         if (!check) this.props.history.push(`/client/1`)
    //     }

    // }

    getCurrentChannel(props) {
        // let channelId = parseInt(props.channelID);
        let currentCh = props.fetchChannel(props.channelId)
            .then(payload => {
                this.setState({ channelId: Object.values(payload)[1].channel.id, messages: Object.values(payload)[1].messages })
            });
        return currentCh
    } 

    handleHistoryButtons(field) {
        if(field === 'back') {
            this.props.history.goBack()
        } else if(field === 'forward'){
            this.props.history.goForward()
        }
    }

    unsubscribe(){
        const membership = Object.values(this.props.memberships).find(membership => membership.channel_id === parseInt(this.props.channelId))
        if(membership) {
            this.props.deleteMembership(membership.id)
        }
    }

    deleteChannel() {
        this.props.deleteChannel(this.props.channelId)
    }

    render() {
        let currentMessages
        let channelName = "Loading Channel Name"
        let deleteChannelButton;
        let deleteMembershipButton;
        let showOption;
        if(this.props.currentChannel) {
            deleteChannelButton = this.props.currentChannel.admin_id === this.props.currentUser.id && this.props.currentChannel.name !== "Global" ? 
                    <div className='user-option-button' onClick={() => this.deleteChannel()}>Delete for everyone</div>
                : null
    
            deleteMembershipButton = this.props.currentChannel.name !== "Global" ? 
                <div className='user-option-button' onClick={() => this.unsubscribe()}>Unsubscribe</div>
                : null
            showOption = deleteChannelButton ? deleteChannelButton : deleteMembershipButton
        }

        if (this.state && Object.keys(this.props.allUsers).length > 1) {
            currentMessages = Object.keys(this.state.messages).length !== 0 ? 
                
                Object.values(this.state.messages).map(message => {
                    let date = new Date(message.created_at)
                    let dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
                    let formalName = this.props.allUsers[message.user_id].formal_name
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
                }) : "no messages"  
        }

        if(this.props.currentChannel && Object.keys(this.props.allUsers).length > 1){
            const channel = this.props.currentChannel;
            const dmName = this.props.currentUser.id === parseInt(channel.name) ? this.props.allUsers[channel.admin_id] : this.props.allUsers[channel.name]
            if(channel.is_dm) {
                channelName = dmName.formal_name
            } else {
                channelName = this.props.currentChannel.name
            }
        }
        
        return(
            <div className="channel-show-main">
                <div className="name-of-channel-container">
                    <div className='channel-show-options-flex'>
                        <div className="name-of-channel"># {channelName}</div>
                        {showOption}
                    </div>
                    <div className="history-buttons">
                        <input className='backward-history' onClick={() => this.handleHistoryButtons('back')} src='historyArrowBack.png' type="image" value='back'/>
                        <input className="forward-history" onClick={() => this.handleHistoryButtons('forward')} src='historyArrow.png' type="image" value='forward'/>
                    </div>
                </div>
                <div className="messages-main-container">
                    <ul className="messages-list">
                        {currentMessages}
                    </ul>
                </div>
                < MessageFromContainer channelName={channelName} channelId={this.state.channelId} currentUserId={this.props.currentUser.id}/>
                
            </div>
        )
    }

};

export default withRouter(ChannelShow);