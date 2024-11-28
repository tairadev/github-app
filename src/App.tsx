import { Component } from 'react';
import './App.scss';
import { UserInfo } from './interfaces/UserInfo';
import AppContent from './components/AppContent';
import { Repo } from './interfaces/Repo';

interface reposObj {
  repos: Repo[];
  starred: Repo[];
}

interface AppState {
  userInfo: UserInfo | null;
  searchText: string;
  repos: reposObj;
  currentRepos: string;
  notFound: boolean;
  isRequestingUser: boolean;
  isRequestingRepos: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      userInfo: null,
      searchText: '',
      repos: {
        repos: [],
        starred: [],
      },
      currentRepos: 'repos',
      notFound: false,
      isRequestingUser: false,
      isRequestingRepos: false,
    };
  }

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.searchUser();
    }
  };

  changeCurrentRepo = (type: string) => {
    this.setState({ currentRepos: type });
    this.getRepos(type, this.state.userInfo?.login);
  };

  async getRepos(type: string, user: string = '') {
    this.setState({ isRequestingRepos: true });

    try {
      const res = await fetch(`https://api.github.com/users/${user}/${type}`);

      if (!res.ok) {
        throw new Error(`Erro ao buscar repositórios: ${res.status}`);
      }

      const repos = await res.json();

      this.setState({
        repos: {
          ...this.state.repos,
          [type]: repos,
        },
      });
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
    }

    this.setState({ isRequestingRepos: false });
  }

  async searchUser() {
    this.setState({ isRequestingUser: true });
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.state.searchText}`
      );

      if (!res.ok) {
        throw new Error(
          `Erro ao buscar usuário: ${res.status} - ${res.statusText}`
        );
      }

      const user = await res.json();

      this.setState({
        repos: {
          repos: [],
          starred: [],
        },
        currentRepos: 'repos',
      });

      this.setState({
        userInfo: {
          login: user.login,
          name: user.name,
          avatar_url: user.avatar_url,
          link: user.html_url,
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        },
        notFound: false,
      });

      this.getRepos(this.state.currentRepos, this.state.searchText);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      this.setState({
        userInfo: null,
        notFound: true,
      });
    }
    this.setState({ isRequestingUser: false });
  }

  render() {
    return (
      <>
        <div className="app">
          <AppContent
            searchText={this.state.searchText}
            handleKeyDown={this.handleKeyDown}
            onSearchChange={this.handleSearchChange}
            userInfo={this.state.userInfo}
            currentRepos={this.state.currentRepos}
            changeCurrentRepo={this.changeCurrentRepo}
            repos={this.state.repos}
            notFound={this.state.notFound}
            isRequestingUser={this.state.isRequestingUser}
            isRequestingRepos={this.state.isRequestingRepos}
          />
        </div>
      </>
    );
  }
}

export default App;
