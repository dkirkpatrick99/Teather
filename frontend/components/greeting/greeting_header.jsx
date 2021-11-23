import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { signup, login } from "../../actions/session_actions"

const GreetingHeader = (props) => {

    return(
        <div className='header-centerizer'>
            <div className="left-header-container">
                <div className="app-name-logo">
                    <img src="slack-icon-logo.png" alt=""/>
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