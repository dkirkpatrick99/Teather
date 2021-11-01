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
                                <button>MoneyWise</button>
                                <button>Super Jelly Hero</button>
                                <button>BallUp</button>
                            </div>
                        </div>

                        <Link to="">GitHub</Link>
                        <Link to="">LinkedIn</Link>
                        <Link to="">Portfolio</Link>
                    
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