import { NowRequest, NowResponse } from '@vercel/node';
import getData from '../../src/getData';
import allowCors from '../../src/utils/allowCors';
const fetchData = async (request: NowRequest, response: NowResponse) => {
  const { user_id } = request.query;
  const { session_id } = request.cookies;
  const data = await getData(user_id, session_id).catch(err => {
    console.log(err);
  });

  if (!data) {
    response.status(401).json({ error: 'error' });
  } else {
    response.status(200).json(data);
  }
};
export default allowCors(fetchData);
