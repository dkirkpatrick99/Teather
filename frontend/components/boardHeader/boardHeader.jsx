import { connect } from 'react-redux';
import React from 'react';
import { fetchUsers } from '../../actions/user_actions';
import { fetchChannels } from  '../../actions/channel_actions'
import { logout } from '../../actions/session_actions'

class BoardHeader extends React.Component{

    constructor(props) {
        super(props)
        this.state;
        this.displayMatches = this.displayMatches.bind(this)
    }

    componentDidMount(props) {
        this.props.fetchUsers();
        this.props.fetchChannels();
    }

    findMatches(wordToMatch, channels, users) {
        let matches = {"users" : [], "channels" : [] }
        matches["users"] =  Object.values(users).filter(user => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            // debugger
            return user.username.match(regex)
        });

        matches["channels"] = Object.values(channels).filter(channel => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            // debugger
            return channel.name.match(regex)
        });

        return matches
    }

    displayMatches(e) {
        if (Object.keys(this.props.allUsers).length !== 0) {

            const suggestions = document.querySelector('.dm-user-search-items');
            const matchArray = this.findMatches(e.currentTarget.value, this.props.allChannels, this.props.allUsers);
            // debugger
            const userMatches = matchArray.map(user => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const userName = user.username
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={user.id} value={user.id} onClick={this.handleSubmit} className='header-search-li'>
                        <span className="header-search-item">{userName}</span>
                    </li>
                )
            })

            const channelMatches = matchArray.map(channel => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const userName = channel.name
                // .replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return (
                    <li key={channel.id} value={channel.id} onClick={this.handleSubmit} className='header-search-li'>
                        <span className="header-search-item">{userName}</span>
                    </li>
                )
            })
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
                    <ul className="suggestions">
                    </ul>
                </div>
                <div className="user-status-image">
                    <div>icon</div>
                </div>

            </div>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        allUsers: state.entities.users,
        allChannels: state.entities.channels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchChannels: () => dispatch(fetchChannels()),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);