import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "axios";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const id = parseInt(location.pathname.split("/").splice(-1));
  const [errorMessage, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [discussion, setDiscussion] = useState({});
  const role = useSelector(({ user }) => user.role);

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
    if (["CUSTOMER", "VIP"].includes(role)) {
      try {
        let { data } = await api.post("/comment", {
          message: comment,
          discussion: { id },
        });
        setComments((prev) => [...prev, data]);
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
        <button disabled={!comment} type="submit">
          Comment
        </button>
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
