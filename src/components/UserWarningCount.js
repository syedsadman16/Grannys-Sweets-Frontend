import React, { Component } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import Info from "../components/Info";
import axios from "axios";

class Warning extends Component {
  state = { warning: [] };

  componentDidMount() {
    axios
      .get("/warning")
      .then((response) => {
        console.log(response.data);
        this.setState({
          warning: response.data,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div className="Warnings">
        <Info
          title="Warnings"
          body={this.state.warning.length}
          icon={WarningIcon}
        />
      </div>
    );
  }
}

export default Warning;
