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
            messageable_id: this.props.typeId,
            messageable_type: 'Direct'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    // componentDidUpdate(prevProps, prevState) {
        
    //     if (document.querySelector('.message-to-send').value === '\n') {
    //         document.querySelector('.message-to-send').value = ''
    //     }
    // }

    update(field) {
        return e =>{
                this.setState({
                user_id: parseInt(this.props.currentUserId),
                [field]: e.currentTarget.value,
                messageable_id: parseInt(this.props.typeId),
                messageable_type: 'Direct'
            })
        } 
    }

    handleSubmit(e) {
        if(e) e.preventDefault();
        const chatType = this.props.type === "channel" ? "Channel" : "Direct"

        const message = Object.assign({}, this.state)
        App.channel.speak({
            message: {
                ...this.state,
                messageable_type: chatType
            }
        });
        this.setState({
            body: ""
        });
        // this.props.createMessage(message)

        document.querySelector('.message-to-send').value = ''
        // document.querySelector(".message-tobe-sent-container")
        // debugger
    }

    render() {
        const placeholder = `Send a message to ${this.props.typeName}`
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
                        placeholder={placeholder}></textarea>

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