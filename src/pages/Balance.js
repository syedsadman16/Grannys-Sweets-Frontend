import React, { useState, useEffect } from "react";
import api from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from "react-redux";
import { Button,Form } from "react-bootstrap";
import "./Balance.css";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const id = useSelector(({ user }) => user.id);

  const fetchData = async () => {
    try {
      let {
        data: { balance },
      } = await api.get(`/users/balance`);
      setBalance(balance);

      let { data: transactions } = await api.get(`/transactions`);
      setTransactions(transactions);
    } catch (e) {}
  };

  const depositMoney = async (event) => {
    event.preventDefault();

    try {
      let { data } = await api.post("/transactions", {
        type: 1,
        amount,
        description: `Deposit: ${amount}`,
        userid: { id },
      });
      setTransactions((prev) => [...prev, data]);
      setBalance((prev) => prev + data.amount);
      console.log(data);
    } catch (error) {}
  };

  const showList = () => {
    return transactions.map((item, index) => (
      <div key={index}>
        <p>
          {item.description} | Amount:{item.amount.toFixed(2)}
        </p>
      </div>
    ));
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="outer"> <h3> Your Balance: $<i>{balance.toFixed(2)}</i> </h3> </div>
      
        <form onSubmit={depositMoney}>
          <div className="inner"> 
            <h4> Deposit an amount: </h4>
            <input 
              className="price"
              type="number"
              min="0.00"
              step="0.01"
              value={amount}
              onChange={handleChange}
            />
            <Button variant="primary" disabled={!amount} type="submit">
              Deposit
            </Button>
            </div>
        </form>
    
      <div>
      <Table aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {transactions.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center" scope="row">
                  {item.description}
                </TableCell>
                <TableCell align="center">
                  {item.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
        </div>
    </div>
  );
};

export default Balance;
