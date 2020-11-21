"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_fetch_2 = __importDefault(require("fetch-cookie/node-fetch"));
global.fetch = node_fetch_2.default(node_fetch_1.default);
const getData_1 = __importDefault(require("./getData"));
(async () => {
    await getData_1.default();
})();
