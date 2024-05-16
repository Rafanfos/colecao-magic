interface ICardsSet {
  cards: ICardsOriginal[];
}

interface IBaseCards {
  id: string;
  name: string;
  text: string;
  imageUrl: string;
  types: string[];
  colorIdentity: string[];
  isSelected: boolean;
}

interface ICardsOriginal extends IBaseCards {
  manaCost: string;
}

interface ICardsFormated extends IBaseCards {
  manaCost: {
    qtd: string;
    mana: string[];
  };

  page: number;
}

export { ICardsSet, ICardsOriginal, ICardsFormated };
