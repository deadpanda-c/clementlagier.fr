import { NextResponse } from 'next/server'

export const GET = () => {
  console.log("Hello World");
  return NextResponse.json({
    hello: "world",
  });
}
