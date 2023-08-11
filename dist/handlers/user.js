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
exports.logout = exports.getUserById = exports.resetPassword = exports.forgotPassword = exports.updateMe = exports.getMe = exports.signIn = exports.createNewUser = void 0;
const db_1 = require("../utils/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../modules/auth");
const uuid_1 = require("uuid");
const index_1 = require("../index");
const sendMail_1 = require("../utils/sendMail");
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password.length < 6) {
            res
                .status(400)
                .json({ message: 'password must be greater than 6 characters' });
            return;
        }
        const user = yield db_1.db.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: yield bcrypt_1.default.hash(req.body.password, 10),
            },
        });
        const token = (0, auth_1.creeateJwt)(user);
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: 'user already exist please try again ' });
    }
});
exports.createNewUser = createNewUser;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.db.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password.toString());
        if (!isValid) {
            res.status(401).json({ message: 'email or password is incorrect' });
            return;
        }
        const token = (0, auth_1.creeateJwt)(user);
        res.json({ token });
    }
    catch (e) {
        res.json({ message: 'user not found' });
    }
});
exports.signIn = signIn;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.db.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        res.json({ user });
    }
    catch (e) {
        res.status(404).json({ message: 'unauthorized' });
    }
});
exports.getMe = getMe;
const updateMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.user.update({
        where: {
            id: req.user.id,
        },
        data: req.body,
    });
    res.json({ user });
});
exports.updateMe = updateMe;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.db.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        const token = (0, uuid_1.v4)();
        const data = yield (0, sendMail_1.sendMail)('alidauda14@gmail.com', token);
        yield index_1.client.set(token, user.id, 'EX', 1000 * 60 * 60 * 24 * 3);
        res.json({ token, data });
    }
    catch (e) {
        console.log(e);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield index_1.client.get(req.body.token);
    if (!userId) {
        res.status(404).json({ message: 'token not found' });
        return;
    }
    const user = yield db_1.db.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
    }
    const newPPassword = yield db_1.db.user.update({
        where: {
            id: userId,
        },
        data: {
            password: yield bcrypt_1.default.hash(req.body.password, 10),
        },
    });
    res.json({ message: newPPassword });
});
exports.resetPassword = resetPassword;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.db.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        res.json({ user });
    }
    catch (e) {
        res.status(404).json({ message: 'user not found' });
    }
});
exports.getUserById = getUserById;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.user = null;
    res.json({ message: 'logout success' });
});
exports.logout = logout;
//# sourceMappingURL=user.js.map