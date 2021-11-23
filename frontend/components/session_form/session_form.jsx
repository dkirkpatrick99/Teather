import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";

const SessionForm = (props) => {

    const initialState = {
            formal_name: '',
            username: '',
            email: '',
            password: ''
        };

    const [formData, setFormData] = useState(initialState)
    const [demoEmail, setDemoEmail] = useState('')
    const [demoPassword, setDemoPassword] = useState('')
    const dEmail = useRef(null)
    const dPassword = useRef(null)
    
    useEffect(() => {
        props.fetchAllUsers();
        props.fetchAllChannels()
    }, [])



    const update = (field, value) => {
        return e => setFormData({
            ...formData, [field]: e.currentTarget.value
        });
    }

    const handleSubmit = (e) => {
        if(e) {
            e.preventDefault();
            const user = Object.assign({}, formData);
            props.processForm(user);
        } else {
            const demo = { email: dEmail.current.value, password: dPassword.current.value}
            props.processForm(demo);
        }
    }

    const demoLogin = () => {
        setFormData(initialState)
        if (document.querySelector('.session-email')) {
            const demoEmail = "demouser@gmail.com".split('')
            const demoPassword = "pleasehireme".split('')
            
            const emailInterval = setInterval(() => {
                const first = demoEmail.splice(0, 1);
                setDemoEmail(demoEmail => demoEmail + first[0])
                    
                if (!demoEmail.length) {
                    clearInterval(emailInterval);

                    const passwordInterval = setInterval(() => {
                        const first = demoPassword.splice(0, 1);
                        setDemoPassword(demoPassword => demoPassword + first[0] )
                            
                        if (!demoPassword.length) {
                            clearInterval(passwordInterval)
                            handleSubmit()
                        }
                    }, 100)
                }
            }, 100)
        }
    }


    const renderErrors = () => {
        return (
            <ul>
                {props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    const submitName = `${props.formType} Teather`

    if(props.formType === 'Sign Up for') {
        return (
            <div className="login-form-container-main">
                <form onSubmit={handleSubmit} className="login-form-box">
                    <div className='session-logo-name'>
                        <Link to='/'>
                            <h1><img src="slack-icon-logo.png" alt="" /> Teather</h1>
                        </Link>
                    </div>

                    <div className='login-form-container'>
                        <div className='session-form-welcome-text'>
                            <h2>{props.formType} Teather</h2>
                            <p>We suggest using the email address you use at work.</p>
                        </div>
                        {renderErrors()}
                        <div className="login-form">
                            <div className='login-input-flex'>

                                <label>Display Name:</label>
                                <input type="text"
                                    value={formData.formal_name}
                                    placeholder='Charlie Day'
                                    onChange={update('formal_name')}
                                    className="login-input"
                                />

                                <label>Username:</label>
                                <input type="text"
                                        value={formData.username}
                                        placeholder="DayMan456"
                                        onChange={update('username')}
                                        className="login-input"
                                    />
                            
                                <label>Email:</label>
                                <input type="text"
                                        value={formData.email}
                                        placeholder="FighterOfTheNightMan@ahahhh.com"
                                        onChange={update('email')}
                                        className="login-input"
                                    />
                            
                                <label>Password:</label>
                                <input type="password"
                                        value={formData.password}
                                        placeholder="MilkSteak1"
                                        onChange={update('password')}
                                        className="login-input"
                                    />
                                <div className='submit-button-container'>
                                    <input className="greeting-signup-button" type="submit" value={submitName} />
                                    <div>Or</div>
                                    <Link to='/login' className="greeting-signup-button">Demo Login</Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="session-form-change">Already have an account? <Link to='/login'>Sign In</Link></div>
                </form>
            </div>
        );
    } else {
        return(
            <div className="login-form-container-main">
                <form onSubmit={handleSubmit} className="login-form-box">

                    <div className='session-logo-name'>
                        <Link to='/'>

                            <h1><img src="slack-icon-logo.png" alt="" /> Teather</h1>

                        </Link>
                    </div>
                    <div className='login-form-container'>
                        <div className='session-form-welcome-text'>
                            <h2>{props.formType} Teather</h2>
                            <p>We suggest using the email address you use at work.</p>
                        </div>
                        {renderErrors()}
                        <div className="login-form">
                            <div className='login-input-flex'>

                                <label>Email:</label>
                                <input type="text"
                                    value={formData.email || demoEmail}
                                    ref={dEmail}
                                    placeholder="FighterOfTheNightMan@ahahhh.com"
                                    onChange={update('email')}
                                    className="login-input session-email"
                                />

                                <label>Password:</label>
                                <input type="password"
                                    value={formData.password || demoPassword}
                                    ref={dPassword}
                                    placeholder="MilkSteak1"
                                    onChange={update('password')}
                                    className="login-input session-password"
                                />
                                <div className='submit-button-container'>
                                    <input className="greeting-signup-button" type="submit" value={submitName} />
                                    <div>Or</div>
                                    <input onClick={demoLogin} type="button" className="greeting-signup-button" value="Demo Login"/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="session-form-change">Don't have an account yet? <Link to='/signup'>Sign up</Link></div>
                </form>
            </div>
        )
    }
}

export default SessionForm;
