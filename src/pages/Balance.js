import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";

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
      <div>Balance: {balance.toFixed(2)}</div>
      <form onSubmit={depositMoney}>
        <input
          type="number"
          min="0.00"
          step="0.01"
          value={amount}
          onChange={handleChange}
        />

        <button disabled={!amount} type="submit">
          Deposit
        </button>
      </form>
      <div>{showList()}</div>
    </div>
  );
};

export default Balance;
