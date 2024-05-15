interface ICardsSet {
  cards: ICardsOriginal[];
}

interface IBaseCards {
  code: string;
  name: string;
  colorIdentity: string;
  text: string;
  imageUrl: string;
  types: string[];
}

interface ICardsOriginal extends IBaseCards {
  manaCost: string;
}

interface ICardsFommated extends IBaseCards {
  manaCost: {
    qtd: string;
    mana: string[];
  };
}

export { ICardsSet, ICardsOriginal, ICardsFommated };
