import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import "../css/MainPage.css";

function MainPage() {
  //   const [users, setUsers] = useState("");
  const [debouncedUser, setDebouncedUser] = useState("");
  const [results, setResults] = useState([]);

  const baseURL = "https://jsonplaceholder.typicode.com/users";

  const onFormChange = (event) => {
    setDebouncedUser(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const filterUser = results.filter((user) =>
      user.name.includes(debouncedUser)
    );
    setResults(filterUser);
  };

  useEffect(() => {
    axios.get(`${baseURL}/`).then((response) => {
      const data = response.data;
      //   console.log(data);
      setResults(data);
    });
  }, [debouncedUser]);

  if (!results) return null;

  const renderUsers = () => {
    return results.map((user) => {
      return (
        <div key={user.id} className="renderUser">
          <span>
            <FaUserCircle id="userIcon"></FaUserCircle>
          </span>
          <span className="user-container">
            <div>{user.name}</div>
            <div className="user-textInfo">Lives in {user.address.city}</div>
            <div className="user-textInfo">Works at {user.company.name}</div>
          </span>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="searchBar">
        <form onSubmit={onFormSubmit} className="searchBar-wrapper">
          <div className="barAndBtn">
            <input
              onChange={onFormChange}
              value={debouncedUser}
              id="input"
              placeholder="Search user.."
            ></input>
            <BsSearch onClick={onFormSubmit}></BsSearch>
          </div>
        </form>
      </div>
      <div className="renderUsers-wrapper">{renderUsers()}</div>
      <br></br>
    </div>
  );
}

export default MainPage;
