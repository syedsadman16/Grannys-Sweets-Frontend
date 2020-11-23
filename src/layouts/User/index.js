import React from "react";
import NavBar from "./NavBar";

const CustomerLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default CustomerLayout;
