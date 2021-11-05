import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';
import { createChannel } from '../../actions/channel_actions';
import { createMembership } from '../../actions/membership_actions'

class DirectMessageSearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            'channel': {
            admin_id: this.props.currentUser.id,
            name: '',
            description: '',
            is_private: true,
            is_dm: true
        },
            'html': ""}
        this.displayMatches = this.displayMatches.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.html = ""
    };


    componentDidMount(props) {
        this.props.fetchUsers();
    }


    handleSubmit(e) {
        e.preventDefault();
        const channelObject = this.state.channel;
        const currentUser = this.props.currentUser;
        const receivingUser = this.props.allUsers[e.currentTarget.value];
 
        // channelObject["name"] = `${currentUser.formal_name}'*'${receivingUser.formal_name}`
        channelObject["name"] = `${receivingUser.id}`

        this.props.createChannel(channelObject)
        //     .then(payload => {
        //     this.props.createMembership({
        //         user_id: receivingUser.id,
        //         channel_id: payload.channel.channel.id
        //     })
        // })

        this.setState({
            admin_id: "",
            name: "",
            description: "",
            is_private: false,
            is_dm: false
        });
        this.props.closeModal();
    }

    findMatches(wordToMatch, users) {
        // console.log("channels" + channels)
        return Object.values(users).filter(user => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            // debugger
            return user.username.match(regex)
        });
    }

    displayMatches(e) {
        if (Object.keys(this.props.allUsers).length !== 0) {

            const suggestions = document.querySelector('.dm-user-search-items');
            const matchArray = this.findMatches(e.currentTarget.value, this.props.allUsers);
            // debugger
            const html = matchArray.map(user => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const userName = user.username
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={user.id} value={user.id} onClick={this.handleSubmit} className='dm-user-search-li'>
                        <span className="dm-username-item">{userName}</span>
                    </li>

                )
                })
                // .join('');
// debugger
            // console.log("html" + html)
            // console.log("suggestions" + suggestions)
            // suggestions.innerHTML = html;
            this.setState(this.state['html'] = html)
        }
    }


    render() {

        // const items = Array.from(document.querySelectorAll('.dm-user-search-li'));
        // if(items) {
        //     debugger
        //     items.forEach(item => item.addEventListener('click', this.handleSubmit));

        // }

        return(
            <div className='user-search-container'>
                <div className='close-modal-x'>
                    <img onClick={this.props.closeModal} className='close-modal-button' src="plus.png" alt="" />
                </div>
                <div className='user-search-header'>
                    <h1>Search All Users</h1>
                </div>
                <div className='dm-user-search-container'>
                    <input onChange={this.displayMatches} className='dm-user-search-input' type="text" placeholder="Search for a user by username or email"/>
                    <ul className="dm-user-search-items">
                        {this.state.html}
                    </ul>
                </div>
            </div>
        )
    }
}

const mSTP = state => {
    return {
        allUsers: state.entities.users,
        currentUser: state.entities.users[state.session.id]
    }
}

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    closeModal: () => dispatch(closeModal()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    createMembership: (membership) => dispatch(createMembership(membership))
})

export default connect(mSTP, mDTP)(DirectMessageSearch)