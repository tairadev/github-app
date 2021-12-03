import React from "react";
import PropTypes from 'prop-types';

const Repos = ({ className, title, repos }) => {
    return (
        <div className={ className + " repos mt-5" }>
            <h3 className="mb-3">{title}</h3>
            <ul>
                { repos.map((repo, index) => (
                    <li key={index}>
                        <a href={repo.link} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>
                        <p className="language">
                            <span className={!repo.language ? "undefined" : repo.language} />
                            {!repo.language ? "Indefinida" : repo.language}
                        </p>
                    </li>
                )) }
            </ul>
        </div>
    )
}

Repos.defaultProps = {
    className: ""
}

Repos.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    repos: PropTypes.array
}

export default Repos