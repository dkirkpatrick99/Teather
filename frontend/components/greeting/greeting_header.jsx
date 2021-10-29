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
            <div className="greeting-header-container">
                <div className="left-header-container">
                    <div className="app-name-logo">
                        <div>icon</div>
                        <div>Teather</div>
                    </div>
                    <div>
                        <Link to="">GitHub</Link>
                    </div>
                    <div>
                        <Link to="">LinkedIn</Link>
                    </div>
                    <div>
                        <Link to="">Portfolio</Link>
                    </div>

                </div>

                <div className="right-header-container">
                    <div>
                        <Link to="/login">Sign In</Link>
                    </div>
                    <div>
                        <Link to="/signup">Get Started</Link>
                    </div>
                </div>

            </div>
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