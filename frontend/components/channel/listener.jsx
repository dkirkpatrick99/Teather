// import React from 'react';

// class Listener extends React.Component {
//     constructor(props) {
//         super(props);
//         this.createSubscriptions = this.createSubscriptions.bind(this);
//     }

//     // calls create subscriptions once the client page is rendered
//     componentDidMount() {

//         if (this.props.currentUser) {
//             this.createSubscriptions();
//         }
//     }

//     // calls createSubscriptions if a channel re render is needed but won't recreate
//     // already existing Action Cable subscriptions
//     componentDidUpdate(prevProps) {

//         //DO NOT REMOVE THIS IF CHECK!
//         if (prevProps && prevProps.currentChannel !== this.props.currentChannel) {
//             this.createSubscriptions();
//         }
//     }

//     // iterates through and deletes Action Cable subscriptions on logout
//     componentWillUnmount() {

//         this.chats.forEach(channel => {
//             channel.unsubscribe();
//         })
//     }









//     createSubscriptions() {
//         let memberships = this.props.memberships;
//         this.chats = memberships.map(membership => (
//             App.cable.subscriptions.create(
//                 {
//                     channel: "ChatChannel",
//                     room: membership.channel_id
//                 },
//                 {
//                     connected: () => {
//                         // console.log(`Connected to ${membership.channel_id}`);
//                     },
//                     disconnected: () => {
//                         // console.log("Disconnected!");
//                     },
//                     received: data => {
//                         let payload = {
//                             messages: {
//                                 [data.message.id]: data.message
//                             },
//                             user: {
//                                 [data.user.id]: data.user
//                             }
//                         }
//                         
//                         this.props.receiveMessage(payload);
//                     }
//                 }
//             )
//         ));
//     }

//     render() {
//         if (!this.props.currentUser) return null;
//         return (
//             <div></div>
//         );
//     }
// }

// export default Listener;

// import React from "react";
// import { Route, Switch } from "react-router-dom";

// class Listener extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     componentDidMount() {
//         this.props.fetchAllUsers()
//         // then(
//         //     () => {
//         //         this.props.fetchAllChannels();
//         //         this.props.fetchAllDirects();
//         //         this.props.fetchMemberships();
//         //         this.props.fetchAllMessages();
//         //     }
//         // )
//         App.NotificationsChannel = App.cable.subscriptions.create(
//             { channel: "NotificationsChannel", currentUserId: this.props.currentUser },
//             {
//                 received: data => {
//                     switch (data.type) {
                        
//                         case "membershipAdd":
//                             this.props
//                                 .receiveMembership(data.membership);
//                             break;
//                         case "directAdd":
//                             this.props
//                                 .fetchDirect(data.directId);
//                             break;
//                         case "channelAdd":
//                             this.props
//                                 .fetchChannel(data.channelId);
//                             break;
//                         case "userAdd":
//                             this.props.fetchAllUsers();
//                             this.props
//                                 .fetchUser(data.userId);
                            
//                             break;
//                     }
//                 }
//             }
//         );
//     }
//     componentDidUpdate() { }

//     componentWillUnmount() {
//         App.NotificationsChannel.unsubscribe();
//     }

//     render() {
//         if (!this.props.currentUser) return null;
//         return (
//             <div></div>
//         );
//     }
// }

// export default Listener;