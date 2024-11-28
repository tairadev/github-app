import React from 'react';
import { UserInfo } from '../../interfaces/UserInfo';
import './style.scss';

interface UserInfosProps {
  userInfo: UserInfo | null;
}

class UserInfos extends React.Component<UserInfosProps> {
  render() {
    const { userInfo } = this.props;
    return (
      <div className="user-info">
        <img
          src={userInfo?.avatar_url || 'https://via.placeholder.com/150'}
          alt="Guilherme Taira"
        />
        <h1 className="username">
          <a href={userInfo?.link} target="_blank">
            {userInfo?.name || 'Nome não disponível'}
          </a>
        </h1>

        <ul className="repos-info">
          <li>Repositórios: {userInfo?.repos}</li>
          <li>Seguidores: {userInfo?.followers}</li>
          <li>Seguindo: {userInfo?.following}</li>
        </ul>
      </div>
    );
  }
}

export default UserInfos;
