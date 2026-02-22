import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: 400 });
  }

  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set('token', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
