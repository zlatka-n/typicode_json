import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/UserProfile.css";
import yvesKlein from "../image/yvesKlein.jpeg";
import { AiOutlineUser } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

function UserProfile(props) {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const historyId = props.match.params.id;

  //////GET USER DATA//////
  const userURL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(userURL).then((response) => {
      const userData = response.data;
      setUser(userData);
    });
  }, []);

  /////GET USER'S POSTS////////
  const postURL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    axios.get(postURL).then((response) => {
      const postData = response.data;
      setPosts(postData);
    });
  }, []);

  if (user.length === 0 || posts.length === 0) return "Loading";

  const renderUser = user.map((el) => {
    if (Number(historyId) === el.id) {
      //console.log(el);
      return (
        <div className="user-profile" key={el.id}>
          <div className="imgAvatar-wrapper">
            <img
              className="imgProfile"
              alt="user profile background"
              src={yvesKlein}
            ></img>
            <AiOutlineUser id="userProfile-avatar"></AiOutlineUser>
          </div>
          <div className="user-text">
            <div className="user-fullName">{el.name}</div>
            <div className="userDetail">@{el.username}</div>
            <div className="userDetail">Lives in {el.address.city}</div>
            <div className="userDetail">Works at {el.company.name}</div>
          </div>
          <div className="borderBottom"></div>
        </div>
      );
    }
    return null;
  });

  const renderUserPosts = posts.map((post) => {
    if (Number(historyId) === post.userId) {
      const findUser = user.find((u) => u.id === post.userId);

      return (
        <section key={post.id} className="users-post">
          <FaUserCircle id="userPic"></FaUserCircle>
          <div className="post-body">
            <div className="user-fullName">
              {findUser ? findUser.name : "Loading"}
            </div>
            <div className="userPost">{post.body}</div>
          </div>
        </section>
      );
    }
    return null;
  });

  return (
    <div className="user-component">
      <div className="profile-wrapper">
        {renderUser}
        {renderUserPosts}
      </div>
    </div>
  );
}

export default UserProfile;
