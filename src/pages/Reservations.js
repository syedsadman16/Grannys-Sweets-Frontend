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
            <Card variant="outlined" style={{margin:"10px"}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Table_ID
                </Typography>
                <Typography color="textSecondary">
                  From
                </Typography>
                <Typography variant="body2" component="p">
                  date_from
                </Typography>
                <Typography s color="textSecondary">
                  To
                </Typography>
                <Typography variant="body2" component="p">
                  date_to
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