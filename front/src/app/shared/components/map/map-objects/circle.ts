import {EventColors, PetEvent, LocationModel} from '@app/shared/models';

declare const google: any;

interface CircleOptions {
  map: any;
  strokeColor?: EventColors;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillOpacity?: number;
  fillColor?: EventColors;
  clickable?: boolean;
  editable?: boolean;
  zIndex?: number;
  center?: LocationModel;
  radius?: number;
}

class MapCircle implements CircleOptions {
  strokeColor = EventColors.Purple;
  strokeOpacity = 0.8;
  strokeWeight = 2;
  fillOpacity = 0.15;
  fillColor = EventColors.Purple;
  clickable = true;
  editable = true;
  zIndex = 1;
  map: any;
  center: LocationModel;
  radius = 500;

  constructor(options: CircleOptions) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  }
}

type CircleType = 'search' | 'add' | PetEvent;

function circleFabric(type: CircleType, options: CircleOptions) {
  switch (type) {
    case 'add':
      return new MapCircle({
        ...options,
        strokeColor: EventColors.Purple,
        fillColor: EventColors.Purple
      });
    case 'search':
      return new MapCircle({
        ...options,
        strokeColor: EventColors.Orange,
        fillColor: EventColors.Orange
      });
    case PetEvent.Lost:
      return new MapCircle({
        ...options,
        strokeColor: EventColors.Red,
        fillColor: EventColors.Red
      });
    case PetEvent.Found:
      return new MapCircle({
        ...options,
        strokeColor: EventColors.Green,
        fillColor: EventColors.Green
      });
    default: return new MapCircle({
      ...options,
      strokeColor: EventColors.Purple,
      fillColor: EventColors.Purple
    });
  }
}


export function drawCircle(type: CircleType, options: CircleOptions) {
  if (!MapCircle.prototype.map) {
    MapCircle.prototype.map = options.map;
  }
  const circleOptions = circleFabric(type, options);
  return new google.maps.Circle(circleOptions);
}
