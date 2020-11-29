import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const user = useSelector(({ user }) => user);

  const fetchComplaints = async() => {
    try{
      let {
        data: allClaims
      } = await api.get(`/claims`);
      setComplaints(allClaims);
    }
    catch(E){console.log(E)};
  };

  useEffect( () =>{
    fetchComplaints();
  }, []);

  return (
    <div style={{margin:"auto", textAlign:"center"}}>
      {console.log(complaints)}
      <h1 style={{marginBottom: "10px"}}>
        List of Complaints
      </h1>
      <Table aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell align="center">Complaint ID</TableCell>
            <TableCell align="center">Message</TableCell>
            <TableCell align="center">Filed By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            complaints.map( (el) => (
              <TableRow key={el.id}>
                <TableCell align="center" scope="row">
                  {el.id}
                </TableCell>
                <TableCell align="center">
                  {el.message}
                </TableCell>
                <TableCell align="center">
                  {el.victim.username}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default Complaints;