import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./redux/actions/user";
import { isEmpty } from "lodash";
import ClosedPage from "./pages/Closed";
import UnverifiedPage from "./pages/Unverified";

export default (OriginalComponent, isPrivate = false) => {
  class ComposedComponent extends Component {
    checkAuth = async () => {
      //const user = this.props.user;
      const user = await this.props.getUser(localStorage.getItem("userId"));
      if (isEmpty(user) && isPrivate) {
        return this.props.history.push("/signin");
      }
      if (!isEmpty(user)) {
        if (
          this.props.location.pathname === "/signin" ||
          this.props.location.pathname === "/signup" ||
          (["CUSTOMER", "VIP"].includes(user.role) &&
            this.props.location.pathname.startsWith("/employee")) ||
          (!["CUSTOMER", "VIP"].includes(user.role) &&
            this.props.location.pathname.startsWith("/customer"))
        ) {
          this.props.history.push("/");
        }
      }
    };

    componentDidMount() {
      this.checkAuth();
    }

    render() {
      const user = this.props.user;
      if (!isEmpty(user) && user.closed && isPrivate) {
        return <ClosedPage {...this.props} />;
      } else if (!isEmpty(user) && !user.verified && isPrivate) {
        return <UnverifiedPage {...this.props} />;
      }
      return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ user }) => {
    return {
      user,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      getUser: (id) => dispatch(getUser(id)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};
