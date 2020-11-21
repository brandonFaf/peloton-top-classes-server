"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getData_1 = __importDefault(require("./getData"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_fetch_2 = __importDefault(require("fetch-cookie/node-fetch"));
const authenticate_1 = __importDefault(require("./authenticate"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./utils/logger"));
//@ts-ignore
global.fetch = node_fetch_2.default(node_fetch_1.default);
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('working');
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('req.body:', req);
    console.log('password:', password);
    console.log('username:', username);
    if (!username || !password) {
        res.status(400);
        res.json({ error: 'username or password missing' });
        return;
    }
    const { user_id } = await authenticate_1.default(username, password);
    console.log('user_id:', user_id);
    logger_1.default.log('logged in');
    res.json({ user_id });
});
app.get('/api/data/:user_id', async (req, res) => {
    const data = await getData_1.default(req.params.user_id).catch(err => {
        res.status(500);
        res.json({ error: err });
        return;
    });
    res.json(data);
});
app.get('/api/data/:user_id/ride/:ride_id', async (req, res) => {
    const data = await getData_1.default(req.params.user_id).catch(err => {
        res.status(500);
        res.json({ error: err });
        return;
    });
    if (data) {
        const rides = data.filter(s => s.rideId == req.params.ride_id);
        res.json(rides);
        return;
    }
    else {
        res.status(400);
        res.json({ error: 'no rides found' });
    }
});
app.listen(8080, () => {
    console.log('listening on 8080');
});
