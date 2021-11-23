import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import React, {useState} from 'react';

const ChannelCreateForm = (props) => {
    const initialState = {
            admin_id: '',
            name: '',
            description: '',
            invitedUsersIds: [props.currentUser.id],
            is_private: false,
            is_dm: false
        }

    const [channelForm, setChannelForm] = useState(initialState)

    const update = (field) => {
        return e =>{
            debugger
            field === "is_private" ? setChannelForm({ ...channelForm, [field]: e.target.checked, }) : setChannelForm({ ...channelForm, [field]: e.target.value, })
        } 
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        debugger
        props.createChannel(channelForm);
        setChannelForm(initialState);
        props.closeModal();
    }



    return(
        <form className='channel-create-form' onSubmit={handleSubmit}>
            <div className='close-modal-x'>
                <img onClick={props.closeModal} className='close-modal-button' src="plus.png" alt=""/>
            </div>
            <h1>Create a channel</h1>
            <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
            <div className='channel-create-inputs'>
                <label>Name:</label>
                <input type="text"
                    value={channelForm.name}
                    placeholder="e.g. plan-budget"
                    onChange={update('name')}
                    className="channel-name-input"
                    rows='1'
                    maxLength='80'
                />

                <label>Description (optional):</label>
                <input type="text"
                    value={channelForm.description}
                    placeholder="What’s this channel about?"
                    onChange={update('description')}
                    className="channel-name-input"
                    rows='1'
                />
            </div>

            <div className='make-private-container'>
                <div className='make-private-text'>
                    <h2>Make private?</h2>
                    <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                </div>
                
                <label className="switch">
                    <input value={channelForm.is_private} onChange={update('is_private')} type="checkbox"/>
                    <span className="slider round"></span>
                </label>
            </div>
            <span className='channel-create-submit'>
                <input type="submit" value='CREATE'/>
            </span>

        </form>
    )
}


const mSTP = state => {
    const currentUserId = !isNaN(state.session.id) ? state.session.id : state.session.id.id

    return {
        currentUser: state.entities.users[currentUserId]
    }
}

const mDTP = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel)),
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(ChannelCreateForm);
