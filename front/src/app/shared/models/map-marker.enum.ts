import {environment} from '@env/environment';

const ICON_PATH = environment.mapIcon;

// export enum PetIcon {
//   Dog = 'assets/map_icons/dog.png',
//   Cat = 'assets/map_icons/cat.png',
//   Other = 'assets/map_icons/animals.png'
// }

export const PetIcon = {
  Dog: `${ICON_PATH}/dog.png`,
  Cat: `${ICON_PATH}/cat.png`,
  Other: `${ICON_PATH}/animals.png`
};
