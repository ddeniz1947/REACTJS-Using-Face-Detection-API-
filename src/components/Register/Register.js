import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: '',
            wrongReg: ''
        }
        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        this.onRegisterPassword = this.onRegisterPassword.bind(this);
        this.onRegisterEmail = this.onRegisterEmail.bind(this);
        this.onRegisterName = this.onRegisterName.bind(this);
    }


    onRegisterEmail(event) {
        this.setState({ registerEmail: event.target.value });
    }

    onRegisterPassword(event) {
        this.setState({ registerPassword: event.target.value });
    }

    onRegisterName(event) {
        this.setState({ registerName: event.target.value });
    }
    onSubmitRegister = (e) => {
        e.preventDefault();
        debugger;
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        }).then(response => response.json())
            .then(data => {
                if(data.id){
                    if(data !== false){
                        this.props.onRouteChange('signin');
                    }
                    else {
                        this.setState({
                            wrongReg: 'Register Failed. This E-Mail was taken!'
                        })
                    }
                }
                else {
                    this.setState({
                        wrongReg: 'Register Failed. Please submit correct data!'
                    })
                }
            })
            .catch(err => {
                this.setState({
                    wrongReg: 'Register Failed. This E-Mail was taken!'
                })
            });
    }




    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">Name</label>
                                <input onChange={this.onRegisterName} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">E-mail</label>
                                <input onChange={this.onRegisterEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="password">Password</label>
                                <input onChange={this.onRegisterPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div>{this.state.wrongReg}</div>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitRegister} />
                        </div>

                    </form>
                </main>
            </article>
        )
    }



}

export default Register;
