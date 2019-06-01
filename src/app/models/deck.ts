import { Card } from './card';

export class Deck {
  url?: string;
  id: number;
  name: string;
  commander: Card;
  cards?: Card[];
}
