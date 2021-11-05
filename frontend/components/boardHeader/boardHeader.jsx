import { connect } from 'react-redux';
import React from 'react';
import { fetchUsers } from '../../actions/user_actions';
import { fetchChannels, createChannel } from  '../../actions/channel_actions'
import { logout } from '../../actions/session_actions'
import { createMembership } from '../../actions/membership_actions'
import { getUserPic, channelCheck } from '../../util/functions'

class BoardHeader extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            'userMatches': null,
            'channelMatches': null
        };
        this.displayMatches = this.displayMatches.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(props) {
        this.props.fetchUsers();
        this.props.fetchChannels();
    }

    handleSubmit(e) {
        e.preventDefault();
        const value = e.currentTarget.value
        const identifier = e.currentTarget.dataset.classify;
        const inputEle = document.querySelector('.search-input')
        const channelObject = {
            admin_id: this.props.currentUser.id,
            name: e.currentTarget.value,
            is_private: false,
            is_dm: true
        };
        const membershipObject = {
            user_id: this.props.currentUser.id,
            channel_id: e.currentTarget.value
        }
        const channelChecker = channelCheck(this.props.memberships, value, this.props.allChannels, identifier, this.props.currentUser.id)

        if (e.currentTarget.dataset.classify === "user") {
            if(!channelChecker){
                this.props.createChannel(channelObject)
            } else {
                this.props.history.push(`/client/${channelChecker}`);
            }
        } else if (e.currentTarget.dataset.classify === "channel") {
            if(!channelChecker){
                this.props.createMembership(membershipObject)
            } else {
                this.props.history.push(`/client/${channelChecker}`);
            }
        }

        inputEle.value = ''
        this.setState({
            'userMatches': null,
            'channelMatches': null
        })
    }

    findMatches(wordToMatch, channels, users) {
        let matches = {"users" : [], "channels" : [] }
        if(wordToMatch === '') return matches
        matches["users"] =  Object.values(users).filter(user => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            // debugger
            return user.username.match(regex) || user.email.match(regex)
        });

        matches["channels"] = Object.values(channels).filter(channel => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            // debugger
            return channel.name.match(regex)
        });
        // debugger
        return matches
    }

    displayMatches(e) {
        if (Object.keys(this.props.allUsers).length !== 0) {
            const suggestions = document.querySelector('.dm-user-search-items');
            
            const matchArray = this.findMatches(e.currentTarget.value, this.props.allChannels, this.props.allUsers);

            const userMatches = matchArray.users.length > 0 ? matchArray.users.map(user => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const userName = user.username
                const userEmail = user.email
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={user.id} value={user.id} data-classify='user' onClick={this.handleSubmit} className='header-search-li users'>
                        <span className="header-search-item">{userName}</span>
                        <span>{userEmail}</span>
                    </li>
                )
            }) : null

            const channelMatches = matchArray.channels.length > 0 ? matchArray.channels.map(channel => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const userName = channel.name
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={channel.id} value={channel.id} data-classify='channel' onClick={this.handleSubmit} className='header-search-li channels'>
                        <span className="header-search-item">{userName}</span>
                    </li>
                )
            }) : null
            // .join('');
            // debugger
            // console.log("html" + html)
            // console.log("suggestions" + suggestions)
            // suggestions.innerHTML = html;
            this.setState({
                'userMatches': userMatches,
                'channelMatches': channelMatches
            })
        }
    }

    
    render () {

        return (
            <div className="board-header-container">
                <div className="search-input-container">
                    <input onChange={this.displayMatches} className="search-input" type="text" placeholder="Search users and channels"/>
                    <ul className="boardheader-search-items">
                            {this.state.userMatches}
                            {this.state.channelMatches}
                    </ul>
                </div>
                <div className="user-status-image">
                    <img src={getUserPic(this.props.currentUser.formal_name)} alt=""/>
                </div>

            </div>
        )
    }


}


const mapStateToProps = (state, ownProps) => {
    return {
        allUsers: state.entities.users,
        allChannels: state.entities.channels,
        currentUser: state.entities.users[state.session.id],
        memberships: state.entities.memberships
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchChannels: () => dispatch(fetchChannels()),
        logout: () => dispatch(logout()),
        createChannel: channel => dispatch(createChannel(channel)),
        createMembership: membership => dispatch(createMembership(membership))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);