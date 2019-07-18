export * from './user.model';
export * from './pet-age';
export * from './pet-events';
export * from './pet-type';
export * from './location.model';
export * from './pet-event.enum';
export * from './event-colors.enum';
export * from './map-marker.enum';

export enum PetTypes {
  Other,
  Dog,
  Cat
}

export interface IPetTypes {
  title: string;
  value: PetTypes;
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

interface IArea {
  location: any;
  radius: number;
}

export interface IPet {
  _id?: number;
  createdAt: string;
  name: string;
  event: string;
  description: string;
  area: IArea;
  age: string;
  type: string;
  eventText: string;
  typeText: string;
  ageText: string;
}
