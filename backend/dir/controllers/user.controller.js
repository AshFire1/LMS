"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = yield user_model_1.User.findOne({ email });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User Already Exist with this email."
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield user_model_1.User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            success: true,
            message: "Account Created successfully."
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed To register"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Email or password'
            });
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Email or password'
            });
        }
        (0, generateToken_1.generateToken)(res, user, `Welcome back ${user.name}`);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Failed To register"
        });
    }
});
exports.login = login;
