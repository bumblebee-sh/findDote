export * from './user.model';
export * from './pet-age';
export * from './pet-events';
export * from './pet-type';

export enum PetTypes {
  Other,
  Dog,
  Cat
}

export interface IPetTypes {
  title: string;
  type: PetTypes;
}

export enum PetAge {
  Unknown,
  Kitten,
  Teenager,
  Adult
}

export interface IPetAge {
  title: string;
  value: PetAge;
}

export interface IEventType {
  title: string;
  value: 1 | 0 | 2;
}

export interface IPet {
  _id?: number;
  createdAt: string;
  name: string;
  event: string;
  description: string;
  area: object;
  status: number;
  age: number;
  image: string;
}
