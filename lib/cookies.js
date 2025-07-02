import { serialize } from 'cookie';

const MAX_AGE = 7 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
  if (!serialize) {
    console.error('cookies.js: serialize function is undefined');
    throw new Error('Cookie serialization unavailable');
  }
  const setCookie = serialize('token', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  res.setHeader('Set-Cookie', setCookie);
};

export const removeTokenCookie = (res) => {
  if (!serialize) {
    console.error('cookies.js: serialize function is undefined');
    throw new Error('Cookie serialization unavailable');
  }
  const val = serialize('token', '', {
    maxAge: -1,
    path: '/',
  });
  res.setHeader('Set-Cookie', val);
};