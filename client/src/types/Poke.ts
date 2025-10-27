export type PokePayload = {
  id: number;
  name: string;
  sprites: PokeSprites;
};

type PokeSprites = {
  front_default: string;
};
