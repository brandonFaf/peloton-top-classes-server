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
        var _a, _b, _c, _d, _e, _f, _g;
        const date = new Date(0);
        date.setSeconds(w.created_at);
        return {
            id: w.id,
            date,
            totalOutput: (w.total_work / 1000).toFixed(2),
            title: (_a = w.peloton.ride) === null || _a === void 0 ? void 0 : _a.title,
            rideId: (_b = w.peloton.ride) === null || _b === void 0 ? void 0 : _b.id,
            difficulty: (_c = w.peloton.ride) === null || _c === void 0 ? void 0 : _c.difficulty_estimate,
            instructor: (_e = (_d = instructors_1.default.find(i => { var _a; return i.id === ((_a = w.peloton.ride) === null || _a === void 0 ? void 0 : _a.instructor_id); })) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : '',
            difficultyLevel: (_f = w.peloton.ride) === null || _f === void 0 ? void 0 : _f.difficulty_level,
            duration: (_g = w.peloton.ride) === null || _g === void 0 ? void 0 : _g.duration
        };
    })
        .reduce((acc, w) => {
        acc.workouts[w.duration / 60].push(w);
        acc.count++;
        return acc;
    }, {
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
    });
};
