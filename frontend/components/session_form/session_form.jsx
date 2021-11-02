import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchChannels();
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
        return (
            <div className="login-form-container-main">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                   <div className='session-logo-name'>
                        <img src="slack-icon-logo.png" alt=""/>
                        <h1>Teather</h1>
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
                                    value={this.state.username}
                                    placeholder='Charlie Day'
                                    onChange={this.update('username')}
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
                                        value={this.state.username}
                                        placeholder="FighterOfTheNightMan@ahahhh.com"
                                        onChange={this.update('username')}
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
                </form>
            </div>
        );
    }
}

export default SessionForm;
