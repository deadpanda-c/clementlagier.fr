import {
  React,
  useEffect,
  useState,
} from 'react';

import {
  getRepositories,
} from './api/github';

import {
  GITHUB_USERNAME
} from './utils';

export default function Body() {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = async (username) => {
      fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => data.map(repo => ({
        name: repo.name,
        description: repo.description,
      })))
      .then(data => {
        console.log(data);
        setRepositories(data);
        setIsLoading(false);
      });
    };
    data(GITHUB_USERNAME);
  }, []);



  console.log('Rendering...');

  return !repositories.length ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
        </ul>
      </div>
  );
}
