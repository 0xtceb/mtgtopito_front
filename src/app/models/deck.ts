import { Card } from './card';

export class Deck {
  id: number;
  name: string;
  commander: Card;
  cards?: DeckCard[];
}

export class DeckCard {
  card: Card;
  quantity: number;

  constructor(card: Card, quantity: number = 1){
    this.card = card;
    this.quantity = quantity
  }
}
