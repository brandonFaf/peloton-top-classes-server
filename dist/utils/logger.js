"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const chalk_1 = __importDefault(require("chalk"));
let logger;
(() => {
    logger = {
        log: (message, ...rest) => {
            console.log(chalk_1.default.cyanBright(message, ...rest));
        },
        info: (message, ...rest) => {
            console.log(chalk_1.default.greenBright(message, ...rest));
        },
        warn: (message, ...rest) => {
            console.log(chalk_1.default.yellowBright(message, ...rest));
        },
        error: (message, ...rest) => {
            console.log(chalk_1.default.redBright(message, ...rest));
        }
    };
})();
exports.default = logger;
