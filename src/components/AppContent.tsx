import { Component } from 'react';
import Search from './Search/Search';
import UserInfos from './UserInfos/UserInfos';
import Actions from './Actions/Actions';
import Repos from './Repos/Repos';
import { UserInfo } from '../interfaces/UserInfo';
import { Repo } from '../interfaces/Repo';

import logo from '../assets/images/logo.svg';

interface reposObj {
  repos: Repo[];
  starred: Repo[];
}

interface AppContentProps {
  userInfo: UserInfo | null;
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  currentRepos: string;
  changeCurrentRepo: (type: string) => void;
  repos: reposObj;
  notFound: boolean;
  isRequestingUser: boolean;
  isRequestingRepos: boolean;
}

class AppContent extends Component<AppContentProps> {
  constructor(props: AppContentProps) {
    super(props);
  }

  render() {
    return (
      <div className="app-content">
        <img src={logo} alt="GitHub" className="github-logo" />
        <Search
          searchText={this.props.searchText}
          onSearchChange={this.props.onSearchChange}
          handleKeyDown={this.props.handleKeyDown}
        />
        {this.props.notFound && <h2>Usuário não encontrado!</h2>}
        {this.props.isRequestingUser && <p>Carregando...</p>}
        {!!this.props.userInfo && (
          <>
            <UserInfos userInfo={this.props.userInfo} />
            <Actions
              currentRepos={this.props.currentRepos}
              changeCurrentRepo={this.props.changeCurrentRepo}
            />
            {this.props.currentRepos === 'repos' && (
              <Repos
                className="repos"
                title="Repositórios"
                repos={this.props.repos.repos}
                isRequesting={this.props.isRequestingRepos}
              />
            )}
            {this.props.currentRepos === 'starred' && (
              <Repos
                className="starred"
                title="Favoritos"
                repos={this.props.repos.starred}
                isRequesting={this.props.isRequestingRepos}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default AppContent;
