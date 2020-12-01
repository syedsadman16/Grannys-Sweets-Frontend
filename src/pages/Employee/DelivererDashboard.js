import React from "react";
import { useSelector } from "react-redux";
import UserWarnings from "../../components/UserWarningCount";


const DelivererDashboard = () => {
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  return (
    <div>
    <UserWarnings />
      <h1>
        Deliverer Dashboard
      </h1>
    </div>

  );
};

export default DelivererDashboard;