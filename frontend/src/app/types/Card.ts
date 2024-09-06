export interface Card {
  id: number;
  name: string;
  type: string;
  hp: number;
  attack: number;
  thumb: string;
  weaknesses: string[];
  resistances: string[];
  expansion: string;
  rarity: string;
}
