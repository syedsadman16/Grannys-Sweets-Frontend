import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "axios";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";

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
      <div key={index}>
        <p>
          {item.commenter.username}: {item.message}
        </p>
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
    <div>
      <form onSubmit={createComment}>
        <input value={comment} onChange={handleChange} />
        <button disabled={!comment || !user.role || user.closed} type="submit">
          Comment
        </button>
        {user.closed && <strong>Account Closed</strong>}
        {isEmpty(user) && <strong>Sign in</strong>}
      </form>
      <p>{errorMessage}</p>
      <div>
        <p>Topic: {isEmpty(discussion) ? "N/A" : discussion.topic}</p>
        <p>
          Creator: {isEmpty(discussion) ? "N/A" : discussion.creator.username}
        </p>
      </div>
      {!comments.length ? <div>No Comments</div> : showList()}
    </div>
  );
}
