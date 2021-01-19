import getWorkoutList from './getWorkoutList';
import logger from './utils/logger';

export default async (user_id, session_id) => {
  logger.info('getting workouts');
  const workouts = await getWorkoutList(user_id, session_id).catch(err => {
    logger.error('error getting workouts', JSON.stringify(err));
    throw err;
  });
  logger.info('fetched workouts');

  return workouts;
};
