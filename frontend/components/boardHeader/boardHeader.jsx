import { connect } from 'react-redux';
import React from 'react';
import { fetchUsers } from '../../actions/user_actions';
import { fetchChannels } from  '../../actions/channel_actions'
import { logout } from '../../actions/session_actions'

class BoardHeader extends React.Component{

    constructor(props) {
        super(props)
        this.displayMatches = this.displayMatches.bind(this)
    }

    componentDidMount(props) {
        this.props.fetchUsers();
        this.props.fetchChannels();
    }

    findMatches(wordToMatch, channels, users) {
        // console.log("channels" + channels)
    return Object.values(channels).filter(channel => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return channel.name.match(regex)
    });
    }

    displayMatches(e) {
        if(Object.keys(this.props.allChannels).length !== 0){
            const suggestions = document.querySelector('.suggestions');
            const matchArray = this.findMatches(e.currentTarget.value, this.props.allChannels);
            const html = matchArray.map(channel => {
                const regex = new RegExp(e.currentTarget.value, 'gi');
                const channelName = channel.name.replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
                // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return `
            <li>
                <span class="name">${channelName}</span>
            </li>
            `;
            }).join('');
        
            // console.log("html" + html)
            // console.log("suggestions" + suggestions)
        
            suggestions.innerHTML = html;
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