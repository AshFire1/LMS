"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, user, message) => {
    if (typeof process.env.SECRET_KEY == "undefined") {
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "10d",
    });
    return res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    })
        .json({
        success: true,
        message,
        user,
    });
};
exports.generateToken = generateToken;
