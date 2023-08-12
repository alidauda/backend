import RedisStore from 'connect-redis';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'dotenv/config';

import bodyParser from 'body-parser';
import {
  createNewUser,
  forgotPassword,
  getMe,
  logout,
  resetPassword,
  signIn,
  updateMe,
} from './handlers/user';
import { proctect } from './modules/auth';

import unproctectedProduct from './routes/Product/unProctectedProduct';
import proctectedVendor from './routes/Vendor/protectedVendor';

import { getCategoryById, getVendorCategory } from './handlers/catgories';
import protectedCatgories from './routes/catgories';
import proctectedCart from './routes/cart';
import proctectedProduct from './routes/Product/protectedProduct';

import unproctectedVendor from './routes/Vendor/unprotectedVendor';

const app = express();
app.use(bodyParser.json());
export const client = new Redis(process.env.REDIS_URL!);
let redisStore = new RedisStore({
  client: client,
  prefix: 'myapp:',
});
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    store: redisStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

app.get('/', async function (req, res) {
  res.send('welcome human');
});
//user routes
app.post('/signUp', createNewUser);
app.post('/login', signIn);
app.get('/logout', logout);
app.get('/forgotPassword', forgotPassword);
app.post('/resetPassword', resetPassword);
app.use('/api', unproctectedProduct);
app.use('/api', unproctectedVendor);
app.get('/api/vendor_category', getVendorCategory);
app.get('/api/vendor_category_by_id', getCategoryById);
/**product routes */
app.use('/api', proctect, proctectedProduct);
app.use('/api/user_info', proctect, updateMe);
app.get('/api/me', proctect, getMe);
app.use('/api', proctect, proctectedVendor);
app.use('/api', proctect, protectedCatgories);
app.use('/api', proctect, proctectedCart);
/**vendor routes */

/**categories route */

/** cart*/

app.listen(4000, () => {
  console.log('server started on localhost:4000');
});
