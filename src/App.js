import React, { Component } from 'react'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

const initialReposState = {
  repos: [],
  pagination: {
    total: 1,
    activePage: 1
  }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      userinfo: null,
      repos: initialReposState,
      starred: initialReposState,
      isFetching: false
    }

    this.perPage = 3
  }

  getGitHubApiUrl (username, type, page = 1) {
    const internalType = type ? `/${type}` : ''
    const internalUser = username ? `/${username}` : ''
    return `https://api.github.com/users${internalUser}${internalType}?per_page=${this.perPage}&page=${page}`
  }

  handleSearch (e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13

    if (keyCode === ENTER) {
      this.setState({ isFetching: true })
      ajax().get(this.getGitHubApiUrl(value))
        .then((result) => {
          this.setState({
            userinfo: {
              username: result.name,
              login: result.login,
              repos: result.public_repos,
              followers: result.followers,
              following: result.following,
              avatar: result.avatar_url
            },
            repos: initialReposState,
            starred: initialReposState
          })
        })
        .always(() => this.setState({ isFetching: false }))
    }
  }

  getRepos (type, page) {
    return () => {
      const username = this.state.userinfo.login
      const altType = type === 'repos' ? 'starred' : 'repos'
      this.setState({
        [altType]: initialReposState
      })
      ajax().get(this.getGitHubApiUrl(username, type, page))
        .then((result, xhr) => {
          const linkHeader = xhr.getResponseHeader('Link') || ''
          const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/)

          this.setState({
            [type]:  {
              repos: result.map((repo) => {
                  return {
                    name: repo.name,
                    link: repo.html_url,
                    language: repo.language
                  }
                }),
              pagination: {
                total: totalPagesMatch ? +totalPagesMatch[1] : this.state[type].pagination.total,
                activePage: page
              }
            }
          })
        })
    }
  }

  render () {
    return (
      <AppContent
        userinfo={this.state.userinfo}
        repos={this.state.repos}
        starred={this.state.starred}
        isFetching={this.state.isFetching}
        handleSearch={(e) => this.handleSearch(e)}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
        handlePagination={(type, page) => this.getRepos(type, page)()}
      />
    )
  }
}

export default App
