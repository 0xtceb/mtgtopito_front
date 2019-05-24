export class Card {
  multiverseid: number;
  name: string;
  imageUrl: string;
  supertypes: string[];
  types: string[];
  text: string;
  legalities: Legality[];
  quantity: number = 1;
}

class Legality {
  format: string;
  legality: string;
}
