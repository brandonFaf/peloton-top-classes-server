"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instructors_1 = __importDefault(require("./utils/instructors"));
exports.default = async (user_id) => {
    const res = await fetch(`https://api.onepeloton.com/api/user/${user_id}/workouts?joins=peloton.ride&limit=600`);
    const data = await res.json();
    return data.data
        .filter(w => w.fitness_discipline == 'cycling')
        .map((w) => {
        var _a, _b;
        const date = new Date(0);
        date.setSeconds(w.created_at);
        return {
            id: w.id,
            date,
            totalOutput: (w.total_work / 1000).toFixed(2),
            title: w.peloton.ride.title,
            rideId: w.peloton.ride.id,
            difficulty: w.peloton.ride.difficulty_estimate,
            instructor: (_b = (_a = instructors_1.default.find(i => i.id === w.peloton.ride.instructor_id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
            difficultyLevel: w.peloton.ride.difficulty_level,
            duration: w.peloton.ride.duration
        };
    })
        .reduce((acc, w) => {
        acc.workouts[w.duration / 60].push(w);
        acc.count++;
        return acc;
    }, { workouts: { 5: [], 10: [], 15: [], 20: [], 30: [], 45: [] }, count: 0 });
};
