import React, { Component } from "react";
import axios from 'axios'

const api = axios.create({
    warnningURL: 'http://localhost:3000/api/warning'
})

class Warning extends Component{

  state = {warning:[]
  }

constructor() {
    super();
    api.get('/').then(res => {
        console.log(res.data)
        this.setState({warning: res.data})
    })
}

render(){
  return(
    <div className= "Warnings">
      <header className = "Warnings header">
        {this.state.warning.map(warning => <h2 key = {warning.id}></h2>)}
      </header>
    </div>
  )
}
}
/*  
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
*/