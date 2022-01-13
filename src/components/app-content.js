import React from 'react'
import PropTypes from 'prop-types'

import Search from './search'
import UserInfo from './user-info'
import Actions from './actions'
import Header from './header'
import Repos from './repos'
import Loader from './loader'

const AppContent = ({ userinfo, getRepos, getStarred, repos, starred, isFetching, handleSearch, handlePagination }) => {
  return (
    <div className='container mt-5'>
      <div id='main-content' className='row justify-content-center'>
        <div className='col-xs-12 col-sm-12 col-lg-6'>
          <Header />
          <Search isDisabled={isFetching} handleSearch={handleSearch} />
          {isFetching && <Loader />}
          {userinfo && <UserInfo userinfo={userinfo} />}
          {userinfo && <Actions getRepos={getRepos} getStarred={getStarred} />}
          {!!repos.repos.length && <Repos
            className='repos'
            title='Repositórios'
            repos={repos}
            handlePagination={(clicked) => handlePagination('repos', clicked)}
          />}
          {!!starred.repos.length && <Repos
            className='starred'
            title='Favoritos'
            repos={starred}
            handlePagination={(clicked) => handlePagination('starred', clicked)}
          />}
        </div>
      </div>
    </div>
  )
}

const reposPropTypesShape = {
  repos: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
}

AppContent.propTypes = {
  userinfo: PropTypes.object,
  repos: PropTypes.shape(reposPropTypesShape).isRequired,
  starred: PropTypes.shape(reposPropTypesShape).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired,
  getStarred: PropTypes.func.isRequired,
  handlePagination: PropTypes.func.isRequired
}

export default AppContent
