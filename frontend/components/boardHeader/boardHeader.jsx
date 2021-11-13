import { connect } from 'react-redux';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { fetchAllUsers } from '../../actions/user_actions';
import { fetchAllChannels, createChannel } from  '../../actions/channel_actions'
import { logout } from '../../actions/session_actions'
import { createMembership, fetchMemberships } from '../../actions/membership_actions'
import { fetchUserDirects, createDirect } from '../../actions/direct_actions'
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
        this.props.fetchAllUsers();
        this.props.fetchAllChannels();
        this.props.fetchMemberships();
        if(this.props.currentUser){
            this.props.fetchUserDirects(this.props.currentUser.id)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const identifier = e.currentTarget.dataset.classify;
        const value = e.currentTarget.value
        const inputEle = document.querySelector('.search-input')
        const directObject = {
            name: e.currentTarget.value,
            invitedUsersIds: [this.props.currentUser.id, value]
        };
        const membershipObject = {
            user_id: this.props.currentUser.id,
            memberable_id: value,
            memberable_type: "Channel"
        }
        const channelChecker = channelCheck(this.props.userDirects, identifier, this.props.currentUser.id, value, this.props.allMemberships, this.props.allChannels)
        if (e.currentTarget.dataset.classify === "direct") {
            if(!channelChecker){
                this.props.createDirect(directObject)
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

    handleHistoryButtons(field) {
        if (field === 'back') {
            this.props.history.goBack()
        } else if (field === 'forward') {
            this.props.history.goForward()
        }
    }

    toggleElement() {
        const dropdownToggle = document.querySelector('.user-profile-dropdown-container');
        if (dropdownToggle) {
            dropdownToggle.classList.toggle('active')
        }
    }

    findMatches(wordToMatch, channels, users) {
        let matches = {"users" : [], "channels" : [] }
        if(wordToMatch === '') return matches
        matches["users"] =  Object.values(users).filter(user => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return user.username.match(regex) || user.email.match(regex)
        });

        matches["channels"] = Object.values(channels).filter(channel => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return channel.name.match(regex)
        });
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
                    <li key={user.id} value={user.id} data-classify='direct' onClick={this.handleSubmit} className='header-search-li users'>
                        <span className="header-search-item">{userName}</span>
                        <span>{userEmail}</span>
                    </li>
                )
            }) : null

            const channelMatches = matchArray.channels.length > 0 ? matchArray.channels.map(channel => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const channelName = channel.name
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={channel.id} value={channel.id} data-classify='channel' onClick={this.handleSubmit} className='header-search-li channels'>
                        <span className="header-search-item">{channelName}</span>
                    </li>
                )
            }) : null
            // .join('');
            // suggestions.innerHTML = html;
            this.setState({
                'userMatches': userMatches,
                'channelMatches': channelMatches
            })
        }
    }

    
    render () {
        const onlineIndicator = !this.props.currentUser ? 
            <div className='boarderheader-online-wrapper'>
                <div className='boardheader-online-indicator offline'></div>
            </div>
            :
            <div className='boarderheader-online-wrapper'>
                <div className='boardheader-online-indicator online'></div>
            </div>

        if(!this.props.currentUser){
            return (
                <div></div>
            )
        }

        return (
            <div className="board-header-container">


                <div className="history-buttons">
                    <input className='backward-history' onClick={() => this.handleHistoryButtons('back')} src='historyArrowBack.png' type="image" value='back' />
                    <input className="forward-history" onClick={() => this.handleHistoryButtons('forward')} src='historyArrow.png' type="image" value='forward' />
                </div>
                
                <div className="search-input-container">
                    <input onChange={this.displayMatches} className="search-input" type="text" placeholder="Search users and channels"/>
                    <ul className="boardheader-search-items">
                            {this.state.userMatches}
                            {this.state.channelMatches}
                    </ul>
                </div>
                <div className="user-profile-dropdown-container" onClick={this.toggleElement}>
                    <div className="user-status-image">
                        {onlineIndicator}
                        <img src={getUserPic(this.props.currentUser.formal_name)} alt=""/> 
                    </div>
                    <div className="user-profile-dropdown-content">
                        <div className='dropdown-user-top-container'>
                            <img src={getUserPic(this.props.currentUser.formal_name)} alt=""/>
                            <div className='dropdown-user-name-container'>
                                <div className='dropdown-user-name'>{this.props.currentUser.username}</div>
                                <div className='dropdown-user-status-contain'>
                                    <div className='dropdown-user-status'></div>
                                    <div className='dropdown-user-active'>Active</div>
                                </div>
                            </div>
                        </div>
                        <div className='dropdown-user-links-container'>
                            <a href="https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/">Visit my portfolio</a>
                            <a href="https://github.com/dkirkpatrick99">Visit my GitHub</a>
                            <a href="https://www.linkedin.com/in/dalton-kirkpatrick-9284b3184">Contact Me!</a>
                        </div>
                        <div className='dropdown-user-logout-container'>
                            <a onClick={() => this.props.logout()}>Log out of {this.props.currentUser.username}</a>

                        </div>
                    </div>

                </div>

            </div>
        )
    }


}


const mapStateToProps = (state, ownProps) => {
    const currentUserId = !isNaN(state.session.id) ? state.session.id : state.session.id.id

    return {
        allUsers: state.entities.users,
        allChannels: state.entities.channels,
        currentUser: state.entities.users[currentUserId],
        allMemberships: state.entities.memberships,
        userDirects: state.entities.directs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllChannels: () => dispatch(fetchAllChannels()),
        logout: () => dispatch(logout()),
        createDirect: direct => dispatch(createDirect(direct)),
        createMembership: membership => dispatch(createMembership(membership)),
        fetchMemberships: () => dispatch(fetchMemberships()),
        fetchUserDirects: (id) => dispatch(fetchUserDirects(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);