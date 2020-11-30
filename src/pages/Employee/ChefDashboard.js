import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import api from "axios";

const ChefDashboard = () => {
  const user = useSelector(({ user }) => user);
  const [avgRating, setAvgRating] = useState(0);

  const fetchChefAverageRating = async () => {
    try{
      let {
        data: rating
      } = await api.get(`/rating/chef/${user.id}`,{
        id: user.id,
      });
      setAvgRating(rating);
    }
    catch(E){console.log(E)};
  };

  useEffect( () =>{
    fetchChefAverageRating();
  }, []);

  return (
    <div>
      Average dish rating for {user.username}: 
      <Rating value={parseInt(avgRating)} precision={0.5} readOnly/>
    </div>
  );
};

export default ChefDashboard;