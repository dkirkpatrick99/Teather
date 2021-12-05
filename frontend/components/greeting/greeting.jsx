import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import GreetingHeader from './test_header'

const Greeting = (props) => {

    
    const debounce = (func, wait = 20, immediate = true) => {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearInterval(timeout);
        timeout = setInterval(later, wait)
        if (callNow) func.apply(context, args);
      };
    };

    
    const checkSlide = () => {
        const sliderImages = document.querySelectorAll('.slide-in');
        sliderImages.forEach(sliderImage => {
            // half way through the image
            const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 3;
            // bottom of the image
            const imageBottom = sliderImage.offsetTop + sliderImage.height;
            const isHalfShown = slideInAt > sliderImage.offsetTop;
            const isNotScrolledPast = window.scrollY < imageBottom;
            if (isHalfShown && isNotScrolledPast) {
                sliderImage.classList.add('active');
                console.log('here')
            } else {
                sliderImage.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', debounce(checkSlide));

    return (
        <div className="greeting-main-container">

                <GreetingHeader />
                {/* <TestHeader /> */}

                <div className="top-greeting-container">
                    <div className='greeting-video-fill'></div>

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
                        <p>Already using Teather? <Link to='/login'>Sign In</Link></p>
                        {/* <img className="normie" id="asana" src={window.asana_iconURL} />
                        <img className="reversereverse" id="atlassian" src={window.atlassian_iconURL} />
                        <img className="reversereverse" id="dropbox" src={window.dropbox_iconURL} />
                        <img className="reversereverse" id="google" src={window.google_iconURL} />
                        <img className="normie" id="hubspot" src={window.hubspot_iconURL} />
                        <img className="reversereverse" id="zendesk" src={window.zendesk_iconURL} />
                        <img className="normie" id="zoom" src={window.zoom_iconURL} /> */}

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
                            <img className="align-left slide-in" src="SlackChat4.gif" alt=""/>
                            <div className="chat-desc-container">
                                <h2>Move faster by organizing your work life</h2>
                                <p>The key to productivity in Teather is organized spaces called channels—a different one for everything you’re working on. With all the people, messages and files related to a topic in one place, you can move a whole lot faster.</p>
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
                                <img className="align-right slide-in" src="SlackDM.gif" alt="" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mid3-greeting-container">
                    <div className='background-overlay-purple'>

                        <div className='smoosh'>

                            <div className="video-text-container">
                                <img className="align-left slide-in" src="SlackVideoCalling.gif" alt="" />
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
                                <a className='greeting-login-button' href="https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/">CONTACT ME</a>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Greeting;