import React from "react";
import PropTypes from "prop-types";

const Actions = ({ getRepos, getStarred }) => {
    return (
        <div className="actions row">
            <div className="col-6">
              <button 
                className="btn btn-dark"
                onClick={getRepos}
              >Ver repositórios</button>
            </div>
            <div className="col-6">
              <button 
                className="btn btn-dark"
                onClick={getStarred}
              >Ver favoritos</button>
            </div>
        </div>
    )
}

Actions.propTypes = {
  getRepos: PropTypes.func.isRequired,
  getStarred: PropTypes.func.isRequired
}

export default Actions