import { NextResponse } from 'next/server'

export const GET = async () => {
  const res = await fetch('https://api.github.com/users/deadpanda-c/repos')
  const repos = await res.json()

  const formatted = repos.map((repo) => ({
    name: repo.name,
    link: repo.html_url,
    description: repo.description || "No description provided."
  }))

  return NextResponse.json(formatted)
}
