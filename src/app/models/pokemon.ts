class Sprite {
  front_default!: string;
}

class NameObj {
  name!: string;
}

class Stat {
  base_stat!: number;
  stat!: NameObj;
}

class Type {
  type!: NameObj;
}

export class Pokemon {
  name!: string;
  height!: number;
  weight!: number;
  sprites!: Sprite;
  stats!: Stat[];
  types!: Type[];
}
