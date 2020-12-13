import express from 'express';
import getData from './getData';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie/node-fetch';
import authenticate from './authenticate';
import cors from 'cors';
import logger from './utils/logger';
//@ts-ignore
global.fetch = fetchCookie(fetch);

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('working');
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    res.json({ error: 'username or password missing' });
    return;
  }
  const { user_id } = await authenticate(username, password);
  console.log('user_id:', user_id);
  logger.log('logged in');
  res.json({ user_id });
});

app.get('/api/data/:user_id', async (req, res) => {
  const data = await getData(req.params.user_id).catch(err => {
    res.status(500);
    res.json({ error: err });
    return;
  });
  res.json(data);
});
app.get('/api/data/:user_id/ride/:ride_id', async (req, res) => {
  const data = await getData(req.params.user_id).catch(err => {
    res.status(500);
    res.json({ error: err });
    return;
  });
  if (data) {
    const rides = data.filter(s => s.rideId == req.params.ride_id);
    res.json(rides);
    return;
  } else {
    res.status(400);
    res.json({ error: 'no rides found' });
  }
});
authenticate(process.env.username, process.env.password);
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
