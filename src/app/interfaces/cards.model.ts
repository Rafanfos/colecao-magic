interface ICardsSet {
  cards: ICards[];
}

interface ICards {
  CODE: string;
  name: string;
  manaCost: string;
  colorIdentity: string;
  text: string;
  imageUrl: string;
}
