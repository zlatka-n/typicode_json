import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
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

  if (!results || !users) return "Loading";

  const displayResults = () => {
    ///RESULTS FOR ONE PAGE
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

  const pagination = () => {
    let previousPage;
    let nextPage;

    const getNewPage = (number) => {
      setCurrentPage(number);
    };

    if (currentPage > 1) {
      previousPage = currentPage - 1;
    } else if (currentPage === 1) {
      previousPage = 1;
    }

    if (currentPage > 0 && currentPage < 4) {
      nextPage = currentPage + 1;
    } else {
      nextPage = 4;
      console.log(nextPage);
    }

    const numPages = results.length / POSTS_PER_PAGE;
    console.log(`numPages ${numPages}`);

    return (
      <ul className="pagination">
        <Link to={`/${previousPage}`}>
          <li onClick={() => getNewPage(previousPage)}>Previous</li>
        </Link>
        <Link to={`/1`}>
          <li onClick={() => getNewPage(1)}>1</li>
        </Link>
        <Link to={`/2`}>
          <li onClick={() => getNewPage(2)}>2</li>
        </Link>
        <Link to={`/3`}>
          <li onClick={() => getNewPage(3)}>3</li>
        </Link>
        <Link to={`/4`}>
          <li onClick={() => getNewPage(4)}>4</li>
        </Link>
        <Link to={`/${nextPage}`}>
          <li onClick={() => getNewPage(nextPage)}>Next</li>
        </Link>
      </ul>
    );
  };
  return (
    <div className="home-component">
      <div className="home-wrapper">{displayResults()}</div>
      <div className="pagination">{pagination()}</div>
    </div>
  );
}

export default Home;
