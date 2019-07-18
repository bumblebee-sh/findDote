import {PetIcon, PetTypes, LocationModel} from '@app/shared/models';

declare const google: any;

interface MarkerOptions {
  map: any;
  position: LocationModel;
  title?: string;
  icon?: any;
  zIndex?: number;
}

class MapMarker implements MarkerOptions {
  map: any;
  position: LocationModel;

  constructor(options: MarkerOptions) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  }
}

function markerFabric(type: PetTypes, options: MarkerOptions) {

  options.zIndex = 0;

  switch (type) {
    case PetTypes.Cat:
      return new MapMarker({
        ...options,
        icon: setIconParams(PetIcon.Cat, 30)
      });
    case PetTypes.Dog:
      return new MapMarker({
        ...options,
        icon: setIconParams(PetIcon.Dog)
      });
    default:
      return new MapMarker({
        ...options,
        icon: setIconParams(PetIcon.Other)
      });
  }
}

function setIconParams(url: string, size: number = 40) {
  return {
    url,
    size: new google.maps.Size(size, size),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(size / 2, size / 2),
    scaledSize: new google.maps.Size(size, size)
  };
}

export function drawMarker(type: number, options: MarkerOptions) {
  if (!MapMarker.prototype.map) {
    MapMarker.prototype.map = options.map;
  }
  const markerOptions = markerFabric(type, options) ;
  return new google.maps.Marker(markerOptions);
}
