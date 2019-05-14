import { User } from './user';

export class Ligue {
  uid: number;
  name: string;
  startdate: string;
  enddate: string;
  users?: User[];
}
