import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';
import { createDirect, fetchUserDirects } from '../../actions/direct_actions';
import { createMembership } from '../../actions/membership_actions'
import { channelCheck } from '../../util/functions'

const DirectMessageSearch = (props) => {

    const initialState = {
            'direct': {
            name: '',
            invitedUsersIds: [props.currentUser.id],
        }}

    const [directForm, setDirectForm] = useState(initialState)
    const [matches, setMatches] = useState([])

    useEffect(() => {
        props.fetchAllUsers();
        props.fetchUserDirects(props.currentUser.id)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const directObject = directForm.direct;
        const currentUser = props.currentUser;
        const receivingUserId = props.allUsers[e.currentTarget.value];
        directForm.direct.invitedUsersIds.push(e.currentTarget.value)
        const channelChecker = channelCheck(props.userDirects, 'direct', currentUser.id, receivingUserId.id)
        if (!channelChecker) {
            props.createDirect(directObject)
        } else {
            props.history.push(`/client/${channelChecker}`);
        }
        
        // this.props.createDirect(directObject)


        setDirectForm({
            ...directForm,
            name: "",
            invitedUsersIds: [props.currentUser.id]
        });
        props.closeModal();
    }

    const findMatches = (wordToMatch, users) => {
        return Object.values(users).filter(user => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return user.username.match(regex)
        });
    }

    const displayMatches = (e) => {
        if (Object.keys(props.allUsers).length !== 0) {

            const suggestions = document.querySelector('.dm-user-search-items');
            const matchArray = findMatches(e.currentTarget.value, props.allUsers);
            const html = matchArray.map(user => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const userName = user.username
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={user.id} value={user.id} onClick={handleSubmit} className='dm-user-search-li'>
                        <span className="dm-username-item">{userName}</span>
                    </li>

                )
                })
            setMatches(html)
        }
    }



    return(
        <div className='user-search-container'>
            <div className='close-modal-x'>
                <img onClick={props.closeModal} className='close-modal-button' src="plus.png" alt="" />
            </div>
            <div className='user-search-header'>
                <h1>Search All Users</h1>
            </div>
            <div className='dm-user-search-container'>
                <input onChange={displayMatches} className='dm-user-search-input' type="text" placeholder="Search for a user by username or email"/>
                <ul className="dm-user-search-items">
                    {matches}
                </ul>
            </div>
        </div>
    )
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