import { Session } from 'express-session';

export interface ISession extends Session {
  vendor_id: string;
}
