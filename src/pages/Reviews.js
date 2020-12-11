import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button,Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Reviews.css";


function Reviews() {
  const user = useSelector(({ user }) => user);  
  const [reviews, setReviews] = useState([]);
  const [userComment, setUserComment] = useState('');
  const history = useHistory();

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

  const handleUserCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const handleSubmitClaim = async (e,id) => {
    e.preventDefault();
    try{
      await api.post(`/claims/submitClaim`,{
        message: userComment,
        userRating: {id: id},
        victim: {id: user.id}
      })
      history.go(0);
    }
    catch(E){console.log(E)};
  };

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
      {console.log(reviews)}
      <Table aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell align="center">Review ID</TableCell>
            <TableCell align="center">Rating</TableCell>
            <TableCell align="center">Comments</TableCell>
            <TableCell align="center">Submit Claim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            reviews.map( (el) => {
              console.log("TYPE", el);
              console.log("TYPE", el.type);
              if(el.type == 0) 
              return(
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
                <TableCell align="center">
                  <Form onSubmit={(e) => handleSubmitClaim(e,el.id)}> 
                    <div style={{width: "200px",margin:"auto"}}>
                      <Form.Group>
                        <Form.Control value={userComment} onChange={handleUserCommentChange} required placeholder="Claim Message"/>
                      </Form.Group>
                    </div>
                    <Button variant="primary" type="submit">
                      Submit Claim
                    </Button>
                  </Form>
                </TableCell>
              </TableRow>
            )})
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default Reviews;