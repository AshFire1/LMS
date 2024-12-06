"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./database/dbConnect"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
dotenv_1.default.config({});
(0, dbConnect_1.default)();
let PORT = process.env.PORT || 3000;
app.use("/api/v1/user", user_route_1.default);
app.get("/home", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Hello im backend"
    });
});
app.listen(PORT, () => {
    console.log(`Server Listen At Port ${PORT}`);
});
