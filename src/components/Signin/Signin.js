import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            dataVar: '',
            varBool: false,
            wrongPass: '',
            isLoading :false
        }
        this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    }
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });

    }


    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();
        this.setState({isLoading:true});
        
        fetch('https://obscure-plateau-23992.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
            .then(user => {
                if (user.id != null) {
                    this.setState({isLoading:false});
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else {
                    this.setState({isLoading:false});
                    this.setState({ wrongPass: 'Password or Email Wrong !' })
                    this.props.onRouteChange('signin');
                }
            })
            .catch(err => console.log(err));


        // fetch('http://localhost:3001/signin', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: this.state.signInEmail,
        //         password: this.state.signInPassword
        //     })
        // }).then(response => response.json())
        //     .then(data => {

        //         if (data === 'success') {
        //             console.log('success');
        //             this.props.onRouteChange('home');
        //         }
        //     })
        //     .catch(err => console.log(err));
    }


    render() {
        const { onRouteChange } = this.props;
        
       if(this.state.isLoading == false)
          {
            return (
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                    <main className="pa4 black-80">
                        <form className="measure">
                            <h1 className="gradientHeaderLogin">Welcome to Face Detection Web App</h1> 
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                                </div>
                            </fieldset>
                            <div>{this.state.wrongPass}</div>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                            </div>
                        </form>
                    </main>
                </article>
            )
          }else{
              return(
                  <div className="loadingGeneral">
                        <div className="loadingClass">
                        </div>
                  </div>
              )
          }
        
    }



}

export default Signin;
