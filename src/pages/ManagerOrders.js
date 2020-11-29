import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "react-bootstrap";

const ManagerOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    try{
      let {
        data: orders
      } = await api.get(`/orders`);
      setAllOrders(orders);
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
            <TableCell align="center">Delivery Person</TableCell>
            <TableCell align="center">Status</TableCell>
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
                  {el.customer.deliveryperson == null ? 
                  <div>
                    Unassigned
                  </div>
                  :
                  <div>
                    {el.customer.deliveryperson}
                  </div>
                  }
                </TableCell>
                <TableCell align="center">
                  {el.completed ? 
                    <Button variant="success" disabled>
                      Completed
                    </Button>
                  :
                    <Button variant="danger" disabled>
                      Uncompleted
                    </Button>}
                </TableCell>  
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagerOrders;