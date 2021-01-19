import { NowRequest, NowResponse } from '@vercel/node';
import cookie from 'cookie';
import auth from '../src/authenticate';
import allowCors from '../src/utils/allowCors';
const login = async (request: NowRequest, response: NowResponse) => {
  if (request.method == 'POST') {
    const { username, password } = request.body;
    console.log('password:', password);
    console.log('username:', username);
    const { user_id, session_id } = await auth(username, password);
    var setCookie = cookie.serialize('session_id', session_id, {
      sameSite: 'lax'
    });
    console.log('session_id:', session_id);
    response.setHeader('Set-Cookie', setCookie);
    response.status(200).json({ user_id, session_id });
  } else if (request.method == 'OPTIONS') {
    response.status(200).send('ok');
  } else {
    response.status(405).send('method not allowed');
  }
};
export default allowCors(login);
