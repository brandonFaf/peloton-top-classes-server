"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getWorkoutList_1 = __importDefault(require("./getWorkoutList"));
const logger_1 = __importDefault(require("./utils/logger"));
exports.default = async (user_id) => {
    // logger.info('logging in');
    // const { user_id, session_id } = await authenticate().catch(err => {
    //   logger.error('error authenticating', err);
    //   throw err;
    // });
    // logger.info('logged in');
    logger_1.default.info('getting workouts');
    const workouts = await getWorkoutList_1.default(user_id).catch(err => {
        logger_1.default.error('error getting workouts', err);
        throw err;
    });
    logger_1.default.info('fetched workouts');
    // logger.info('getting details');
    // const workoutData = await getDetails(workouts).catch(err => {
    //   logger.error('error getting workout data', err);
    //   throw err;
    // });
    return workouts;
};
