import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
// import { FcPrevious } from "react-icons/fc";
// import { FcNext } from "react-icons/fc";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 25;

function Home() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  ////////GET POSTS/////////
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const data = response.data;
      setResults(data);
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

  if (!results || !users) return null;

  const getNewPage = (number) => {
    setCurrentPage(number + 1);
  };

  ////////////////////POSTS RESULTS//////////////////
  const displayResults = () => {
    /////RESULTS FOR ONE PAGE////
    const slicedResults = results.slice(
      POSTS_PER_PAGE * (currentPage - 1),
      currentPage * POSTS_PER_PAGE
    );

    const getPosts = slicedResults.map((post) => {
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
            <section className="post-wrapper" key={post.id}>
              <Link to={`/user/${user.id}`}>
                <FaUserCircle
                  id="user-avatar"
                  className="linkToUser"
                ></FaUserCircle>
              </Link>
              <div className="post-body">
                <Link to={`/user/${user.id}`}>
                  <div id="userName" className="linkToUser">
                    {user.name}
                  </div>
                </Link>
                <div className="userPost">{post.body}</div>
              </div>
            </section>
          );
        }
        return null;
      });
    });
    return getPosts;
  };

  /////////////////PAGINATION/////////////////////////
  const pagination = () => {
    const paginationBox = () => {
      return (
        <>
          {Array.from({ length: 4 }, (_, i) => (
            <Link to={`/${i + 1}`} key={i}>
              <li onClick={() => getNewPage(i)} className="list">
                {i + 1}
              </li>
            </Link>
          ))}
        </>
      );
    };
    return <>{paginationBox()}</>;
  };

  return (
    <div className="home-component">
      <div className="home-wrapper">
        {displayResults()}
        <div className="pagination">{pagination()}</div>
      </div>
    </div>
  );
}

export default Home;
