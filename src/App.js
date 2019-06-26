import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'a43c8a86e7d7491184858ec949c224c9'
 });

const particlesOptions={
  particles:{
    number:{
      value:30,
      density:{
        enable:true,
        value_area:80
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:''
    }
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(
      function(response) {
        // do something with response
        console.log(response)
      },
      function(err) {
        // there was an error
      }
    );
  }
  render(){
  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  )
}
}

export default App;
