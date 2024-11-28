import { Component } from 'react';
import './style.scss';

interface ActionsProps {
  changeCurrentRepo: (type: string) => void;
  currentRepos: string;
}

class Actions extends Component<ActionsProps> {
  constructor(props: ActionsProps) {
    super(props);
  }

  render() {
    return (
      <div className="actions">
        <button
          onClick={() => this.props.changeCurrentRepo('repos')}
          className={this.props.currentRepos === 'repos' ? 'active' : ''}
        >
          Ver repositórios
        </button>
        <button
          onClick={() => this.props.changeCurrentRepo('starred')}
          className={this.props.currentRepos === 'starred' ? 'active' : ''}
        >
          Ver favoritos
        </button>
      </div>
    );
  }
}

export default Actions;
