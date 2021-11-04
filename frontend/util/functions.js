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

export const channelCheck = (memberships, channelId, channels, identifier) => {
    let flag = false;
    let redirectId;
    if(identifier === 'user') {
        const ch1 = Object.values(channels).find(channel => (channel.name === channelId.toString() && channel.is_dm === true) || channel.admin_id === channelId && channel.is_dm === true)
        // const mem = Object.values(memberships).some(membership => membership.channel_id === channelId)
        if(ch1) flag = ch1.id;
debugger
    } else if (identifier === 'channel') {
        const ch2 = Object.values(memberships).some(membership => membership.channel_id === channelId)
        if(ch2) flag = channelId;
    }
    return flag;
}