import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "axios";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import {Form, Button} from 'react-bootstrap';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const id = parseInt(location.pathname.split("/").splice(-1));
  const [errorMessage, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [discussion, setDiscussion] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const fetchData = async () => {
    try {
      let { data: discussion } = await api.get(`/discussion/${id}`);
      setDiscussion(discussion);
      let { data: comments } = await api.get(`/comment/${id}`);
      setComments(comments);
    } catch (e) {}
  };
  const showList = () => {
    return comments.map((item, index) => (
      <div key={index} style={{margin:"auto",width:"800px"}}>
        <ListItem key={index} button>
          <ListItemAvatar style={{marginRight:"20px"}} >
            <AccountCircleIcon style={{display:"block",margin:"auto",height:"40px",width:"40px"}}>
            </AccountCircleIcon>
            <Typography style={{fontWeight:"bold"}}>
              {item.commenter.username}
            </Typography>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="body1"                      
                  color="textPrimary"
                  style={{fontWeight:"500"}}
                >
                  {item.message}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider />
      </div>
    ));
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const createComment = async (event) => {
    event.preventDefault();
    if (["CUSTOMER", "VIP"].includes(user.role)) {
      try {
        let { data } = await api.post("/comment", {
          message: comment,
          discussion: { id },
        });
        setComments((prev) => [...prev, data]);
        setComment("")
        await dispatch(getUser(user.id));
      } catch (error) {}
    } else {
      setMessage("Only Customers can comment.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div style={{margin:"auto", textAlign:"center",marginTop:'10px'}}>
      {isEmpty(errorMessage) ? null : <p>{errorMessage}</p>}
      <div style={{margin:"auto", textAlign:"center"}}>
        <Typography variant="h4" style={{fontWeight:"600"}}>
          Topic: {isEmpty(discussion) ? "N/A" : discussion.topic}
        </Typography>
        <Typography variant="h6" gutterBottom style={{fontWeight:"300"}}>
          By: {isEmpty(discussion) ? "N/A" : discussion.creator.username}
        </Typography>
      </div>
      <div style={{marginBottom:"20px"}}>
        {!comments.length ? <div>No Comments</div> : showList()}
      </div>
    </div>
    <div style={{margin:"auto",width:"max-content"}}>
        <Form inline onSubmit={createComment}>
          <Form.Group>
            <Form.Control className="mx-sm-3" placeholder="Add Comment" value={comment} onChange={handleChange} style={{width:"400px"}}/>
            <Form.Text id="passwordHelpBlock" muted  style={{marginRight:"16px"}}>
              {isEmpty(user) ? <> Please Sign In First </> : user.closed ?  <> Your Account Is Closed</> : !user.verified ? <> Your Account Is Unverified</> : null}
            </Form.Text>
          </Form.Group>
          <Button type="submit" disabled={!comment || !user.role || user.closed || !user.verified}>
            Submit
          </Button>
        </Form>
    </div>
    </>
  );
}
