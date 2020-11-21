export interface Workout {
  id: string;
  date: Date;
  totalOutput: string | number;
  title: string;
  difficulty: number;
  instructor: string;
  difficultyLevel: number;
  rideId: string;
  duration: number;
}
