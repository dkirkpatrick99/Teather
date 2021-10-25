import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class SideBar extends React.Component {

    constructor(props){
        super(props);
    };

    componentDidMount(props) {
        if (this.props.currentUser) {
            this.props.fetchUser(this.props.currentUser.id);
        }
        this.props.fetchUsers();
        this.props.fetchChannels();
    };

    renderChannelsAndDms() {
        const that = this;
        const threads = {"dm":[], "channel":[]};
        const memberships = this.props.memberships;
        if(this.props.userChannels[1] && this.props.memberships[1]) {
            Object.values(memberships).forEach(membership => {
                const channelId = membership.channel_id;
                const channel = that.props.userChannels[channelId];
                
                if(!channel){
                    return;
                };
                if(!channel.is_dm){
                    // channelArr.push([channel.id, channel.name]);
                    threads["channel"].push([channel.id, channel.name]);
                } else if (channel.is_dm) {
                    threads["dm"].push([channel.id, channel.name, channel.admin_id]);
                }
            })
        }
        return threads
    }

    render () {
        const channelId = parseInt(this.props.match.params.channel_id);
        const threadHash = this.renderChannelsAndDms();
        let dmLinks
        let channelLinks
        if(threadHash !== null){
            channelLinks = threadHash["channel"].map(channel => {
                
                return channelId === channel[0] ? 
                    <li key={channel[0]}>
                        <NavLink to={`/client/${channel[0]}`}>{"# " + channel[1] + "SELECTED"}</NavLink>
                    </li>
                :
                    <li key={channel[0]}> 
                        <NavLink to={`/client/${channel[0]}`}>{"# " + channel[1]}</NavLink>
                    </li>
                }
            );
            dmLinks = threadHash["dm"] ? threadHash["dm"].map(dm => {

            
                return channelId === dm[0] ?
                    <li key={dm[0]}> 
                        <NavLink to={`/client/${dm[0]}`}>{dm[1]}SELECTED</NavLink>
                    </li>
                :
                    <li key={dm[0]}>
                        <NavLink to={`/client/${dm[0]}`}>{dm[1]}</NavLink>
                    </li>
            }) 
            : null
        }
        return (
            <div className='sidebar-main-container'> 
                <div className="username-container">
                    <div>{this.props.currentUser.username}</div>
                    <div>h</div>
                </div>

                <div className="channel-list-container">
                    <div className="channel-name">Channels</div>
                    <ul className="channel-list">
                        {channelLinks}
                    </ul>
                </div>

                <div className="dm-list-container">
                    <div className="dm-name">Direct Messages</div>
                    <ul className="dm-list">
                        {dmLinks}
                    </ul>
                </div>
                

            </div>

        );
    };

}

export default withRouter(SideBar);