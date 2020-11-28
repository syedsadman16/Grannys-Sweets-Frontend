import React, { useState, useEffect } from "react";
import api from "axios";
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Form } from "react-bootstrap";

const Taboo = () => {
  const user = useSelector(({ user }) => user);
  const [newTabooWord, setnewTabooWord] = useState('')
  const [tabooWords, setTabooWords] = useState([]);

  const getTabooWords = async () => {
    try{
      let {
        data: taboowords
      } = await api.get(`/tabooword`);
      setTabooWords(taboowords);
    }
    catch(E){console.log(E)};
    };

  const handleChange = (e) => {
    setnewTabooWord(e.target.value);
  };

  const addNewTabooWord = async (event) => {
    event.preventDefault();

    try{
      await api.post(`/tabooword`,{
        word: newTabooWord
      });
      getTabooWords();
      setnewTabooWord('');
    }
    catch(E){console.log(E)}
  };

  const removeWord = async (id) => {
    console.log("deleting taboo word id:", id);
    try {
      await api.delete(`/tabooword/${id}`,{
        wordid: id
      });
      getTabooWords();
    }
    catch(E){console.log(E)}
  };

  useEffect( () =>{
    getTabooWords();
  }, []);

  return (
    <div className="taboo-page-container" style={{width: "80%",margin:"auto", textAlign:"center"}}>
      <h1 style={{marginBottom: "10px"}}>
        List of Taboo Words
      </h1>
      <Table aria-label="simple table" style={{width: "50%",margin:"auto", textAlign:"center"}} > 
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Word</TableCell>
            <TableCell align="center">Remove Word</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tabooWords.map( (el) => (
              <TableRow key={el.id}>
                <TableCell align="center" scope="row">
                  {el.id}
                </TableCell>
                <TableCell align="center">
                  {el.word}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => removeWord(el.id)} variant="danger">
                    Remove
                  </Button>
                </TableCell>  
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <div style={{width: "80%",margin:"auto", textAlign:"center", marginTop:"25px"}}>
        <h1>
          Add Taboo Word
        </h1>
        <Form onSubmit={addNewTabooWord}> 
          <div style={{width: "250px",margin:"auto"}}>
            <Form.Group controlId="formBasicTabooWord">
              <Form.Control value={newTabooWord} placeholder="Enter word" onChange={handleChange}/>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Taboo;