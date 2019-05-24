import { Card } from './card';

export class Deck {
  id: number;
  name: string;
  commander: Card;
  cards?: Card[];
}
