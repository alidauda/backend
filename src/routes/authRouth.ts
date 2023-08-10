import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserInput } from 'src/types/UserInterface';
import bcrypt from 'bcrypt';
import { db } from 'src/utils/db';
import { ISession } from 'src/types/express';
const router = express.Router();

router.get('/google/login', (req, res) => {
  if (req.user) {
    res.redirect('/profile');
  }
  res.render('login');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send('worked');
});
router.post('/signupPassowrd', async (req: Request<{}, {}, UserInput>, res) => {
  const { email, password, name } = req.body;
  const hasPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        email: email,
        password: hasPassword,
        name,
      },
    });
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: 'server error' });
      }
      res.status(200).json({ message: user });
    });
  } catch {
    res.status(500);
  }
});
router.post(
  '/login/password',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/loginFailed',
    failureMessage: true,
  })
);

router.get('/loginFailed', (req, res) => {
  res.status(401).json({ message: 'login failed' });
});
router.get;

export default router;

export function isUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (!req.user) {
    res.status(401).json({ message: 'unauthorized' });
  }
  return next();
}

export function isVendorAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (!req.user && !(req.session as ISession).vendor_id) {
    res.status(401).json({ message: 'unauthorized' });
  }
  return next();
}
