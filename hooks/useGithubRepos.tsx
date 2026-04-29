"use client";

import { useEffect, useState } from "react";

export interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  author: string;
  topics: string[];
  updatedAt: string;
}

interface UseGithubReposOptions {
  username?: string;
  pinnedOnly?: boolean;
  limit?: number;
}

interface UseGithubReposResult {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useGithubRepos = (
  options: UseGithubReposOptions = {},
): UseGithubReposResult => {
  const { username = "deadpanda", pinnedOnly = false, limit = 6 } = options;

  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`GitHub user "${username}" not found.`);
          }
          if (response.status === 403) {
            throw new Error("GitHub API rate limit reached. Try again later.");
          }
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          const mapped: GithubRepo[] = data
            .filter((repo: any) => !repo.fork)
            .slice(0, limit)
            .map((repo: any) => ({
              name: repo.name,
              description: repo.description,
              language: repo.language,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              url: repo.html_url,
              author: repo.owner.login,
              topics: repo.topics ?? [],
              updatedAt: repo.updated_at,
            }));

          setRepos(mapped);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message ?? "Failed to fetch repositories.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username, limit, fetchTrigger]);

  const refetch = () => setFetchTrigger((n) => n + 1);

  return { repos, loading, error, refetch };
};

export default useGithubRepos;
