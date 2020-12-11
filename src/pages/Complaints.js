import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button,Form } from "react-bootstrap";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const user = useSelector(({ user }) => user);
  const [denyMesg,setDenyMesg] = useState('');

  const fetchComplaints = async() => {
    try{
      let {
        data: allClaims
      } = await api.get(`/claims`);
      setComplaints(allClaims);
    }
    catch(E){console.log(E)};
  };

  const approveClaim = async(claimId) => {
    try{
      await api.post(`claims/approveClaim/${claimId}`,{
      });
      await api.delete(`/claims/${claimId}`,{
      });
      fetchComplaints();
    }
    catch(E){console.log(E)};
  };

  const denyComplaint = async(claimId) => {
    try{
      await api.post(`claims/denyClaim/${claimId}`,{
        message: denyMesg,
      });
      fetchComplaints();
      setDenyMesg('');
    }
    catch(E){console.log(E)};
  };

  const handleChange = (e) => {
    setDenyMesg(e.target.value);
  };

  useEffect( () =>{
    fetchComplaints();
  }, []);

  return (
    <div style={{margin:"auto", textAlign:"center"}}>
      {console.log(denyMesg)}
      <h1 style={{marginBottom: "10px"}}>
        List of Pending Claims
      </h1>
      <Table aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell align="center">Complaint ID</TableCell>
            <TableCell align="center">Complaint Message</TableCell>
            <TableCell align="center">Complaint By</TableCell>
            <TableCell align="center">Complaint Role</TableCell>
            <TableCell align="center">Approve (rating for complainant removed)</TableCell>
            <TableCell align="center">Deny (warning issued to complainant)</TableCell>
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
                <TableCell align="center">
                  {el.victim.role}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => approveClaim(el.id)} variant="danger">
                    Approve
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Form onSubmit={() => denyComplaint(el.id)}> 
                    <Form.Group controlId="formBasicDenyMesg">
                      <Form.Control value={denyMesg} placeholder="Enter message" onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="danger" type="submit">
                      Deny
                    </Button>
                  </Form>
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