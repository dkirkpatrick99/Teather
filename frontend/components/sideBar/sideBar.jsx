import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import  ChannelShowContainer from '../channel/channel_show_container'
// import ChannelCreateFrom from '../channel/channel_create_form'
import { getUserPic } from "../../util/functions";

class SideBar extends React.Component {

    constructor(props){
        super(props);
        this.state;
    };

    componentDidMount(props) {
        // if (this.props.currentUser) {
        //     this.props.fetchUser(this.props.currentUser.id);
        // }
        this.props.fetchAllUsers();
        this.props.fetchAllChannels();
        this.props.fetchMemberships();
        if(this.props.currentUser){
            this.props.fetchUserDirects(this.props.currentUser.id);
        }

    };

    componentDidUpdate(prevProps, prevState) {
        // this.props.fetchAllUsers();
    }


    renderChannels() {
        const that = this;
        const userChannels = [];
        const memberships = this.props.memberships;
        let userMemberships = [];
        
        if (Object.keys(this.props.allChannels).length !== 0 && Object.keys(this.props.memberships).length !== 0 && Object.keys(this.props.allUsers).length > 1) {
            Object.values(memberships).forEach(membership => {
                const channelId = membership.memberable_type === 'Channel' && membership.user_id === that.props.currentUser.id ? membership.memberable_id : null;
                const channel = that.props.allChannels[channelId];  
                if(!channel){
                    return;
                } else {
                    userChannels.push(channel);
                }
            })
        }
        return userChannels
    }

    toggleElement(){
        const dropdownToggle = document.querySelector('.dropdown');
        if(dropdownToggle){
            dropdownToggle.classList.toggle('active')
        }
    }

    render () {
        if (!this.props.currentUser) {
            return (
                <div></div>
            )
        }
        const typeId = parseInt(this.props.typeId);
        const channels = this.renderChannels();
        let dmLinks
        let channelLinks
        dmLinks = Object.values(this.props.userDirects).length > 0 ? Object.values(this.props.userDirects).map(dm => {
            const dmName = dm.name
            const notCurrentUserCheck = dm.user_ids[0].user_id === this.props.currentUser.id ? dm.user_ids[1].onlineStatus : dm.user_ids[0].onlineStatus
            const onlineIndicator = notCurrentUserCheck ? 
                <div className='sidebar-online-wrapper'>
                    <div className='sidebar-online-indicator online'></div>
                </div>
                :
                <div className='sidebar-online-wrapper'>
                    <div className='sidebar-online-indicator offline'></div>
                </div>

            return typeId === dm.id && this.props.type === 'direct' ?
                <li className="channel-list-item active" key={dm.id}>
                    <NavLink to={`/client/direct/${dm.id}`}>
                        <img src={getUserPic(dm.name)} alt="" ></img>
                        {onlineIndicator}
                        {dmName}
                    </NavLink>
                </li>
                :
                <li className="channel-list-item" key={dm.id}>
                    <NavLink to={`/client/direct/${dm.id}`}>
                        <img src={getUserPic(dm.name)} alt="" />
                        {onlineIndicator}
                        {dmName}
                    </NavLink>
                </li>
        })
            : null
        if(channels.length !== 0 ){
            channelLinks = channels.map(channel => {
                return typeId === channel.id && this.props.type === 'channel' ? 
                    <li className="channel-list-item active" key={channel.id}>
                        <NavLink to={`/client/channel/${channel.id}`}>{"# " + channel.name}</NavLink>
                    </li>
                :
                    <li className="channel-list-item" key={channel.id}> 
                        <NavLink to={`/client/channel/${channel.id}`}>{"# " + channel.name}</NavLink>
                    </li>
                }
            );
        }

        // if(!dropdownToggle) return

        if(!!this.props.currentUser) {
            return (
                
                <div className='flex-container'>
                    <div className='sidebar-main-container'> 
                        <div className="username-container">
                            <div onClick={this.toggleElement} className="dropdown">
                                <div className="dropdown-current-username">{this.props.currentUser.username} <img src="arrow.png" alt=""/></div>
                                <div className="username-dropdown-content">
                                    <div className='username-img-flex-container'>
                                        <img src={getUserPic(this.props.currentUser.formal_name)} alt=""/>
                                        <div className='dropdown-current-info-show'>
                                            <div>{this.props.currentUser.username}</div>
                                            <div className="dropdown-current-email">{this.props.currentUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="sidebar-dropdown-links">
                                        <Link onClick={this.props.logout}>Log out of {this.props.currentUser.username}</Link>
                                        <a href='https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/'>Visit my portfolio</a>
                                        <a href=''>Switch to Light Theme</a>
                                    </div>
                                </div>
                            </div>
                            <img onClick={() => this.props.openModal('directMessageSearch')} src="compose.png" alt=""/>
                        </div>
                        <div className="sidebar-list-items-container">
                            <div className="channel-list-container">
                                <div  className='channel-img-contain'>
                                    <div className="channel-name">Channels</div>
                                    <img onClick={() => this.props.openModal('createChannel')} src="plus.png" alt=""/>
                                </div>

                                <ul className="channel-list">
                                    {channelLinks}
                                </ul>
                            </div>
        
                            <div className="dm-list-container">
                                <div className='dm-img-contain'>
                                    <div className="dm-name">Direct Messages</div>
                                <img onClick={() => this.props.openModal('directMessageSearch')} src="plus.png" alt=""/>
                                </div>

                                <ul className="dm-list">
                                    {dmLinks}
                                </ul>
                            </div>

                        </div>

                        <div className='sidebar-personal-icons'>
                            <Link to='https://github.com/dkirkpatrick99'>
                                <img src="github.png" alt="" />
                            </Link>
                            <Link to='https://www.linkedin.com/in/dalton-kirkpatrick-9284b3184/'>
                                <img src="linkedin.png" alt="" />
                            </Link>
                            <Link to='https://angel.co/u/dalton-kirkpatrick'>
                                <img src="angellist.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    
                        {/* < ChannelShowContainer channelID={this.props.channelID} currentUserId={this.props.currentUser.id} />  */}
                </div>
    
            );

        } else {
            return (
                <div>hello</div>
            )
        }
    };

}

export default withRouter(SideBar);