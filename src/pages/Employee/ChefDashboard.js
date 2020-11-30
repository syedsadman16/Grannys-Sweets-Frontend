import React from "react";
import { useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";

const ChefDashboard = () => {
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  return (
    <div>
      Average dish rating for {username}: 
      <Rating>
      </Rating> 
    </div>
  );
};

export default ChefDashboard;