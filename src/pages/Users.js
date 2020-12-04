import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
          <Box>{children}</Box>
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
  const [employeeUsers, setEmployeeUsers] = useState([]);
  const [value, setValue] = React.useState(0);
  const [salary, setSalaries] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchUsers();
    getSalaries();
  }, []);

  const fetchUsers = async () => {
    try {
      let { data: allUsers } = await api.get(`/users`);
      setAllUsers(allUsers);
      setUnverifiedUsers(allUsers.filter((el) => el.verified === false));
      setClosedUsers(allUsers.filter((el) => el.closed === true));
      setEmployeeUsers(
        allUsers.filter(
          (el) =>
            el.role !== "CUSTOMER" && el.role !== "MANAGER" && el.role !== "VIP"
        )
      );
    } catch (E) {}
  };

  const getSalaries = async () => {
    try {
      let { data: salaries } = await api.get("/salary");
      setSalaries(salaries);
    } catch (E) {
      console.log(E);
    }
  };

  const verifyUser = async (id) => {
    console.log(id);
    try {
      let { data } = await api.patch(`/users/${id}`, {
        verified: true,
      });
      fetchUsers();
    } catch (E) {
      console.log(E);
    }
  };

  const handleDemotion = async (id, currentSalary) => {
    console.log("-500 to", id);
    try {
      await api.put(`/salary/${id}`, {
        id: id,
        amount: currentSalary - 500,
      });
      getSalaries();
    } catch (E) {
      console.log(E);
    }
  };

  const handlePromotion = async (id, currentSalary) => {
    console.log("+500 to", id);
    try {
      await api.put(`/salary/${id}`, {
        id: id,
        amount: currentSalary + 500,
      });
      getSalaries();
    } catch (E) {
      console.log(E);
    }
  };

  const handleFire = async (id) => {
    console.log("deleting id", id);
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
      getSalaries();
    } catch (E) {
      console.log(E);
    }
  };

  return user.role === "MANAGER" ? (
    <div>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="All Users" />
        <Tab label="Unverified Users" />
        <Tab label="Closed Users" />
        <Tab label="Employees" />
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
            {allUsers.map((el) => (
              <TableRow key={el.id}>
                <TableCell scope="row">{el.id}</TableCell>
                <TableCell>{el.role}</TableCell>
                <TableCell>{el.username}</TableCell>
                <TableCell>{el.closed ? "true" : "false"}</TableCell>
                <TableCell>{el.verified ? "true" : "false"}</TableCell>
              </TableRow>
            ))}
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
            {unverifiedUsers.map((el) => (
              <TableRow key={el.id}>
                <TableCell scope="row">{el.id}</TableCell>
                <TableCell>{el.role}</TableCell>
                <TableCell>{el.username}</TableCell>
                <TableCell>{el.verified ? "true" : "false"}</TableCell>
                <TableCell>
                  <Button onClick={() => verifyUser(el.id)} variant="success">
                    Verify User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Closed</TableCell>
              <TableCell>Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closedUsers.map((el) => (
              <TableRow key={el.id}>
                <TableCell scope="row">{el.id}</TableCell>
                <TableCell>{el.role}</TableCell>
                <TableCell>{el.username}</TableCell>
                <TableCell>{el.verified ? "true" : "false"}</TableCell>
                <TableCell>{el.closed ? "true" : "false"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleFire(el.id)} variant="danger">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Promote</TableCell>
              <TableCell>Demote</TableCell>
              <TableCell>Fire</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salary.map((el) => (
              <TableRow key={el.user.id}>
                <TableCell scope="row">{el.user.id}</TableCell>
                <TableCell>{el.user.role}</TableCell>
                <TableCell>{el.user.username}</TableCell>
                <TableCell>{el.amount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handlePromotion(el.user.id, el.amount)}
                    variant="success"
                  >
                    + $500
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDemotion(el.user.id, el.amount)}
                    variant="warning"
                  >
                    - $500
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleFire(el.user.id)}
                    variant="danger"
                  >
                    Fire
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
    </div>
  ) : (
    <div>You must login as MANAGER</div>
  );
};
export default Users;
