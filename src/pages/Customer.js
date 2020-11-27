import React from "react";
import { useSelector } from "react-redux";

const Customer = () => {
  const user = useSelector(({ user }) => user);

  const showStatus = (
    <div>
      Status:
      {user.role === "VIP" ? <>***VIP***</> : <>***Regular Customer***</>}
    </div>
  );
  return (
    <div>
      {showStatus}
      <div>Other customer stuff</div>
    </div>
  );
};

export default Customer;
