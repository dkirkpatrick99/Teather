import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { signup, login } from "../../actions/session_actions"

const TestHeader = (props) => {
    // const triggers = document.querySelectorAll('.greeting-list > li');
    // const background = document.querySelector('.dropdownBackground');
    // const nav = document.querySelector('.top');

    const handleEnter = (e) => {
        e.target.classList.add('trigger-enter');
        // const classAdd = setInterval(() =>{
        //     e.target.classList.contains('trigger-enter') && e.target.classList.add('trigger-enter-active');
        //     debugger
            
        // },150)
        // clearInterval(classAdd)
        setTimeout(() => e.target.classList.contains('trigger-enter') && e.target.classList.add('trigger-enter-active'), 150);

        const background = document.querySelector('.dropdownBackground');
        const nav = document.querySelector('.top');

        background.classList.add('open');

        const dropdown = e.currentTarget.querySelector('.follow-dropdown');
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();

        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top - 5,
            left: dropdownCoords.left - navCoords.left
        };

        background.style.setProperty('width', `${coords.width}px`);
        background.style.setProperty('height', `${coords.height}px`);
        background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
    }

    const handleLeave = (e) => {
        const background = document.querySelector('.dropdownBackground');

        e.currentTarget.classList.remove('trigger-enter', 'trigger-enter-active');
        background.classList.remove('open');
    }

    // triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
    // triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));


    return(
        <div class="main">

            <nav class="top">

                <div class="dropdownBackground">
                    <span class="arrow"></span>
                </div>

                <ul class="greeting-list">
                    <div className="app-name-logo follow-item">
                        <img src="slack-icon-logo.png" alt="" />
                        <h1>Teather</h1>
                    </div>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave} class="follow-item">
                        <a href="#">About Me</a>
                        <div class="follow-dropdown dropdown1">
                            <div class="bio">
                                <img src="https://logo.clearbit.com/wesbos.com"></img>
                                    <p>Wes Bos sure does love web development. He teaches things like JavaScript, CSS and BBQ. Wait.
                                BBQ isn't part of web development. It should be though!</p>
                            </div>
                        </div>
                    </li>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave} class="follow-item">
                        <a href="#">Past Projects</a>
                        <ul class="follow-dropdown courses">
                            <li>
                                <span class="code">MoneyWise</span>
                                <a href="https://ReactForBeginners.com">Crowd-fund your way to a new beginning</a>
                            </li>
                            <li>
                                <span class="code">Ball Up</span>
                                <a href="https://ES6.io">Find, Join or Post pick up basketball games</a>
                            </li>
                            <li>
                                <span class="code">Super Jelly Hero</span>
                                <a href="https://LearnNode.com">Embark on an epic adventure. Do you have what it takes?</a>
                            </li>
                        </ul>
                    </li>
                    <li onMouseEnter={handleEnter} onMouseLeave={handleLeave} class="follow-item">
                        <a href="#">Contact Me</a>
                        <ul class="follow-dropdown dropdown3">
                            <li><a class="button" href="http://twitter.com/wesbos">Twitter</a></li>
                            <li><a class="button" href="http://facebook.com/wesbos.developer">Facebook</a></li>
                            <li><a class="button" href="http://wesbos.com">Blog</a></li>
                            <li><a class="button" href="http://wesbos.com/courses">Course Catalog</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="right-header-container">
                    <Link to="/login">Sign In</Link>
                    <Link class='get-started-button' to="/signup">Get Started</Link>
                </div>
        </nav>
    </div> 
    )
}


const mDTP = (dispatch) => ({
    login: (user) => dispatch(login(user))
})

export default connect(null, mDTP)(TestHeader);