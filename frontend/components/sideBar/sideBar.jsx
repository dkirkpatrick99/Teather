import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import  ChannelShowContainer from '../channel/channel_show_container'
import ChannelCreateFrom from '../channel/channel_create_form'

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
        if(Object.keys(this.props.userChannels) !== 0 && Object.keys(this.props.memberships) !== 0) {
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
        if(!!this.props.currentUser) {
            return (
                
                // <div className='flex-container'>
                    <div className='sidebar-main-container'> 
                        <div className="username-container">
                            <div className="dropdown">
                                <div>{this.props.currentUser.username} <img src="arrow.png" alt=""/></div>
                                <div className="username-dropdown-content">
                                    <div>
                                        <div>pic</div>
                                        <div>{this.props.currentUser.username}</div>
                                    </div>
                                    <button onClick={this.props.logout}>SignOut of {this.props.currentUser.username}</button>
                                    <button>Visit my portfolio</button>
                                    <button>Switch to Light Theme</button>
                                </div>
                            </div>
                            <div>h</div>
                        </div>
    
                        <div className="channel-list-container">
                            <div  className='channel-img-contain'>

                                <div onClick={() => this.props.openModal('createChannel')} className="channel-name">Channels</div>
                                <img onClick={() => this.props.openModal('createChannel')} src="plus.png" alt=""/>
                            </div>
                            <ul className="channel-list">
                                {channelLinks}
                            </ul>
                        </div>
    
                        <div className="dm-list-container">
                            <div className='dm-img-contain'>
                                <div className="dm-name">Direct Messages</div>
                                <img src="plus.png" alt=""/>

                            </div>
                            <ul className="dm-list">
                                {dmLinks}
                            </ul>
                        </div>
                    </div>
                    /* < ChannelShowContainer channelID={this.props.channelID} currentUserId={this.props.currentUser.id} /> */
                // </div>
    
            );

        } else {
            return (
                <div></div>
            )
        }
    };

}

export default withRouter(SideBar);