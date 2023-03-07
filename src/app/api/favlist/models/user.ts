import { Favorite } from "./favorite";

export class User {
  id!: number;
  email!: string;
  name!: string;
  favorites?: Favorite[];
}
