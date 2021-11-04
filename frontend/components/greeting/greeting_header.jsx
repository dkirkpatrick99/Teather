import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { signup, login } from "../../actions/session_actions"

class GreetingHeader extends React.Component {
    constructor(props) {
        super(props);
    };



    render() {
        return(
            // <div className="greeting-header-container">
                <div className='header-centerizer'>
                    <div className="left-header-container">
                        <div className="app-name-logo">
                            <img src="slack-icon-logo.png" alt=""/>
                            <h1>Teather</h1>
                        </div>
                        <div className="dropdown">
                            <div>Past Projects</div>
                            <div className="projects-dropdown-content">
                                <Link to='https://moneywise-crowdfunding.herokuapp.com/#/'>MoneyWise</Link>
                                <Link to='https://dkirkpatrick99.github.io/Super-Jelly-Hero/'>Super Jelly Hero</Link>
                                <Link to='https://ballup-app.herokuapp.com/#/'>BallUp</Link>
                            </div>
                        </div>

                        <Link to="https://github.com/dkirkpatrick99">GitHub</Link>
                        <Link to="https://www.linkedin.com/in/dalton-kirkpatrick-9284b3184">LinkedIn</Link>
                        <Link to="https://dkirkpatrick99.github.io/DaltonKirkpatrickPortfolio/">Portfolio</Link>
                    
                    </div>

                    <div className="right-header-container">
                        <Link to="/login">Sign In</Link>
                        <Link className='get-started-button' to="/signup">Get Started</Link>
                    </div>

                </div>

            // </div>
        )
    }
}

// const mSTP = (state) => {
//     return {

//     }
// }

const mDTP = (dispatch) => ({
    login: (user) => dispatch(login(user))
})

export default connect(null,mDTP)(GreetingHeader);