import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';



class Greeting extends React.Component{
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="greeting-main-container">
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
                        <h1>Slack is where the future works</h1>
                        <h2>Transform the way you work with one place for everyone and everything you need to get stuff done.</h2>
                    </div>
                </div>
            </div>
        )
    }
}


export default Greeting;