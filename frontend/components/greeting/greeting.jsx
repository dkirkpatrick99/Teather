import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';



const Greeting = ({ currentUser, logout }) => {
    const sessionLinks = () => (

        <nav className="login-signup">
            <Link to="/" className="header-link">
                <h1>TeatherLite</h1>
            </Link>
            <Link to="/login">Login</Link>
      &nbsp;or&nbsp;
            <Link to="/signup">Sign up!</Link>
        </nav>
    );
    const personalGreeting = () => (
        <hgroup className="header-group">
            <Link to="/" className="header-link">
                <h1>TeatherLite</h1>
            </Link>
            <h2 className="header-name">Hi, {currentUser.username}!</h2>
            <button className="header-button" onClick={logout}>Log Out</button>
        </hgroup>
    );

    return currentUser ? personalGreeting() : sessionLinks();
    // return <nav className="login-signup">
    //     <Link to="/" className="header-link">
    //         <h1>TeatherLite</h1>
    //     </Link>
    //     <Link to="/login">Login</Link>
    //   &nbsp;or&nbsp;
    //         <Link to="/signup">Sign up!</Link>
    // </nav>
};


export default Greeting;