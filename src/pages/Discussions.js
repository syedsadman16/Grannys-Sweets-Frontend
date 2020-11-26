import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "axios";
import { useSelector } from "react-redux";

export default function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [errorMessage, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const role = useSelector(({ user }) => user.role);

  const fetchData = async () => {
    try {
      let { data } = await api.get("/discussion");
      setDiscussions(data);
      console.log(data);
    } catch (e) {}
  };

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const createTopic = async (event) => {
    event.preventDefault();
    if (["CUSTOMER", "VIP"].includes(role)) {
      try {
        let { data } = await api.post("/discussion", { topic });
        setDiscussions((prev) => [...prev, data]);
        console.log(data);
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
        <button disabled={!topic} type="submit">
          Create a Discussion
        </button>
      </form>

      <p>{errorMessage}</p>
      {!discussions.length ? <div>No Discussions</div> : showList()}
    </div>
  );
}
