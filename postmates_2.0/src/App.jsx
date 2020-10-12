import React from 'react';
import Header from './Components/Header/Header';
import './App.css';

export default class App extends React.Component{
  constructor(){
    super();

    this.state = {
      loggedInStatus: false,
    }
  }

  render() {
    return (
      <>
        <h1> App </h1>
        <Header/>
      </>
    )
  }
}
