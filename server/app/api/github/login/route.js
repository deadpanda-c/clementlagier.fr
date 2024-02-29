import {
  NextResponse,
} from 'next/server';

import {
  GITHUB_CLIENT_ID,
  GITHUB_AUTH_URL,
  GITHUB_REDIRECT_URI,
} from '../../../data/constants';

export const GET = async () => {
  const scopes = 'user repo';
  var params = "?";

  params += "client_id=" + GITHUB_CLIENT_ID;
  params += "&scope=" + scopes;

  return NextResponse.redirect(GITHUB_AUTH_URL + params);
};
