import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { createMessage } from '../../actions/message_actions'

class MessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.currentUserId),
            body: "",
            channel_id: parseInt(this.props.channelId)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    update(field) {
        return e => this.setState({
            user_id: parseInt(this.props.currentUserId),
            [field]: e.currentTarget.value, 
            channel_id: parseInt(this.props.channelId)
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        // const inputClear = document.querySelector('.message-to-send').value = ''
        const message = Object.assign({}, this.state)
        this.props.createMessage(message).then(document.querySelector('.message-to-send').value = '')

    }

    render() {
        return (
            <div >
                <form className="message-tobe-sent-container" onSubmit={this.handleSubmit}>
                    <input className="message-to-send" onChange={this.update('body')} value={this.state.body} type="text" placeholder='Send a message to {this.props.channelName}' />
                </form>
            </div>

        )
    }

}


const mapDispatchToProps = dispatch => {
    return {
        createMessage: (message) => dispatch(createMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(MessageForm);