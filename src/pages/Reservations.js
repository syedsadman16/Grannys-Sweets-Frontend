import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Reservations = () => {
  const [reservationsList, setReservationsList] = useState([]);

  const fetchReservations = async () => {
    try{
      let {
        data: reservs
      } = await api.get(`/reservations`);
      setReservationsList(reservs);
    }
    catch(E){console.log(E)};
  };

  useEffect( () =>{
    fetchReservations();
  }, []);

  return(
    <h1>
      {console.log(reservationsList)}
      {isEmpty(reservationsList) ?
        <div style={{margin:"auto", textAlign:"center"}}>
          No reservations made
        </div>
        :
        <div>
          {reservationsList.map( (el) => (
            <Card key={el.id} variant="outlined" style={{margin:"10px",width:"400px"}}>
              <CardContent>
                <Typography variant="h3" component="h2">
                  Table #{el.table.id}
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  From
                </Typography>
                <Typography variant="body2" component="p">
                  {el.timeSlot.from}
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  To
                </Typography>
                <Typography variant="body2" component="p">
                  {el.timeSlot.to}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    </h1>
  );
};

export default Reservations;