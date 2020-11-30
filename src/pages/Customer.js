import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "axios";

const Customer = () => {
  const user = useSelector(({ user }) => user)
  const showStatus = (
    <div>
      Status:
      {user.role === "VIP" ? <>***VIP***</> : <>***Regular Customer***</>}
    </div>
  );

  return (
    <div>
      {showStatus}
      More customer stuff
    </div>
  );
};

export default Customer;
