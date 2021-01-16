import { NowRequest, NowResponse } from '@vercel/node';
import getData from '../../src/getData';
export default async (request: NowRequest, response: NowResponse) => {
  const { user_id } = request.query;
  const { session_id } = request.cookies;
  const data = await getData(user_id, session_id).catch(err => {
    response.status(err.status);
    response.json({ error: err });
    return;
  });
  response.status(200).json({ data });
};
