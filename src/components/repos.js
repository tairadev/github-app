import React from 'react'
import PropTypes from 'prop-types'
import Pagination from './pagination/index'

const Repos = ({ className, title, repos, handlePagination }) => {
  return (
    <div className={className + ' repos mt-5'}>
      <h3 className='mb-3'>{title}</h3>
      <ul>
        {repos.repos.map((repo, index) => (
          <li key={index}>
            <a href={repo.link} target='_blank' rel='noreferrer'>
              {repo.name}
            </a>
            <p className='language'>
              <span className={!repo.language ? 'undefined' : repo.language} />
              {!repo.language ? 'Indefinida' : repo.language}
            </p>
          </li>
        ))}
      </ul>
      <Pagination total={repos.pagination.total} activePage={repos.pagination.activePage} onClick={handlePagination} />
    </div>
  )
}

Repos.defaultProps = {
  className: ''
}

Repos.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  repos: PropTypes.shape({
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      language: PropTypes.string
    })),
    pagination: PropTypes.shape({
      total: PropTypes.number,
      activePage: PropTypes.number
    }).isRequired
  }),
  handlePagination: PropTypes.func.isRequired
}

export default Repos
