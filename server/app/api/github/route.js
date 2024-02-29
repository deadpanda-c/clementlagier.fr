import {
  NextResponse,
} from 'next/server';

import {
  GITHUB_REPOS_URL,
  GITHUB_LAST_COMMIT_URL,
} from '../../data/constants';

const getLastsCommits = async (reposNames) => {
    var commits = {};
    reposNames.forEach(async (repoName) => {
      const lastCommit = await fetch(GITHUB_LAST_COMMIT_URL + repoName + '/commits?timestamp=' + Date.now())
      .then((response) => response.json());

      console.log(JSON.stringify(lastCommit, null, 2));

      commits[repoName] = {
        lastCommitDate: lastCommit[0].commit.author.date,
        lastCommitMessage: lastCommit[0].commit.message,
      };
    });
    return commits;
}

export const GET = async () => {
  const repos = await fetch(GITHUB_REPOS_URL + '&timestamp=' + Date.now())
  .then((response) => response.json())
  const reposNames = repos.items.map((repo) => repo.name);
  const lastCommit = await getLastsCommits(reposNames);

  console.log(JSON.stringify(lastCommit, null, 2));

  return NextResponse.json({hello: 'world'});
};
