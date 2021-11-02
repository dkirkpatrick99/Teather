import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import React from 'react';

class ChannelCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_id: '',
            name: '',
            description: '',
            is_private: false,
            is_dm: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value, })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createChannel(this.state);
        this.setState({
            admin_id: "",
            name: "",
            description: "",
            is_private: false,
            is_dm: false
        });
    }




    render() {
        return(
            // <div className='channel-create-container'>
                <form className='channel-create-form' onSubmit={this.handleSubmit}>
                    <h1>Create a channel</h1>
                    <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
                    <div className='channel-create-inputs'>
                        <label>Name:</label>
                        <input type="text"
                            value={this.state.email}
                            placeholder="e.g. plan-budget"
                            onChange={this.update('name')}
                            className="channel-name-input"
                            rows='1'
                            maxLength='80'
                        />

                        <label>Description (optional):</label>
                        <input type="text"
                            value={this.state.email}
                            placeholder="What’s this channel about?"
                            onChange={this.update('email')}
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
                            <input type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <span className='channel-create-submit'>
                        <input type="submit" value='CREATE'/>
                    </span>

                </form>
            // </div>
        )
    }
}


// const mSTP = state => {
//     return {

//     }
// }

const mDTP = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel))
})

export default connect(null, mDTP)(ChannelCreateForm);
