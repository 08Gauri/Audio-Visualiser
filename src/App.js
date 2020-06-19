import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Visualiser from './Visualiser/Visualiser';

class App extends Component{
  render(){
      return (
        <div className="App">
          <Visualiser />
      </div>
    );
   } 
}

export default App;
