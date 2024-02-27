import { NextResponse } from 'next/server';

import {
  ABOUT_URL,
} from './data/constants';

export const GET = () => {
  return NextResponse.redirect(ABOUT_URL, { status: 301 });
}
