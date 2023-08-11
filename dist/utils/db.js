"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new client_1.PrismaClient();
}
else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new client_1.PrismaClient();
    }
    prisma = global.cachedPrisma;
}
exports.db = prisma;
DATABASE_URL =
    'mysql://825pusfn1lh1qytjqrjk:pscale_pw_fUQIluWI6LHuqy5u0yDjcBakwEHj6dhthBRn2XuWGAj@aws.connect.psdb.cloud/sis-shop?sslaccept=strict';
JWT_SECRET_KEY = 'udhcndbdcdjcnkxcbjbcsj';
REDIS_URL =
    'redis://default:fbe3d7b6f07f47cc9e21218dafbc167d@novel-midge-46031.upstash.io:46031';
RESEND_API_KEY = 're_MpSzbXhY_Gapn1FZyyyzBjWp4oCPZ8koD';
//# sourceMappingURL=db.js.map