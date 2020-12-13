declare module 'fetch-cookie/node-fetch';
declare var fetch: (
  url: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response>;
declare namespace NodeJS {
  interface Global {
    fetch: unknown;
  }
  interface ProcessEnv {
    PORT: number;
    username: string;
    password: string;
  }
}
