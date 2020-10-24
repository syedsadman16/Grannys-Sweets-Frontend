import React from "react";
import NavBar from "../components/CustomerNav";

const CustomerLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default CustomerLayout;
