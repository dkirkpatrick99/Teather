import React from 'react';

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
        // const channelArr = [];
        // const dmArr = [];
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
        const threadHash = this.renderChannelsAndDms();
        let dmLinks
        let channelLinks
        if(threadHash !== null){
            channelLinks = threadHash["channel"].map(channel => 
                <li key={channel[0]}> {"# "+channel[1]}


                </li>
            );
            dmLinks = threadHash["dm"] ? threadHash["dm"].map(dm => 
                <li key={dm[0]}> {dm[1]}


                </li>
            ) : null
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

export default SideBar;