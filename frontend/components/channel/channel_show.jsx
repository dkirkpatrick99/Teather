import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import SideBarContainer from '../sideBar/sideBar_container'

class ChannelShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {0: "empty", 1: "empty"};
    };

    componentDidMount(props) {
        this.props.fetchChannels();
        this.props.fetchUsers();
        // this.props.fetchMessages();
        this.props.fetchChannel(this.props.match.params.channel_id);
    }

    shouldComponentUpdate(){
        
        // if(this.state[0] === "empty") {
        //     return true
        // } else {
        //     return false
        // }
        if (this.props.match.params.channel_id && this.props.currentChannel) {
            debugger
            if (parseInt(this.props.match.params.channel_id) !== parseInt(this.props.currentChannel.id)){
                debugger
                return true
            } else {
                return false
            }

        } else {
            return true
        }
        
    }

    getCurrentChannel(props) {
        debugger
        let channelId = parseInt(props.match.params.channel_id);
        let currentCh = props.fetchChannel(channelId).then(payload => {
            debugger
            this.setState(Object.values(payload))
        })
        return currentCh
    } 

    render() {

        let channel = this.getCurrentChannel(this.props)
        
        const currentMessages = this.state[1] !== "empty" ? 
            Object.values(this.state[1].messages).map(message => 
                <li key={message.id}>{message.body}</li>
            )
            :
            null

        return(
            <div className="channel-show-main">
                {/* <SideBarContainer /> */}
                <div className="name-of-channel-container">
                    <div className="name-of-channel"># Channel-Name</div>
                    <div className="number-of-members"># of members: 4</div>
                </div>
                <div className="messages-main-container">
                    <ul className="messages-list">
                        {currentMessages}
                    </ul>
                </div>
                <div className="message-tobe-sent-container">
                    <input type="text" placeholder="Send a message to `interpolate name`"/>
                </div>
                
            </div>
        )
    }

};

export default withRouter(ChannelShow);