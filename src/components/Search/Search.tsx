import { Component } from 'react';
import './style.scss';

interface SearchProps {
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

class Search extends Component<SearchProps> {
  render() {
    const { searchText, onSearchChange, handleKeyDown } = this.props;
    return (
      <div className="search">
        <input
          type="search"
          placeholder="Digite o nome do usuário do GitHub"
          value={searchText}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }
}

export default Search;
