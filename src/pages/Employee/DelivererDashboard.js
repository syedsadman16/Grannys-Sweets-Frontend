import React from "react";
import { useSelector } from "react-redux";

const DelivererDashboard = () => {
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  return (
    <h1>
      Deliverer Dashboard
    </h1>
  );
};

export default DelivererDashboard;