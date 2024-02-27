

export const getRepositories = async (username) => {
  console.log("Fetching repositories for", username);
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => data.map(repo => ({
      name: repo.name,
      description: repo.description,
    })));
}
