import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

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
      // console.log(userData);
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

  const renderUser = user.map((el) => {
    if (Number(historyId) === el.id) {
      //console.log(el);
      return (
        <div key={el.id}>
          <div className="user-profile">{el.name}</div>
          <div>{el.username}</div>
          <div>{el.email}</div>
          <div>Lives in {el.address.city}</div>
          <div>Works at {el.company.name}</div>
        </div>
      );
    }
    return null;
  });

  const renderUserPosts = posts.map((post) => {
    if (Number(historyId) === post.userId) {
      const findUser = _.find(user, { id: post.userId });
      const userName = findUser.name;
      return (
        <div key={post.id}>
          <div>{userName}</div>
          <div>{post.body}</div>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="user-component">
      {renderUser}
      {renderUserPosts}
    </div>
  );
}

export default UserProfile;
