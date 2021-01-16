import fetch from 'node-fetch';
export default async (username: string, password: string) => {
  const res = await fetch('https://api.onepeloton.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username_or_email: username,
      password: password
    })
  });
  const { user_id, session_id } = await res.json();
  return { user_id, session_id };
};
