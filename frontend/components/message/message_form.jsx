import React, {useState} from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { createMessage } from '../../actions/message_actions'

const MessageForm = (props) => {

    const initialState = {
            user_id: parseInt(props.currentUserId),
            body: '',
            messageable_id: props.typeId,
            messageable_type: 'Direct'
        }

    const [messageForm, setMessageForm] = useState(initialState)

    const update = (field) => {
        return e =>{
                setMessageForm({
                user_id: parseInt(props.currentUserId),
                [field]: e.currentTarget.value,
                messageable_id: parseInt(props.typeId),
                messageable_type: 'Direct'
            })
        } 
    }

    const handleSubmit = (e) => {
        if(e) e.preventDefault();
        const chatType = props.type === "channel" ? "Channel" : "Direct"

        const message = Object.assign({}, messageForm)
        App.channel.speak({
            message: {
                ...messageForm,
                messageable_type: chatType
            }
        });

        setMessageForm(initialState);
        // document.querySelector('.message-to-send').value = '';
    }

    const placeholder = `Send a message to ${props.typeName}`
    // debugger
    return (
        <div>
            <form className="message-tobe-sent-container" onSubmit={handleSubmit}>

                <textarea 
                    className="message-to-send" 
                    onChange={update('body')}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            handleSubmit()
                        }}
                    }  
                    value={messageForm.body} 
                    type="text" 
                    placeholder={placeholder}></textarea>

                <div className='image-input-contain'>
                <input type="image" src="send.png" alt="Submit"/>

                </div>

            </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        createMessage: (message) => dispatch(createMessage(message))
    };
};

export default connect(null, mapDispatchToProps)(MessageForm);