import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearch, isDisabled }) => {
    return (
        <div className="search mb-5 mt-3">
            <input 
              type="search" 
              className="form-control form-control-lg"
              placeholder="Digite o nome do usuário" 
              onKeyUp={handleSearch}
              disabled={isDisabled}
            />
        </div>
    )
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired
}

export default Search