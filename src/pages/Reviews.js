import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "react-bootstrap";
import "./Reviews.css";


function Reviews() {
  const user = useSelector(({ user }) => user);  
  const [reviews, setReviews] = useState([]);

  useEffect( () =>{
    const getReviews = async() => {
        try{
          let { data: json } = await api.get(`rating/users/me`);
          setReviews(json);
        }
        catch(E){console.log(E)};
      };

      getReviews();
  }, []);

//   const theme = {
//     blue: {
//       default: "#3f51b5",
//       hover: "#283593"
//     },
//   };

  return (
    <div style={{margin:"auto", textAlign:"center"}}>
      <h1 style={{marginBottom: "10px"}}>
        My Ratings
      </h1>
      <Table aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell align="center">Review ID</TableCell>
            <TableCell align="center">Rating</TableCell>
            <TableCell align="center">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            reviews.map( (el) => (
              <TableRow key={el.id}>
                <TableCell align="center" scope="row">
                  {el.id}
                </TableCell>
                <TableCell align="center">
                  {el.rating > 3 ? 
                   <Button variant="primary"> {el.rating} </Button>
                  : 
                  <Button variant="danger"> {el.rating} </Button> 
                }  
                </TableCell>
                <TableCell align="center">
                  <h6> {el.comments} </h6>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default Reviews;