import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';
import { Button,Form } from "react-bootstrap";

const CustomerOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const userid = useSelector(({ user }) => user.id);
  const [dishRating, setDishRating] = useState(2.5);
  const [dishComment, setDishComment] = useState('');
  const [userRating, setUserRating] = useState(2.5);
  const [userComment, setUserComment] = useState('');
  const [dishRatingTracker, setDishRatingTracker] = useState([]);
  const [ratingTracker, setRatingTracker] = useState([]);
  
  const fetchAllOrders = async () => {
    try{
      let {
        data: orders
      } = await api.get(`/orders`);
      setAllOrders(orders);
    }
    catch(E){console.log(E)};
  };

  const markOrderCompleted = async(orderId) => {
    try{
      await api.post(`/orders/${orderId}`);
      fetchAllOrders();
    }
    catch(E){console.log(E)};
  };

  const handleDishRatingSubmit = async(id,orderId) => {
    setDishRatingTracker((prev) => [...prev, orderId]);
    try{
      console.log("rating:", parseFloat(dishRating),"comments:", dishComment,"critic:", id ,"dish:", id)
      await api.post(`/rating/dishes/${id}/create`,{
        rating: parseFloat(dishRating),
        comments: dishComment,
        critic: { id: userid },
        dish: { id },
      });
      fetchAllOrders();
    }
    catch(E){console.log(E)};
  };

  const handleCommentChange = (e) => {
    setDishComment(e.target.value);
  };

  const handleUserCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const handleUserRatingSubmit = async(id,orderId) => {
    setRatingTracker((prev) => [...prev, orderId]);
    try{
      console.log("rating:", parseFloat(userRating),"comments:", userComment,"person:", id ,"order:", orderId)
      await api.post(`/rating/users/add`,{
        rating: parseFloat(userRating),
        comments: userComment,
        person: { id },
        order: { id : orderId }
      });
      fetchAllOrders();
    }
    catch(E){console.log(E)};
  };

  useEffect( () =>{
    fetchAllOrders();
  }, []);

  return (
    <div style={{margin:"auto", textAlign:"center"}}>
      {console.log(allOrders)}  
      <h1>
        All Placed Orders
      </h1>
      <Table aria-label="simple table" style={{textAlign:"center"}} > 
        <TableHead>
          <TableRow>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Ordered By</TableCell>
            <TableCell align="center">Dish</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Delivery Person</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Rate Dish</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            allOrders.map( (el) => (
              <TableRow key={el.id}>
                <TableCell align="center" scope="row">
                  {el.id}
                </TableCell>
                <TableCell align="center">
                  {el.customer.username}
                </TableCell>
                <TableCell align="center">
                  {el.dishOrders[0].dish.name}
                </TableCell>
                <TableCell align="center">
                  x{el.dishOrders[0].quantity}
                </TableCell>
                <TableCell align="center">
                  {el.deliveryPerson == null ? 
                  <div>
                    Unassigned
                  </div>
                  :
                    <div>
                      {el.deliveryPerson.username}
                      {el.completed ?
                        !ratingTracker.includes(el.id) ? 
                          <div>
                            <Form onSubmit={() => handleUserRatingSubmit(el.deliveryPerson.id,el.id)}> 
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
                          </div>
                        :
                          <Button variant="success" disabled>
                            Rating Submitted!
                          </Button>
                      :
                        <div></div>}
                    </div>
                     
                    
                  }
                </TableCell>
                <TableCell align="center">
                  {el.completed ? 
                    <Button variant="success" disabled>
                      Completed
                    </Button>
                  :
                    <>
                      <div style={{marginBottom:"10px"}}>
                        <Button variant="danger" disabled>
                          Uncompleted
                        </Button>
                      </div>
                      <div>
                        <Button onClick={() => markOrderCompleted(el.id)} variant="success">
                          Mark As Completed
                        </Button>
                      </div>
                    </>
                  }
                </TableCell>
                <TableCell align="center">
                  {el.completed ?
                    !dishRatingTracker.includes(el.id) ?
                    <> 
                      <div>
                        <Form onSubmit={() => handleDishRatingSubmit(el.dishOrders[0].dish.id, el.id)}> 
                          <div style={{width: "200px",margin:"auto"}}>
                            <Form.Group>
                              <Form.Control value={dishComment} onChange={handleCommentChange} required placeholder="Dish Comment"/>
                            </Form.Group>
                            <Rating style={{marginBottom:"10px"}}
                              name="simple-controlled"
                              value={dishRating}
                              required
                              precision={.5}
                              onChange={(event, newValue) => {
                                setDishRating(newValue);
                              }}
                            />
                          </div>
                          <Button variant="primary" type="submit">
                            Submit Rating
                          </Button>
                        </Form>
                      </div>
                    </>
                    : 
                      <Button variant="success" disabled>
                        Dish Rating Submitted!
                      </Button>
                  :
                    <>
                      <Button variant="success" disabled>
                        Order Must be Complete
                      </Button>
                    </>
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

export default CustomerOrders;
