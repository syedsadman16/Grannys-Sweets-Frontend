import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const user = useSelector(({ user }) => user);
  const [closedUsers, setClosedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  useEffect(() => {
    //  fetchUsers();
  }, []);

  return user.role === "MANAGER" ? (
    <div>Manage users</div>
  ) : (
    <div>You must login as MANAGER</div>
  );
};
export default Users;
