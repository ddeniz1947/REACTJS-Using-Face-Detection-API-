import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FooterComponent from './components/Footer/FooterComponent';

const app = new Clarifai.App({
  apiKey: '63a91100bc474995bc84608688334c82'
});




const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {

  },
  generalArray: [],
  leftCol: [],
  topRow: [],
  rightCol: [],
  bottomRow: [],
  sLeftCol: [],
  sTopRow: [],
  sRightCol: [],
  sBottomRow: [],
  count: '',
  widthP: 0,
  heightP: 0,
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {

      },
      generalArray: [],
      leftCol: [],
      topRow: [],
      rightCol: [],
      bottomRow: [],
      sLeftCol: [],
      sTopRow: [],
      sRightCol: [],
      sBottomRow: [],
      count: '',
      widthP: 0,
      heightP: 0,
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // componentDidMount() {
  // }

  calculateFaceLocation = (response) => {

    const image = document.getElementById('inputImage');
    // const width = Number(image.width);
    this.setState({ widthP: Number(image.width) })
    // const height = Number(image.height);
    this.setState({ heightP: Number(image.height) })
    let counter = 0;
    this.setState({ generalArray: response.outputs[0].data.regions });
    // for (let i = 0; i < response.outputs[0].data.regions.length; i++) {

    //   this.state.topRow.push(response.outputs[0].data.regions[i].region_info.bounding_box.top_row * height);
    //   this.state.leftCol.push(response.outputs[0].data.regions[i].region_info.bounding_box.left_col * width);
    //   this.state.rightCol.push(width - (response.outputs[0].data.regions[i].region_info.bounding_box.right_col * width));
    //   this.state.bottomRow.push(height - (response.outputs[0].data.regions[i].region_info.bounding_box.top_row * height));
    //   counter++;

    // }
    this.setState({ sLeftCol: this.state.leftCol });
    this.setState({ sRightCol: this.state.rightCol });
    this.setState({ sTopRow: this.state.topRow });
    this.setState({ sBottomRow: this.state.bottomRow });

    // this.setState(this.state.count = counter);
    // const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;


    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height)
    // }

  }

  // displayFaceBox = (box) => {
  //   console.log(box);
  //   this.setState({ box: box });
  // }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });

  }



  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://obscure-plateau-23992.herokuapp.com/imageurl', { //API KEY GİZLEMEK İÇİN
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://obscure-plateau-23992.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })

          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        console.log(response,'response');
        this.calculateFaceLocation(response);
      })
      .catch(err => console.log(err));
  }

  // onSubmit = () => {
  //   this.setState({ imageUrl: this.state.input });
  //   app.models
  //     .predict(
  //       Clarifai.FACE_DETECT_MODEL,
  //       this.state.input)
  //     .then(response => {
  //       if (response) {
  //         fetch('http://localhost:3001/image', {
  //           method: 'put',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             id: this.state.user.id
  //           })

  //         })  
  //         .then(response => response.json())
  //         .then(count => {
  //           this.setState(Object.assign(this.state.user,{entries:count}))
  //         })
  //       }
  //       this.calculateFaceLocation(response)
  //     })
  //     .catch(err => console.log(err));
  // }


  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === 'signin') {
      this.setState(Object.assign(initialState));
    }
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    else {
      this.setState({ isSignedIn: false })
    }

  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render() {

    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm onSubmitClick={this.onSubmit} onInputChange={this.onInputChange} />
            <FaceDetection width={this.state.widthP} height={this.state.heightP} countArray={this.state.generalArray} imageUrl={this.state.imageUrl} /> </div>
          : (
            this.state.route === 'signin'
              ? 
              <div> 
                <Logo />
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
              :
              <div> 
                <Logo /> 
                <Register onRouteChange={this.onRouteChange} />
              </div>
              
          )

        }
        <FooterComponent />
      </div>
    );

  }

}


export default App;
