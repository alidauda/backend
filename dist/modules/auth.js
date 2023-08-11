"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proctect = exports.creeateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const creeateJwt = (user) => {
    var _a;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, (_a = process.env.JWT_SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString(), { expiresIn: 60 * 60 });
    return token;
};
exports.creeateJwt = creeateJwt;
const proctect = (req, res, next) => {
    var _a;
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'No token provided' });
    const [, token] = authHeader.split(' ');
    if (!token)
        return res.status(401).json({ message: 'not a valid token' });
    try {
        const user = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET_KEY) === null || _a === void 0 ? void 0 : _a.toString());
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).json({ message: 'not a valid user' });
        return;
    }
};
exports.proctect = proctect;
//# sourceMappingURL=auth.js.map