import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import MessageFromContainer from '../message/message_form'

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
        // debugger
        this.props.fetchChannel(this.props.channelId)
            .then(payload => {
                this.setState({ channelId: Object.values(payload)[1].channel.id, messages: Object.values(payload)[1].messages})
            });

    }

    componentDidUpdate(prevProps, prevState) {
        let prevMessages = Object.values(prevProps.messages);
        let prevChannelId = prevProps.channelId;
        let propChannelId = this.props.channelId
        if(prevChannelId && prevChannelId !== this.props.channelId) {
            this.getCurrentChannel(this.props)
        }
        if(prevMessages.length < Object.values(this.props.messages).length) {
            this.getCurrentChannel(this.props)
        }
        var elem = document.querySelector('.messages-main-container');
        if (elem) elem.scrollTop = elem.scrollHeight;
    }

    getCurrentChannel(props) {
        // let channelId = parseInt(props.channelID);
        let currentCh = props.fetchChannel(props.channelId)
            .then(payload => {
                this.setState({ channelId: Object.values(payload)[1].channel.id, messages: Object.values(payload)[1].messages })
            });
        return currentCh
    } 

    render() {
        let currentMessages
        let channelName = "Loading Channel Name"

        if (this.state && Object.keys(this.props.allUsers).length > 1) {
            currentMessages = Object.keys(this.state.messages).length !== 0 ? 
                
                Object.values(this.state.messages).map(message => {
                    let date = new Date(message.created_at)
                    let dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
                    return (
                        <li key={message.id}>
                            <div className='message-item-contain'>
                                <div className='message-sender-contain'>
                                    <div className='message-sender-name'>{this.props.allUsers[message.user_id].formal_name}</div>
                                    <p className='message-time-stamp'>{dateFormat}</p>
                                </div>
                                <p className="message-body-text">{message.body}</p>
                            </div>
                        </li>)
                }) : "no messages"  
        }
        // var elem = document.querySelector('.messages-main-container');
        // if(elem)elem.scrollTop = elem.scrollHeight;

        if(this.props.currentChannel && Object.keys(this.props.allUsers).length > 1){
            const channel = this.props.currentChannel;
            const dmName = this.props.currentUser.id === parseInt(channel.name) ? this.props.allUsers[channel.admin_id] : this.props.allUsers[channel.name]
                // debugger
            if(channel.is_dm) {
                channelName = dmName.formal_name
            } else {
                channelName = this.props.currentChannel.name
            }
        }
        
        return(
            <div className="channel-show-main">
                <div className="name-of-channel-container">
                <div className="name-of-channel"># {channelName}</div>
                    <div className="number-of-members"># of members: 4</div>
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