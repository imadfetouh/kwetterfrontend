import React from "react";
import Router from "./router/router";
import Footer from './components/footer/footer'

export default class App extends React.Component {
  
  render() {

    return (
      <div id="appRoot">
        <Router />
        <Footer />
      </div>
    );
  }
}