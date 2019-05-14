import { Card } from './card';

export class Deck {
  uid: number;
  name: string;
  commander: Card;
  cards?: Card[];
}
