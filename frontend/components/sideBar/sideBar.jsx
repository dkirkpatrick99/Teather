import React, {useState, useEffect, useRef} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getUserPic } from "../../util/functions";

const SideBar = (props) => {

    useEffect(() => {
        props.fetchAllUsers();
        props.fetchAllChannels();
        props.fetchMemberships();
        if(props.currentUser){
            props.fetchUserDirects(props.currentUser.id);
        }
    }, [])

    const renderChannels = () => {
        const userChannels = [];
        const memberships = props.memberships;
        let userMemberships = [];
        
        if (Object.keys(props.allChannels).length !== 0 && Object.keys(props.memberships).length !== 0 && Object.keys(props.allUsers).length > 1) {
            Object.values(memberships).forEach(membership => {
                const channelId = membership.memberable_type === 'Channel' && membership.user_id === props.currentUser.id ? membership.memberable_id : null;
                const channel = props.allChannels[channelId];  
                if(!channel){
                    return;
                } else {
                    userChannels.push(channel);
                }
            })
        }
        return userChannels
    }

    const toggleElement = () => {
        const dropdownToggle = document.querySelector('.dropdown');
        if(dropdownToggle){
            dropdownToggle.classList.toggle('active')
        }
    }

    if (!props.currentUser) {
        return (
            <div></div>
        )
    }
    const typeId = parseInt(props.typeId);
    const channels = renderChannels();
    let dmLinks
    let channelLinks
    dmLinks = Object.values(props.userDirects).length > 0 ? Object.values(props.userDirects).map(dm => {
        const dmName = dm.name === "" ? "Me" : dm.name
        const notCurrentUserCheck = dm.user_ids[0].user_id === props.currentUser.id ? dm.user_ids[1].onlineStatus : dm.user_ids[0].onlineStatus
        const onlineIndicator = notCurrentUserCheck ? 
            <div className='sidebar-online-wrapper'>
                <div className='sidebar-online-indicator online'></div>
            </div>
            :
            <div className='sidebar-online-wrapper'>
                <div className='sidebar-online-indicator offline'></div>
            </div>

        return typeId === dm.id && props.type === 'direct' ?
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
            return typeId === channel.id && props.type === 'channel' ? 
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

    if(!!props.currentUser) {
        return (
            
            <div className='flex-container'>
                <div className='sidebar-main-container'> 
                    <div className="username-container">
                        <div onClick={toggleElement} className="dropdown">
                            <div className="dropdown-current-username">{props.currentUser.username} <img src="arrow.png" alt=""/></div>
                            <div className="username-dropdown-content">
                                <div className='username-img-flex-container'>
                                    <img src={getUserPic(props.currentUser.formal_name)} alt=""/>
                                    <div className='dropdown-current-info-show'>
                                        <div>{props.currentUser.username}</div>
                                        <div className="dropdown-current-email">{props.currentUser.email}</div>
                                    </div>
                                </div>
                                <div className="sidebar-dropdown-links">
                                    <Link onClick={props.logout}>Log out of {props.currentUser.username}</Link>
                                    <a href='https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/' target="_blank">Visit my portfolio</a>
                                    <a >Switch to Light Theme</a>
                                </div>
                            </div>
                        </div>
                        <img onClick={() => props.openModal('directMessageSearch')} src="compose.png" alt=""/>
                    </div>
                    <div className="sidebar-list-items-container">
                        <div className="channel-list-container">
                            <div  className='channel-img-contain'>
                                <div className="channel-name">Channels</div>
                                <img onClick={() => props.openModal('createChannel')} src="plus.png" alt=""/>
                            </div>

                            <ul className="channel-list">
                                {channelLinks}
                            </ul>
                        </div>
    
                        <div className="dm-list-container">
                            <div className='dm-img-contain'>
                                <div className="dm-name">Direct Messages</div>
                            <img onClick={() => props.openModal('directMessageSearch')} src="plus.png" alt=""/>
                            </div>

                            <ul className="dm-list">
                                {dmLinks}
                            </ul>
                        </div>

                    </div>

                    <div className='sidebar-personal-icons'>
                        <a to='https://github.com/dkirkpatrick99' target="_blank">
                            <img src="github.png" alt="" />
                        </a>
                        <a to='https://www.linkedin.com/in/dalton-kirkpatrick-9284b3184/' target="_blank">
                            <img src="linkedin.png" alt="" />
                        </a>
                        <a to='https://angel.co/u/dalton-kirkpatrick' target="_blank">
                            <img src="angellist.png" alt="" />
                        </a>
                    </div>
                </div>                    
            </div>

        );

    } else {
        return (
            <div>Loading</div>
        )
    }
}

export default withRouter(SideBar);