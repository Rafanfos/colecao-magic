interface IBoostersSets {
  sets: IBoosters[];
}

interface IBoosters {
  code: string;
  name: string;
  block: string;
  releaseDate: string;
}

export { IBoostersSets, IBoosters };
