import React from 'react';
import { Link } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formal_name: '',
            username: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllUsers();
        this.props.fetchAllChannels();
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    demoLogin(){
        if (document.querySelector('.session-email')) {
            const demoEmail = "demouser@gmail.com".split('')
            const demoPassword = "pleasehireme".split('')
            
            const emailInterval = setInterval(() => {
                const first = demoEmail.splice(0, 1);
                
                this.setState(
                    { email: this.state.email + first[0] },
                    () => {
                        if (!demoEmail.length) {
                            clearInterval(emailInterval);

                            const passwordInterval = setInterval(() => {
                                const first = demoPassword.splice(0, 1);
                                this.setState(
                                    { password: this.state.password + first[0] },
                                    () => {
                                        if (!demoPassword.length) {
                                            clearInterval(passwordInterval)
                                            this.props.processForm(this.state)
                                        }
                                    }
                                )
                            }, 100)
                        }
                    }
                );
            }, 100)

        }
    }


    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const submitName = `${this.props.formType} Teather`
        if(this.props.formType === 'Sign Up for') {

            return (
                <div className="login-form-container-main">
                    <form onSubmit={this.handleSubmit} className="login-form-box">
    
                       <div className='session-logo-name'>
                            <Link to='/'>
                                
                                <h1><img src="slack-icon-logo.png" alt="" /> Teather</h1>
    
                            </Link>
                       </div>
                       <div className='login-form-container'>
                            <div className='session-form-welcome-text'>
                                <h2>{this.props.formType} Teather</h2>
                                <p>We suggest using the email address you use at work.</p>
                            </div>
                            {this.renderErrors()}
                            <div className="login-form">
                                <div className='login-input-flex'>
    
                                    <label>Display Name:</label>
                                    <input type="text"
                                        value={this.state.formal_name}
                                        placeholder='Charlie Day'
                                        onChange={this.update('formal_name')}
                                        className="login-input"
                                    />
    
                                    <label>Username:</label>
                                    <input type="text"
                                            value={this.state.username}
                                            placeholder="DayMan456"
                                            onChange={this.update('username')}
                                            className="login-input"
                                        />
                                
                                    <label>Email:</label>
                                    <input type="text"
                                            value={this.state.email}
                                            placeholder="FighterOfTheNightMan@ahahhh.com"
                                            onChange={this.update('email')}
                                            className="login-input"
                                        />
                              
                                    <label>Password:</label>
                                    <input type="password"
                                            value={this.state.password}
                                            placeholder="MilkSteak1"
                                            onChange={this.update('password')}
                                            className="login-input"
                                        />
                                    <div className='submit-button-container'>
                                        <input className="greeting-signup-button" type="submit" value={submitName}/>
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
                    <form onSubmit={this.handleSubmit} className="login-form-box">

                        <div className='session-logo-name'>
                            <Link to='/'>

                                <h1><img src="slack-icon-logo.png" alt="" /> Teather</h1>

                            </Link>
                        </div>
                        <div className='login-form-container'>
                            <div className='session-form-welcome-text'>
                                <h2>{this.props.formType} Teather</h2>
                                <p>We suggest using the email address you use at work.</p>
                            </div>
                            {this.renderErrors()}
                            <div className="login-form">
                                <div className='login-input-flex'>

                                    <label>Email:</label>
                                    <input type="text"
                                        value={this.state.email}
                                        placeholder="FighterOfTheNightMan@ahahhh.com"
                                        onChange={this.update('email')}
                                        className="login-input session-email"
                                    />

                                    <label>Password:</label>
                                    <input type="password"
                                        value={this.state.password}
                                        placeholder="MilkSteak1"
                                        onChange={this.update('password')}
                                        className="login-input session-password"
                                    />
                                    <div className='submit-button-container'>
                                        <input className="greeting-signup-button" type="submit" value={submitName} />
                                        <div>Or</div>
                                        <input onClick={this.demoLogin} type="button" className="greeting-signup-button" value="Demo Login"/>
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
}

export default SessionForm;
