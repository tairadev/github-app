import { Component } from 'react';
import { Repo } from '../../interfaces/Repo';
import '../../assets/scss/language-colors.scss';
import './style.scss';

import loading from '../../assets/images/loading.svg';

interface ReposProps {
  className: string;
  title: string;
  repos: Repo[];
  isRequesting: boolean;
}

class Repos extends Component<ReposProps> {
  constructor(props: ReposProps) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.isRequesting ? (
          <img src={loading} alt="Carregando..." className="loading-icon" />
        ) : (
          <>
            <h2>{this.props.title}</h2>
            {this.props.repos.length > 0 ? (
              <ul>
                {this.props.repos?.map((repo, i) => (
                  <li key={i}>
                    <a href={repo.html_url} target="_blank">
                      {repo.name}
                    </a>
                    <h3>
                      <div className={`circle ${repo.language}`}></div>
                      {repo.language || '-'}
                    </h3>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum repositório foi encontrado</p>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Repos;
