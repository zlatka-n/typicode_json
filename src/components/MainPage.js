import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import "../css/MainPage.css";
import { Link } from "react-router-dom";

function MainPage() {
  const [debouncedUser, setDebouncedUser] = useState("");
  const [results, setResults] = useState([]);
  const [sortUsers, setSortUsers] = useState("az");

  const baseURL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(`${baseURL}/`).then((response) => {
      const data = response.data;
      //   console.log(data);
      setResults(data);
    });
  }, [debouncedUser]);

  if (!results) return null;

  /////////////RENDER USERS/////////////
  const renderUsers = () => {
    if (results.length === 0) {
      return (
        <div className="noResults">
          <div>
            <BsSearch></BsSearch>
          </div>
          <div id="noResultsText">
            No results found for <span id="userNotFound">{debouncedUser}</span>.
          </div>
        </div>
      );
    }

    return results.map((user) => {
      return (
        <section key={user.id} className="renderUser">
          <Link to={`/user/${user.id}`}>
            <FaUserCircle id="userIcon" className="linkToUser"></FaUserCircle>
          </Link>
          <span className="user-container">
            <Link to={`/user/${user.id}`}>
              <div className="linkToUser">{user.name}</div>
            </Link>
            <div className="user-textInfo">Lives in {user.address.city}</div>
            <div className="user-textInfo">Works at {user.company.name}</div>
          </span>
        </section>
      );
    });
  };

  //look for a user in the search bar
  const onFormChange = (event) => {
    setDebouncedUser(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const filterUser = results.filter((user) => {
      // case insensitive search
      let userUpperCase = user.name.toUpperCase();
      return userUpperCase.includes(debouncedUser.toUpperCase());
    });

    setResults(filterUser);
  };

  //user selects alphabetical sorting
  const getSortSelection = () => {
    if (results.length !== 0) {
      return (
        <div className="sort-box">
          <span className="sortBy-title">Sort by: </span>
          <select onChange={onSelectClick} className="select">
            <option value="az">Names (A-Z)</option>
            <option value="za">Names (Z-A)</option>
          </select>
        </div>
      );
    }
  };

  const onSelectClick = (event) => {
    const sortSelection = event.target.value;
    setSortUsers(sortSelection);
  };

  const getSortedUserArray = () => {
    if (sortUsers === "za") {
      results.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (sortUsers === "az") {
      results.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    }
  };

  return (
    <div className="mainPage-component">
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
      <div
        className={
          results.length === 0 ? "noResults-wrapper" : "renderUsers-wrapper"
        }
      >
        {getSortSelection()}
        {renderUsers()}
        {getSortedUserArray()}
      </div>
      <br></br>
    </div>
  );
}

export default MainPage;
