import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { createMessage } from '../../actions/message_actions'

class MessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.currentUserId),
            body: '',
            channel_id: parseInt(this.props.channelId)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    update(field) {
        return e =>{
                this.setState({
                user_id: parseInt(this.props.currentUserId),
                [field]: e.currentTarget.value, 
                channel_id: parseInt(this.props.channelId)
            })
        } 
    }

    handleSubmit(e) {
        if(e) e.preventDefault();
        // document.querySelector('.message-to-send').value = ''
        const message = Object.assign({}, this.state)
        this.props.createMessage(message)
        // .then(document.querySelector('.message-to-send').value = "")
        document.querySelector('.message-to-send').value = ''
    }

    render() {
        const placeholder = `Send a message to ${this.props.channelName}`
        return (
            <div >
                <form className="message-tobe-sent-container" onSubmit={this.handleSubmit}>
                    <textarea 
                        className="message-to-send" 
                        onChange={this.update('body')}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                this.handleSubmit()
                            }}
                        }  
                        value={this.state.body} 
                        type="text" 
                        placeholder={placeholder} />
                    <div className='image-input-contain'>
                    <input type="image" src="send.png" alt="Submit"/>

                    </div>

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