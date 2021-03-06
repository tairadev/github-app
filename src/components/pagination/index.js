import React from 'react';
import PropTypes from 'prop-types'
import pagination from '../../utils/pagination'
import Page from './page'
import './pagination.scss'

const Pagination = ({ total, activePage, pageLink, onClick }) => {
    return (
        <ul className='pagination'>
            {pagination({ total, activePage }).map((page, index) => (
                <li key={index} className={activePage === page ? 'active' : null}>
                    <Page page={page} pageLink={pageLink.replace('%page%', page)} onClick={onClick} />
                </li>
            ))}
        </ul>
    )
}

Pagination.defaultProps = {
    pageLink: '',
    activePage: 1
}

Pagination.propTypes = {
    total: PropTypes.number,
    activePage: PropTypes.number,
    pageLink: PropTypes.string,
    onClick: PropTypes.func
}

export default Pagination