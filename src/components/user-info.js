import React from "react";
import PropTypes from "prop-types";

const UserInfo = ({ userinfo }) => {
    return (
        <div className="user-info">
            <img 
              src={userinfo.avatar}
              alt={userinfo.username}
            />
            <h2 className="username">
              <a href={`https://github.com/${userinfo.login}`} target="_blank" rel="noreferrer">{userinfo.username}</a>
            </h2>
            <h3 className="nickname">
              {userinfo.login}
            </h3>

            <ul className="repos-info mt-2 mb-5">
              <li>Repositórios: {userinfo.repos}</li>
              <li>Seguidores: {userinfo.followers}</li>
              <li>Seguindo: {userinfo.following}</li>
            </ul>
        </div>
    )
}

UserInfo.propTypes = {
  userinfo: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    repos: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired
  })
}

export default UserInfo