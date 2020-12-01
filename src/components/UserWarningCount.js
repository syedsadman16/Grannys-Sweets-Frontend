import React, { Component } from "react";
import axios from "axios";

class Warning extends Component{
  state = {warning:[]  };

  componentDidMount(){
    axios
    .get("/warning").then((response) => {
      console.log(response.data);
    })
    .catch((e) => console.log(e));
    }

    render(){
      return(
        <div className="Warnings">
          <header className="warning header">
            <p>(this.state.warning.length)</p>
          </header>
        </div>
      );
    }
  }

  export default Warning;
