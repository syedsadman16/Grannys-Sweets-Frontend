import React, { useState, useEffect } from "react";
import api from "axios";
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "react-bootstrap";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

const Users = () => {
  const user = useSelector(({ user }) => user);
  const [allUsers, setAllUsers] = useState([]);
  const [closedUsers, setClosedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try{
      let {
        data: allUsers
      } = await api.get(`/users`);
      setAllUsers(allUsers);
      setUnverifiedUsers(allUsers.filter( (el) => el.verified === false ));
      setClosedUsers(allUsers.filter( (el) => el.closed === true ));
    }
    catch(E){}  
  };

  const verifyUser = async (id) => {
    console.log(id);
    try {
      let { data } = await api.patch(`/users/${id}`,{
        verified: true,
      });
      fetchUsers();
    }
    catch(E){} 
  };

  return user.role === "MANAGER" ? (
    <div>
      <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="All Users"/>
        <Tab label="Unverified Users"/>
        <Tab label="Closed Users"/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Closed</TableCell>
              <TableCell>Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              allUsers.map( (el) => (
                <TableRow key={el.id}>
                  <TableCell scope="row">
                    {el.id}
                  </TableCell>
                  <TableCell>
                    {el.role}
                  </TableCell>
                  <TableCell>
                    {el.username}
                  </TableCell>
                  <TableCell>
                    {el.closed ? 
                    'true'
                    :
                    'false'
                    }
                  </TableCell> 
                  <TableCell>
                    {el.verified ? 
                    'true'
                    :
                    'false'
                    }
                  </TableCell>   
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Click to Verify</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              unverifiedUsers.map( (el) => (
                <TableRow key={el.id}>
                  <TableCell scope="row">
                    {el.id}
                  </TableCell>
                  <TableCell>
                    {el.role}
                  </TableCell>
                  <TableCell>
                    {el.username}
                  </TableCell>
                  <TableCell>
                    {el.verified ? 
                    'true'
                    :
                    'false'
                    }
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => verifyUser(el.id)} variant="success">
                      Verify User
                    </Button>
                  </TableCell>    
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={2} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Closed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              closedUsers.map( (el) => (
                <TableRow key={el.id}>
                  <TableCell scope="row">
                    {el.id}
                  </TableCell>
                  <TableCell>
                    {el.role}
                  </TableCell>
                  <TableCell>
                    {el.username}
                  </TableCell>
                  <TableCell>
                    {el.verified ? 
                    'true'
                    :
                    'false'
                    }
                  </TableCell>
                  <TableCell>
                    {el.closed ? 
                    'true'
                    :
                    'false'
                    }
                  </TableCell>    
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TabPanel>
    </div>
  ) 
  : 
  (
    <div>You must login as MANAGER</div>
  );
};
export default Users;
