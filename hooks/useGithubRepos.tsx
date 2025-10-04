'use client';

import { useEffect, useState } from "react";

const useGithubRepos = () => {
  const [repos, setRepos] = useState<{ name: string; link: string; description: string }[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/repos`);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };

    fetchRepos();
  }, []);

  return repos;
};

export default useGithubRepos;
