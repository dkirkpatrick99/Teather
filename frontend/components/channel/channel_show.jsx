import { connect } from 'react-redux';
import React from 'react';

class ChannelShow extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return(
            <div className="channel-show-main">
                <div className="name-of-channel-container">
                    <div className="name-of-channel"># Channel-Name</div>
                    <div className="number-of-members"># of members: 4</div>
                </div>
                <div className="messages-main-container">
                    <ul className="messages-list">
                        <li>messages</li>
                        <li>go</li>
                        <li>in</li>
                        <li>here</li>
                    </ul>
                </div>
                <div className="message-tobe-sent-container">
                    <input type="text" placeholder="Send a message to `interpolate name`"/>
                </div>
                
            </div>
        )
    }

};

export default ChannelShow;