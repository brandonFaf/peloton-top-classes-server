import { NowRequest, NowResponse } from '@vercel/node';
import auth from '../src/authenticate';
export default async (request: NowRequest, response: NowResponse) => {
  if (request.method == 'POST') {
    const { username, password } = request.body;
    const { user_id, session_id } = await auth(username, password);
    response.setHeader('Set-Cookie', [`session_id=${session_id}`]);
    response.status(200).json({ user_id, session_id });
  } else {
    response.status(200).send('ok');
  }
};
