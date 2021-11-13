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

export const channelCheck = (userDirects, identifier, currentUserId, typeId, allMemberships, allChannels) => {
    let flag = false;

    if(identifier === 'direct') {
        const directFinder = Object.values(userDirects).find(direct => {
            if ((direct.user_ids[0].user_id === currentUserId && direct.user_ids[1].user_id === typeId) 
                ||
                (direct.user_ids[1].user_id === currentUserId && direct.user_ids[0].user_id === typeId) ) {
                return direct
            }
        })
        if(directFinder) flag = `direct/${directFinder.id}`;

    } else if (identifier === 'channel') {
        const userNavables = userChannels(allMemberships, currentUserId, allChannels, userDirects)
        if(userNavables.channels.includes(parseInt(typeId))) {
            flag = `channel/${typeId}`
        }
    }
    return flag;
}


export const userChannels = (allMemberships, currentUserId, allChannels, userDirects) => {
    let userNavables = {directs: [], channels: []};
    Object.values(allMemberships).forEach(membership => {
        const channelId = membership.memberable_type === 'Channel' && membership.user_id === currentUserId ? membership.memberable_id : null;
        const directId = membership.memberable_type === 'Direct' && membership.user_id === currentUserId ? membership.memberable_id : null;
        const channel = allChannels[channelId];
        const direct = userDirects[directId]
        if (channel || direct) {
            channel ? userNavables["channels"].push(channel.id) : userNavables["directs"].push(direct.id)
        } else {
            return;
        }
    })    
    return userNavables
}
// const mem = Object.values(memberships).some(membership => membership.channel_id === channelId)