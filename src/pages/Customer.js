import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";

const Customer = () => {
  const user = useSelector(({ user }) => user)
  const showStatus = (
    <div>
      Status:
      {user.role === "VIP" ? <>***VIP***</> : <>***Regular Customer***</>}
    </div>
  );
  const [allCustomerOrders, setAllCustomerOrders ] = useState([]);
  
  const fetchAllCustomerOrders = async() => {
    try{
      let {
        data: orders
      } = await api.get(`/orders`);
      setAllCustomerOrders(orders);
    }
    catch(E){console.log(E)};
  };

  useEffect( () =>{
    fetchAllCustomerOrders();
  }, []);

  return (
    <div>
      {console.log(allCustomerOrders)}
      {showStatus}
      <h2>
        Top 3 Ordered Dishes:
      </h2>
      {
        allCustomerOrders.length == 0 ?
          <div>
            You have no orders so far
          </div>
        :
        allCustomerOrders.length > 0 ?
          <List>
            <ListItem key={allCustomerOrders[0].id} dense button>
              <ListItemIcon >
                <FontAwesomeIcon icon={faCookie} size="1x" color="gray" />
              </ListItemIcon>
              <ListItemText primary={allCustomerOrders[0].dishOrders[0].dish.name} />
            </ListItem>
            <ListItem key={allCustomerOrders[1].id} dense button>
              <ListItemIcon >
                <FontAwesomeIcon icon={faCookie} size="1x" color="gray" />
              </ListItemIcon>
              <ListItemText primary={allCustomerOrders[1].dishOrders[0].dish.name} />
            </ListItem>
            <ListItem key={allCustomerOrders[2].id} dense button>
              <ListItemIcon >
                <FontAwesomeIcon icon={faCookie} size="1x" color="gray" />
              </ListItemIcon>
              <ListItemText primary={allCustomerOrders[2].dishOrders[0].dish.name} />
            </ListItem>
          </List>
        :
        null
      }
    </div>
  );
};

export default Customer;
