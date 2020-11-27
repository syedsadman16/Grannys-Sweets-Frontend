import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";
import { isEmpty } from "lodash";

export default function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [errorMessage, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const dispatch = useDispatch();

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
        await dispatch(getUser(user.id));
      } catch (error) {}
    } else {
      setMessage("Only Customer can create discussions.");
    }
  };

  const showList = () => {
    return discussions.map((item, index) => (
      <Link to={`/discussions/${item.id}`} key={index}>
        {" "}
        <div>
          <p>Topic: {item.topic}</p>
          <p>Creator: {item.creator.username}</p>
        </div>
      </Link>
    ));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={createTopic}>
        <input value={topic} onChange={handleChange} />
        <button disabled={!topic || !user.role || user.closed} type="submit">
          Create a Discussion
        </button>
      </form>
      {user.closed && <strong>Account Closed</strong>}
      {isEmpty(user) && <strong>Sign in</strong>}
      <p>{errorMessage}</p>
      {!discussions.length ? <div>No Discussions</div> : showList()}
    </div>
  );
}
