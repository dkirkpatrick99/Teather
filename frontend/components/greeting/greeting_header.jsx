import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { signup, login } from "../../actions/session_actions"

const GreetingHeader = (props) => {

    // const triggers = document.querySelectorAll('.cool > li');



    const handleEnter = (e) => {
        e.currentTarget.classList.add('trigger-enter');
        // setTimeout(() => e.currentTarget.classList.contains('trigger-enter') && e.currentTarget.classList.add('trigger-enter-active'), 150);
        const bounceInt = setInterval(() => { e.currentTarget.classList.contains('trigger-enter') && e.currentTarget.classList.add('trigger-enter-active') },150);
        clearInterval(bounceInt);
        const background = document.querySelector('.dropdownBackground');
        const nav = document.querySelector('.top');
        
        background.classList.add('open');
        
        const dropdown = e.currentTarget.querySelector('.dropdown');
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();

        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top + 100,
            left: dropdownCoords.left - navCoords.left
        };

        background.style.setProperty('width', `${coords.width}px`);
        background.style.setProperty('height', `${coords.height}px`);
        background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
    }

    const handleLeave = (e) => {
        e.currentTarget.classList.remove('trigger-enter', 'trigger-enter-active');
        const background = document.querySelector('.dropdownBackground');
        // debugger
        background.classList.remove('open');
    }

    // triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
    // triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

    return(
        <div className='header-centerizer'>
            <div className="left-header-container">
                <div className="app-name-logo">
                    <img src="slack-icon-logo.png" alt="" />
                    <h1>Teather</h1>
                </div>
                <div className="dropdown">
                    <div>Past Projects</div>
                    <ul className="projects-dropdown-content">
                        <li>
                            <a href='https://moneywise-crowdfunding.herokuapp.com/#/'>MoneyWise</a>
                        </li>
                        <li>
                            <a href='https://dkirkpatrick99.github.io/Super-Jelly-Hero/'>Super Jelly Hero</a>
                        </li>
                        <li>
                            <a href='https://ballup-app.herokuapp.com/#/'>BallUp</a>
                        </li>
                    </ul>
                </div>

                <a href="https://github.com/dkirkpatrick99">GitHub</a>
                <a href="https://www.linkedin.com/in/dalton-kirkpatrick-9284b3184">LinkedIn</a>
                <a href="https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/">Portfolio</a>

            </div>

            <div className="right-header-container">
                <Link to="/login">Sign In</Link>
                <Link className='get-started-button' to="/signup">Get Started</Link>
            </div>

        </div>

    )
}

// const mSTP = (state) => {
//     return {

//     }
// }

const mDTP = (dispatch) => ({
    login: (user) => dispatch(login(user))
})

export default connect(null,mDTP)(GreetingHeader);