import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";
import { isEmpty } from "lodash";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import {Form, Button} from 'react-bootstrap';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [errorMessage, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector(({ user }) => user);

  const fetchData = async () => {
    try {
      let { data } = await api.get("/discussion");
      setDiscussions(data);
    } catch (e) {}
  };

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const createTopic = async (event) => {
    event.preventDefault();
    if (["CUSTOMER", "VIP"].includes(user.role)) {
      try {
        let { data } = await api.post("/discussion", { topic });
        setDiscussions((prev) => [...prev, data]);
        setTopic("")
        await dispatch(getUser(user.id));
      } catch (error) {}
    } else {
      setMessage("Only Customer can create discussions.");
    }
  };

  const showList = () => {
    return discussions.map((item, index) => (
      <>
      <Link to={`/discussions/${item.id}`} key={index} style={{textDecoration:'none'}}>
        <Card variant="outlined" style={{minWidth:'max-content',maxWidth:"800px",margin:'auto',marginBottom:"20px",backgroundColor:"#dbdbdb"}}>
          <CardContent>
            <Typography style={{textTransform:'uppercase',fontWeight:"600"}} variant="h5" component="h2">
              {item.topic}
            </Typography>
            <Typography style={{fontSize:'14'}} color="textSecondary" gutterBottom>
              By: {item.creator.username}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      </>
    ));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div style={{margin:"auto", textAlign:"center",marginTop:'10px',width:"800px"}}>
      <div className="page-title-text">Discussion Board</div>
        <div className="menu-icon-divider-container" style={{marginBottom:"20px"}}>
        <hr className="title-divider-left" />
          <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
        <hr className="title-divider-right" />
      </div>
      {!discussions.length ? <div>No Discussions</div> : showList()}
    </div>
    <div style={{margin:"auto",width:"max-content"}}>
      <Form inline onSubmit={createTopic}>
        <Form.Group>
          <Form.Control className="mx-sm-3" placeholder="Add Topic" value={topic} onChange={handleChange} style={{width:"400px"}}/>
          <Form.Text id="passwordHelpBlock" muted  style={{marginRight:"16px"}}>
            {isEmpty(user) ? <> Please Sign In First </> : user.closed ?  <> Your Account Is Closed</> : !user.verified ? <> Your Account Is Unverified</> : null}
          </Form.Text>
        </Form.Group>
        <Button type="submit" disabled={!topic || !user.role || user.closed || !user.verified}>
          Create Topic
        </Button>
      </Form>
    </div>
    </>
  );
}
