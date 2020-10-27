import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./redux/actions/user";
import { isEmpty } from "lodash";

export default (OriginalComponent, isPrivate = false) => {
  class ComposedComponent extends Component {
    checkAuth = async () => {
      await this.props.getUser(localStorage.getItem("userId"));
      if (isEmpty(this.props.user) && isPrivate) {
        this.props.history.push("/signin");
      }
      if (
        !isEmpty(this.props.user) &&
        (this.props.location.pathname === "/signin" ||
          this.props.location.pathname === "/register")
      ) {
        this.props.history.push("/");
      }
    };

    componentDidMount() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      getUser: (id) => dispatch(getUser(id)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};
