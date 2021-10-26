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
        // this.props.fetchMessages();
        this.props.fetchChannel(this.props.channelId)
            .then(payload => {
                this.setState({ channelId: Object.values(payload)[1].channel.id, messages: Object.values(payload)[1].messages})
            });
    }

    // shouldComponentUpdate(){
        
    //     if (this.props.channelID && this.state[1] !== "empty") {
            
    //         if (parseInt(this.props.channelID) !== parseInt(this.state[1].channel.id)){
    //             debugger
    //             return true
    //         } else {
    //             debugger
    //             return false
    //         }
    //     } else {
    //         return true
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        let prevMessages = prevProps.messages;
        let prevChannelId = prevProps.channelId;
        let propChannelId = this.props.channelId
        if(prevChannelId && prevChannelId !== this.props.channelId) {
            this.getCurrentChannel(this.props)
            // this.setState({channeId: prevChannelId, messages: prevMessages})
        }
    }

    getCurrentChannel(props) {
        // let channelId = parseInt(props.channelID);
        let currentCh = props.fetchChannel(props.channelId)
            .then(payload => {
                this.setState({ channelId: Object.values(payload)[1].channel.id, messages: Object.values(payload)[1].messages })
            });
        // .then(payload => {
        //     debugger
        //     this.setState(Object.values(payload))
        // })
        return currentCh
    } 

    render() {
        let currentMessages
        let channelName = "Loading Channel Name"
        if(this.state) {
            currentMessages = Object.keys(this.state.messages).length !== 0 ? 
                Object.values(this.state.messages).map(message => 
                    <li key={message.id}>{message.body}</li>
                ) : "hello"
        }
        if(this.props.currentChannel){
            channelName = this.props.currentChannel.name
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
                < MessageFromContainer channelName={channelName} channelId={this.state.channelId} currentUserId={this.props.currentUserId}/>
                
            </div>
        )
    }

};

export default withRouter(ChannelShow);