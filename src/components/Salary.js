import React, { Component } from "react";
import axios from "axios";

class Salary extends Component{
  state = {salary:{}  };

  componentDidMount(){
    axios
    .get("/salary").then((response) => {
      console.log(response.data);
      this.setState({
        salary: response.data,
      });
    })
    .catch((e) => console.log(e));
    }

    render(){
      return(
        <div className="Salary">
          <header className="salary header">
            <p>Salary:</p>
            <p>{(this.state.salary)}</p>
          </header>
        </div>
      );
    }
  }

  export default Salary;
