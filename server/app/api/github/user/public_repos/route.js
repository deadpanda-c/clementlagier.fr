import {
  NextResponse,
} from 'next/server';

import {
  GITHUB_REPOS_URL,
} from '../../../../data/constants';

import {
  PrismaClient,
} from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  })
    .catch((error) => {
      console.error(error);
      return {
        error: 'An error occurred while fetching the user.',
        status: 500,
      };
    });

  if (!user) {
    return NextResponse.json({
      error: 'User not found.',
      status: 404,
    });
  }
  const repos = await fetch(`${GITHUB_REPOS_URL}&timestamp=${new Date().getTime()}`)
  .then((response) => response.json())

  if (!repos) {
    return NextResponse.json({
      error: 'Repos not found.',
      status: 404,
    });
  }

  const reposName = repos.items.map((repo) => repo.name);
  console.log('reposName', reposName);
  return NextResponse.json({
    repos
  });
};
