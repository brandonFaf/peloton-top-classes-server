import { Workout } from './types/workout';
import instructors from './utils/instructors';
import fetch from 'node-fetch';

export default async (user_id, session_id) => {
  console.log('session_id:', session_id);

  const res = await fetch(
    `https://api.onepeloton.com/api/user/${user_id}/workouts?joins=peloton.ride&limit=600`,
    {
      headers: {
        cookie: `peloton_session_id=${session_id}`
      }
    }
  );
  if (res.status != 200) {
    const data = await res.json();
    throw { status: res.status, data };
  }
  const data = await res.json();
  return data.data
    .filter(w => w.fitness_discipline == 'cycling')
    .map(
      (w): Workout => {
        const date = new Date(0);
        date.setSeconds(w.created_at);
        return {
          id: w.id,
          date,
          totalOutput: (w.total_work / 1000).toFixed(2),
          title: w.peloton.ride?.title,
          rideId: w.peloton.ride?.id,
          difficulty: w.peloton.ride?.difficulty_estimate,
          instructor:
            instructors.find(i => i.id === w.peloton.ride?.instructor_id)
              ?.name ?? '',
          difficultyLevel: w.peloton.ride?.difficulty_level,
          duration: w.peloton.ride?.duration
        };
      }
    )
    .reduce(
      (acc, w: Workout) => {
        acc.workouts[w.duration / 60].push(w);
        acc.count++;
        return acc;
      },
      {
        workouts: {
          5: [],
          10: [],
          15: [],
          20: [],
          30: [],
          45: [],
          60: [],
          75: [],
          90: []
        },
        count: 0
      }
    );
};
