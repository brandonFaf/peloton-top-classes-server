import { Workout } from './workout';

export interface Stats extends Workout {
  maxOutput?: number;
  averageOutput?: number;
  maxCadence?: number;
  averageCadence?: number;
  maxResistance?: number;
  averageResistance?: number;
  calories?: number;
  distance?: number;
  duration: number;
}

export interface Metric {
  maxOutput?: number;
  averageOutput?: number;
  maxCadence?: number;
  averageCadence?: number;
  maxResistance?: number;
  averageResistance?: number;
  calories?: number;
  distance?: number;
  totalOutput?: number;
}
