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
        // this.props.fetchUserDirects();
    };

    // renderChannelsAndDms() {
    //     const that = this;
    //     const threads = {"dm":[], "channel":[]};
    //     const memberships = this.props.memberships;
        
    //     if (Object.keys(this.props.userChannels) !== 0 && Object.keys(this.props.memberships) !== 0 && Object.keys(this.props.allUsers).length > 1) {
    //         Object.values(memberships).forEach(membership => {
    //             const channelId = membership.channel_id;
    //             const channel = that.props.userChannels[channelId];
    //             const dmName = that.props.currentUser.id === parseInt(channel.name) ? that.props.allUsers[channel.admin_id] : that.props.allUsers[channel.name]
                
    //             if(!channel){
    //                 return;
    //             };
            
    //             if(!channel.is_dm){
    //                 // channelArr.push([channel.id, channel.name]);
    //                 threads["channel"].push([channel.id, channel.name]);
    //             } else if (channel.is_dm) {
    //                 threads["dm"].push([channel.id, channel.name, channel.admin_id, dmName.formal_name]);
    //             }
    //         })
    //     }
    //     // this.setState(threads)
    //     return threads
    // }

    toggleElement(){
        const dropdownToggle = document.querySelector('.dropdown');
        if(dropdownToggle){
            dropdownToggle.classList.toggle('active')
        }
    }

    render () {
        // const channelId = parseInt(this.props.match.params.channel_id);
        // const threadHash = this.renderChannelsAndDms();
        // let dmLinks
        // let channelLinks
        // if(threadHash !== null){
        //     channelLinks = threadHash["channel"].map(channel => {
                
        //         return channelId === channel[0] ? 
        //             <li className="channel-list-item active" key={channel[0]}>
        //                 <NavLink to={`/client/${channel[0]}`}>{"# " + channel[1]}</NavLink>
        //             </li>
        //         :
        //             <li className="channel-list-item" key={channel[0]}> 
        //                 <NavLink to={`/client/${channel[0]}`}>{"# " + channel[1]}</NavLink>
        //             </li>
        //         }
        //     );

        //     dmLinks = threadHash["dm"].length > 0 ? threadHash["dm"].map(dm => {

        //         return channelId === dm[0] ?
        //             <li className="channel-list-item active" key={dm[0]}> 
        //                 <NavLink to={`/client/${dm[0]}`}>
        //                     <img src={getUserPic(dm[3])} alt="" />
        //                     {dm[3]}
        //                     </NavLink>
        //             </li>
        //         :
        //             <li className="channel-list-item" key={dm[0]}>
        //                 <NavLink to={`/client/${dm[0]}`}>
        //                     <img src={getUserPic(dm[3])} alt="" />
        //                     {dm[3]}
        //                     </NavLink>
        //             </li>
        //     }) 
        //     : null
        // }
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
                                        <Link to='https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/'>Visit my portfolio</Link>
                                        <Link to=''>Switch to Light Theme</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <img onClick={() => this.props.openModal('directMessageSearch')} src="compose.png" alt=""/> */}
                        </div>
    
                        <div className="channel-list-container">
                            <div  className='channel-img-contain'>

                                <div className="channel-name">Channels</div>
                                {/* <img onClick={() => this.props.openModal('createChannel')} src="plus.png" alt=""/> */}
                            </div>
                            <ul className="channel-list">
                                {/* {channelLinks} */}
                            </ul>
                        </div>
    
                        <div className="dm-list-container">
                            <div className='dm-img-contain'>
                                <div className="dm-name">Direct Messages</div>
                            {/* <img onClick={() => this.props.openModal('directMessageSearch')} src="plus.png" alt=""/> */}

                            </div>
                            <ul className="dm-list">
                                {/* {dmLinks} */}
                            </ul>
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