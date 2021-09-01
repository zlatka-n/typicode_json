import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function Home() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  ////////GET POSTS/////////
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const data = response.data;
      setResults(data);
      // console.log(data);
    });
  }, []);

  //////GET USER INFO////////
  const usersURL = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    axios.get(usersURL).then((response) => {
      const USERS_DATA = response.data;
      setUsers(USERS_DATA);
    });
  }, []);

  const displayResults = () => {
    const getPosts = results.map((post) => {
      return users.map((user) => {
        //if userId matches id, display user name before a post
        if (user.id === post.userId) {
          ///show posts in random order/////
          results.sort((a, b) => {
            var textA = a.body.toUpperCase();
            var textB = b.body.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });

          return (
            <div className="post-wrapper" key={post.id}>
              <FaUserCircle id="user-avatar"></FaUserCircle>
              <div className="post-body">
                <div id="userName">{user.name}</div>
                <div id="userPost">{post.body}</div>
              </div>
            </div>
          );
        }
        return null;
      });
    });
    return getPosts;
  };

  return (
    <div className="home-component">
      <div className="home-wrapper">{displayResults()}</div>
    </div>
  );
}

export default Home;
