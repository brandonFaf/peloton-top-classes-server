"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (workouts) => {
    return await Promise.all(workouts.map(async (w) => {
        const res = await fetch(`https://api.onepeloton.com/api/workout/${w.id}/performance_graph`);
        const data = await res.json();
        console.log(data);
        const { duration, summaries, metrics } = data;
        const mets = metrics.reduce((acc, m) => {
            switch (m.display_name) {
                case 'Output':
                    acc.maxOutput = m.max_value;
                    acc.averageOutput = m.average_value;
                    break;
                case 'Cadence':
                    acc.maxCadence = m.max_value;
                    acc.averageCadence = m.average_value;
                    break;
                case 'Resistance':
                    acc.maxResistance = m.max_value;
                    acc.averageResistance = m.average_value;
                    break;
                default:
                    break;
            }
            return acc;
        }, {});
        const finalMetrics = summaries.reduce((acc, s) => {
            switch (s.display_name) {
                case 'Total Output':
                    acc.totalOutput = s.value;
                    break;
                case 'Distance':
                    acc.distance = s.value;
                    break;
                case 'Calories':
                    acc.calories = s.value;
                    break;
                default:
                    break;
            }
            return acc;
        }, mets);
        return { ...w, duration: duration / 60, ...mets };
    }));
};