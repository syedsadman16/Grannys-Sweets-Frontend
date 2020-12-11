import React, { useState, useEffect } from "react";
import api from "axios";
import Rating from "@material-ui/lab/Rating";
import { Button, Form } from "react-bootstrap";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const DelivererRateCustomer = () => {
  const [allDelivererJobs, setAllDelivererJobs] = useState([]);
  const username = useSelector(({ user }) => user.username);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(2.5);
  const history = useHistory();

  const fetchAllDelivererJobs = async () => {
    try{
      let {
        data: res
      } = await api.get(`/jobs/delivery`)
      setAllDelivererJobs(res.filter(a => (
        a.order.deliveryPerson != null && a.order.deliveryPerson.username == username
      )))
    }
    catch(E){console.log(E)};
  };

  const handleUserCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  useEffect( () => {
    fetchAllDelivererJobs();
  },[]);

  const handleRateCustomer = async (e,id,orderId) => {
    e.preventDefault();
    try{
      await api.post(`/rating/users/add`,{
        rating: parseFloat(userRating),
        comments: userComment,
        person: { id },
        order: { id : orderId }
      })
      history.go(0);
    }
    catch(E){console.log(E)};
  };

  return(
    <div style={{margin:"auto", textAlign:"center"}}>
      {console.log(allDelivererJobs)}
      <h1>
        My Deliveries
      </h1>
      <Table aria-label="simple table" style={{textAlign:"center"}} > 
        <TableHead>
          <TableRow>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Ordered By</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Rate Customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            allDelivererJobs.map( (el) => (
              <TableRow key={el.id}>
                <TableCell align="center" scope="row">
                  {el.order.id}
                </TableCell>
                <TableCell align="center">
                  {el.order.customer.username}
                </TableCell>
                <TableCell align="center">
                  {el.status == 1 ?
                    <Button variant="warning" disabled>
                      In Progress
                    </Button>
                    : el.status == 2 ?
                    <Button variant="success" disabled>
                      Completed
                    </Button>
                    : <>el.status</>
                  }
                </TableCell>
                <TableCell align="center">
                  {el.status == 2 ?
                    <Form onSubmit={(e) => handleRateCustomer(e,el.order.customer.id,el.order.id)}> 
                      <div style={{width: "200px",margin:"auto"}}>
                        <Form.Group>
                          <Form.Control value={userComment} onChange={handleUserCommentChange} required placeholder="Rating Comment"/>
                        </Form.Group>
                        <Rating style={{marginBottom:"10px"}}
                          name="controlled"
                          value={userRating}
                          required
                          precision={.5}
                          onChange={(event, newValue) => {
                            setUserRating(newValue);
                          }}
                        />
                      </div>
                      <Button variant="primary" type="submit">
                        Submit Rating
                      </Button>
                    </Form>
                    :
                    <Button variant="danger" disabled>
                      Delivery Not Completed Yet
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default DelivererRateCustomer;