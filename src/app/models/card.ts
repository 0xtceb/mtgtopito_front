export class Card {
  url?: string;
  multiverseid: number;
  name: string;
  imageUrl: string;
  supertypes: string[];
  types: string[];
  type: string;
  text: string;
  legalities: Legality[];
  quantity: number = 1;
}

class Legality {
  format: string;
  legality: string;
}
