//@ts-nocheck
import authenticate from './authenticate';
import getWorkoutList from './getWorkoutList';
import getDetails from './getDetails';
import logger from './utils/logger';

export default async user_id => {
  // logger.info('logging in');
  // const { user_id, session_id } = await authenticate().catch(err => {
  //   logger.error('error authenticating', err);
  //   throw err;
  // });
  // logger.info('logged in');
  logger.info('getting workouts');
  const workouts = await getWorkoutList(user_id).catch(err => {
    logger.error('error getting workouts', err);
    throw err;
  });
  logger.info('fetched workouts');
  // logger.info('getting details');
  // const workoutData = await getDetails(workouts).catch(err => {
  //   logger.error('error getting workout data', err);
  //   throw err;
  // });
  return workouts;
};
