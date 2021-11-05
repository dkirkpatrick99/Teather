export const getUserPic = userName => {
    let first = userName.slice(0, 1).toLowerCase();
    if (userName === 'stack_bot') {
        return "slackbot.png";
    } else if ('abcd'.includes(first)) {
        return "profile1.png";
    } else if ('efghi'.includes(first)) {
        return "profile2.png";
    } else if ('jklm'.includes(first)) {
        return "profile3.png";
    } else if ('nopqr'.includes(first)) {
        return "profile4.png";
    } else if ('stuv'.includes(first)) {
        return "profile5.png";
    } else {
        return "profile6.png";
    }
};

export const channelCheck = (memberships, channelId, channels, identifier, currentUserId) => {
    let flag = false;
    let redirectId;


    if(identifier === 'user') {
        // const ch1 = Object.values(channels).find(channel => (channel.name === channelId.toString() && channel.is_dm === true) || channel.admin_id === channelId && channel.is_dm === true)
        const membershipChannelIds = {}
        Object.values(memberships).forEach(membership => membershipChannelIds[membership.channel_id] = membership.channel_id)

        // const ch1 = Object.values(channels).forEach(channel => {
        //     const chId = channel.id
        //     if (membershipChannelIds[chId] && ((channel.admin_id === channelId && channel.name === currentUserId.toString())) || ((channel.admin_id === parseInt(currentUserId) && channel.name === channelId.toString()))) {
        //         return channel.id
        //     }
        // })
        const ch1 = Object.values(channels).find(channel => {
            const chId = channel.id
            if (membershipChannelIds[chId] && ((channel.admin_id === channelId && channel.name === currentUserId.toString())) || ((channel.admin_id === parseInt(currentUserId) && channel.name === channelId.toString()))) {
                return channel
            }
        })


        // const ch1 = Object.values(channels).forEach(channel => {
        //     if((channel.name === channelId.toString() && channel.is_dm === true) || (channel.admin_id === channelId && channel.is_dm === true)) {
        //         if(channel.name === currentUserId || channel.admin_id === currentUserId)
        //         return channel
        //     }
            
        // })
        if(ch1) flag = ch1.id;
    } else if (identifier === 'channel') {
        const ch2 = Object.values(memberships).some(membership => membership.channel_id === channelId)
        if(ch2) flag = channelId;
    }
    return flag;
}
// const mem = Object.values(memberships).some(membership => membership.channel_id === channelId)