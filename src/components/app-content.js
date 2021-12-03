import React from "react";
import PropTypes from "prop-types";

import Search from './search';
import UserInfo from './user-info';
import Actions from './actions';
import Header from './header';
import Repos from './repos';
import Loader from './loader'

const AppContent = ({ userinfo, getRepos, getStarred, repos, starred, isFetching, handleSearch }) => {

    return (
        <div className="container mt-5">
            <div id="main-content" className="row justify-content-center">
                <div className="col-xs-12 col-sm-12 col-lg-6">
                    <Header />
                    <Search isDisabled={isFetching} handleSearch={handleSearch} />
                    { isFetching && <Loader />}
                    { userinfo && <UserInfo userinfo={userinfo} /> }
                    { userinfo && <Actions getRepos={getRepos} getStarred={getStarred} /> }
                    { !!repos.length && <Repos 
                        className="repos" 
                        title="Repositórios" 
                        repos={repos} 
                    /> }
                    { !!starred.length && <Repos 
                        className="starred" 
                        title="Favoritos" 
                        repos={starred} 
                    /> }
                </div>
            </div>
        </div>
    )
}

AppContent.propTypes = {
    userinfo: PropTypes.object,
    repos: PropTypes.array.isRequired,
    starred: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired, 
    handleSearch: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    getStarred: PropTypes.func.isRequired
}

export default AppContent