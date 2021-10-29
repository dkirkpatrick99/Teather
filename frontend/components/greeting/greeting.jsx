import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';



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

                <div className="top-greeting-container">
                    <div className="video-container">
                        <video
                            autoPlay
                            loop
                            muted
                            src="https://a.slack-edge.com/085e3/marketing/img/homepage/video/brand-campaign_hero-video.mp4"
                            type="video/mp4"
                            id="rollingball-gif"
                        />

                    </div>
                    <div className="greeting-main-text">
                        <h1>Teather is where the future works</h1>
                        <p>Transform the way you work with one place for everyone and everything you need to get stuff done.</p>
                    </div>
                </div>
                
            </div>
        )
    }
}


export default Greeting;