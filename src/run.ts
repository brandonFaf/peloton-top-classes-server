//@ts-nocheck
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie/node-fetch';
global.fetch = fetchCookie(fetch);
import getData from './getData';

(async () => {
  await getData();
})();
