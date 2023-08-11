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
exports.client = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./handlers/user");
const auth_1 = require("./modules/auth");
const unProctectedProduct_1 = __importDefault(require("./routes/Product/unProctectedProduct"));
const protectedVendor_1 = __importDefault(require("./routes/Vendor/protectedVendor"));
const unprotectedVendor_1 = __importDefault(require("./routes/Vendor/unprotectedVendor"));
const catgories_1 = require("./handlers/catgories");
const catgories_2 = __importDefault(require("./routes/catgories"));
const cart_1 = __importDefault(require("./routes/cart"));
const protectedProduct_1 = __importDefault(require("./routes/Product/protectedProduct"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
exports.client = new ioredis_1.default(process.env.REDIS_URL);
let redisStore = new connect_redis_1.default({
    client: exports.client,
    prefix: 'myapp:',
});
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    store: redisStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
}));
app.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('welcome human');
    });
});
app.post('/signUp', user_1.createNewUser);
app.post('/login', user_1.signIn);
app.get('/logout', user_1.logout);
app.get('/forgotPassword', user_1.forgotPassword);
app.post('/resetPassword', user_1.resetPassword);
app.get('/api/me', auth_1.proctect, user_1.getMe);
app.use('/api', auth_1.proctect, protectedProduct_1.default);
app.use('/api', unProctectedProduct_1.default);
app.use('/api', auth_1.proctect, protectedVendor_1.default);
app.use('/api', unprotectedVendor_1.default);
app.use('/api', auth_1.proctect, catgories_2.default);
app.get('/api/vendor_category', catgories_1.getVendorCategory);
app.get('/api/vendor_category_by_id', catgories_1.getCategoryById);
app.use('/api', auth_1.proctect, cart_1.default);
app.listen(4000, '192.168.1.142', () => {
    console.log('server started on localhost:4000');
});
//# sourceMappingURL=index.js.map