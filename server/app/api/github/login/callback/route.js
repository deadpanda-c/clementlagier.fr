import {
  PrismaClient,
} from '@prisma/client';

import {
  NextResponse,
} from 'next/server';

import {
  GITHUB_TOKEN_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from '../../../../data/constants';

export const GET = async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  const token = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'next.js',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  }).then((res) => res.json());
  
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      access_token: token.access_token,
      token_type: token.token_type,
      scopes: token.scope,
    },
  });

  console.log(user);
  return NextResponse.json({ message: 'Hello, World!' });
};
