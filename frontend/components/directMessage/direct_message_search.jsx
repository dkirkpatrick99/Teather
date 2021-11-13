import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';
import { createDirect, fetchUserDirects } from '../../actions/direct_actions';
import { createMembership } from '../../actions/membership_actions'
import { channelCheck } from '../../util/functions'

class DirectMessageSearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            'direct': {
            name: '',
            invitedUsersIds: [this.props.currentUser.id],
        },
            'html': ""}
        this.displayMatches = this.displayMatches.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.html = ""
    };


    componentDidMount(props) {
        this.props.fetchAllUsers();
        this.props.fetchUserDirects(this.props.currentUser.id)
    }


    handleSubmit(e) {
        e.preventDefault();
        const directObject = this.state.direct;
        const currentUser = this.props.currentUser;
        const receivingUserId = this.props.allUsers[e.currentTarget.value];
        this.state.direct.invitedUsersIds.push(e.currentTarget.value)
        const channelChecker = channelCheck(this.props.userDirects, 'direct', currentUser.id, receivingUserId.id)
        if (!channelChecker) {
            this.props.createDirect(directObject)
        } else {
            this.props.history.push(`/client/${channelChecker}`);
        }
        
        // this.props.createDirect(directObject)


        this.setState({
            name: "",
            invitedUsersIds: [this.props.currentUser.id]
        });
        this.props.closeModal();
    }

    findMatches(wordToMatch, users) {
        return Object.values(users).filter(user => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return user.username.match(regex)
        });
    }

    displayMatches(e) {
        if (Object.keys(this.props.allUsers).length !== 0) {

            const suggestions = document.querySelector('.dm-user-search-items');
            const matchArray = this.findMatches(e.currentTarget.value, this.props.allUsers);
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
            // suggestions.innerHTML = html;
            this.setState(this.state['html'] = html)
        }
    }


    render() {

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
    const currentUserId = !isNaN(state.session.id) ? state.session.id : state.session.id.id
    return {
        allUsers: state.entities.users,
        currentUser: state.entities.users[currentUserId],
        memberships: state.entities.memberships,
        allChannels: state.entities.channels,
        userDirects: state.entities.directs
    }
}

const mDTP = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    closeModal: () => dispatch(closeModal()),
    createDirect: (direct) => dispatch(createDirect(direct)),
    createMembership: (membership) => dispatch(createMembership(membership)),
    fetchUserDirects: (userId) => {dispatch(fetchUserDirects(userId))}
})

export default connect(mSTP, mDTP)(DirectMessageSearch)