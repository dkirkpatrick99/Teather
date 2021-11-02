import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import GreetingHeader from './greeting_header'



class Greeting extends React.Component{
    constructor(props) {
        super(props)
    }


    changeElementHeight() {
        const videoContainer = document.querySelector(".video-container")
        const topContainer = document.querySelector('.top-greeting-container')
    }

    render() {
        return (
            <div className="greeting-main-container">

                    <GreetingHeader />

                    <div className="top-greeting-container">

                            <video
                                autoPlay
                                loop
                                muted
                                src="https://a.slack-edge.com/085e3/marketing/img/homepage/video/brand-campaign_hero-video.mp4"
                                type="video/mp4"
                                id="rollingball-gif"
                            />

                        <div className="greeting-main-text">
                            <h1>Teather is where the future works</h1>
                            <p>Transform the way you work with one place for everyone and everything you need to get stuff done.</p>
                            <div className='greeting-button-container'>
                                <Link className='greeting-signup-button' to='/signup'>TRY TEATHER</Link>
                                <Link className='greeting-login-button' to='/signup'>SEE THE DEMO</Link>
                            </div>
                            <p>Already using Teather? <Link to='/login'>Sign In</Link>
                            </p>

                        </div>

                        <div className="greeting-text-blocks-container">
                            <div>
                                <img src="square_circle.png" alt="" />
                                <h2>Conversations, organized</h2>
                                <p>Instead of a single overstuffed inbox, conversations in Stack happen in dedicated spaces called channels.</p>
                            </div>
                            <div>
                                <img src="computer.png" alt="" />
                                <h2>Get looped in, not out</h2>
                                <p>Stack makes it simple to follow conversations or find important information in an easily searchable archive.</p>
                            </div>
                            <div>
                                <img src="highfive.png" alt="" />
                                <h2>Give focus a chance</h2>
                                <p>
                                    Stack lets you choose which conversations are most important — and which can wait.</p>
                            </div>
                        </div>

                    </div>

                    <div className="mid-greeting-container">
                        <div className='smoosh'>

                            <div className="chat-text-container">
                                <img src="SlackChat4.gif" alt=""/>
                                <div className="chat-desc-container">
                                    <h2>Move faster by organizing your work life</h2>
                                    <p>The key to productivity in Slack is organized spaces called channels—a different one for everything you’re working on. With all the people, messages and files related to a topic in one place, you can move a whole lot faster.</p>
                                    <Link to='/signup'>Try For Free</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mid2-greeting-container">
                        <div className='background-overlay-white'>

                            <div className='smoosh'>

                                <div className='DM-content-container'>
                                    <div className="chat-desc-container">
                                        <h2>Simplify teamwork for everyone</h2>
                                    <p>Give everyone you work with—inside and outside your company—a more productive way to stay in sync. Respond faster with emoji, keep conversations focused in channels, and simplify all your communication into one place.</p>
                                        <Link className='greeting-signup-button' to='/signup'>Try For Free</Link>
                                    </div>
                                    <img src="SlackDM.gif" alt="" />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mid3-greeting-container">
                        <div className='background-overlay-purple'>

                            <div className='smoosh'>

                                <div className="video-text-container">
                                    <img src="SlackVideoCalling.gif" alt="" />
                                    <div className="chat-desc-container">
                                        <h2>And you can chat face to face, with just a click</h2>
                                    <p>Meet more efficiently with video conferencing. It’s easier to see things eye-to-eye when you’re face-to-face. Video conferencing helps you share information more efficiently, so work gets done faster.</p>
                                        <Link to='/signup'>Try For Free</Link>
                                    </div>
                                </div>

                                <div className='end-mid-container'>
                                    <div className='end-icon-text-container'>
                                        <img src="slack-icon-logo.png" alt="" />
                                        <h2>Welcome to where the future works</h2>
                                    </div>
                                    <div className='greeting-button-container'>
                                        <Link className='greeting-signup-white' to='/signup'>TRY TEATHER</Link>
                                        <Link className='greeting-login-button' to='/'>CONTACT ME</Link>
                                    </div>
                                </div>

                        </div>
                        </div>
                </div>
                
            </div>
        )
    }
}


export default Greeting;