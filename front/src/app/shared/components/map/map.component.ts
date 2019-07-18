import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import {environment} from '@env/environment';

import {IPet, LocationModel} from '@app/shared/models';

import {drawMarker, drawCircle} from './map-objects';

declare const google: any;

interface ICoordinates {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  @ViewChild('map', {static : false}) mapElem: ElementRef;
  @Input() searchMode: any;
  @Input() mapLocation: LocationModel;
  @Output() mapLocationChange = new EventEmitter();
  @Input() set animals(value) {
    if (!value) {
      return;
    }
    this.setSearchResult(value);
  }
  @Input() set options(value) {
    if (!value) {
      return;
    }
    this.setOptions(value);
  }

  map: any;
  currentPosition: ICoordinates;
  area: any;
  marker: any;
  isSearch = false;

  private searchResultPoints: [{circle: any, marker: any}] = [] as any;

  constructor() { }

  async ngOnInit() {
    this.isSearch = this.searchMode !== undefined;

    try {
      await this.initScript();
    } catch (e) {
      return console.warn('MAP ERROR', e);
    }

    await this.initMap(this.mapElem.nativeElement);

    this.map.addListener('click', (e)  => {
      this.currentPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      this.setCircle(this.currentPosition);
      this.getMapLocation(this.currentPosition, this.area!.getRadius() || 500);
    });
  }

  private initScript() {
    return new Promise((resolve, reject) => {
      if (!window['google']) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.body.appendChild(script);
      } else {
        resolve('Sorry =D');
      }
    });
  }

  private async initMap(map: HTMLElement) {
    this.currentPosition = await this.getGeolocation();
    return new Promise((resolve, reject) => {
      this.map = new google.maps.Map(map, {
        center: this.currentPosition,
        zoom: 14
      });
      resolve();
    });
  }

  private getGeolocation(): Promise<ICoordinates> {
    let latLng: ICoordinates;
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(latLng);
        }, () => {
          latLng = {lat: -34.397, lng: 150.644};
          resolve(latLng);
        });
      } else {
        latLng = {lat: -34.397, lng: 150.644};
        reject(latLng);
      }
    });
  }

  private async setCircle(center: ICoordinates) {
    if (!this.area) {
      this.area = drawCircle(this.isSearch ? 'search' : 'add', {center, map: this.map});
      if (!this.isSearch) {
        this.marker = drawMarker(1, { position: center, map: this.map });
      }
      this.area.addListener('center_changed', () => {
        this.currentPosition = {
          lat: this.area.center.lat(),
          lng: this.area.center.lng(),
        };
        this.getMapLocation(this.currentPosition, this.area.getRadius());
      });
      this.area.addListener('bounds_changed', () => {
        if (this.mapLocation) {
          this.getMapLocation(this.currentPosition, this.area.getRadius());
        }
      });
    } else {
      this.area.setCenter(center);
      if (this.marker) {
        this.marker.setPosition(center);
      }
    }
  }

  private getMapLocation(coordinatesObj: ICoordinates, radius: number) {
    this.mapLocation = {
      lng: coordinatesObj.lng,
      lat: coordinatesObj.lat,
      radius
    };
    this.mapLocationChange.emit(this.mapLocation);
  }

  private setSearchResult(animalsList: IPet[]) {
    if (this.searchResultPoints.length) {
      this.searchResultPoints.forEach( item => {
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            item[key].setMap(null);
          }
        }
      });
    }
    animalsList.forEach( animal => {
      const center = {
        lng: animal.area.location.coordinates[0],
        lat: animal.area.location.coordinates[1]
      };

      const circleOptions = {
        center,
        radius: animal.area.radius,
        editable: false,
        zIndex: 0,
        map: this.map
      };

      const markerOptions = {
        position: center,
        map: this.map
      };

      this.searchResultPoints.push({
        circle: drawCircle(+animal.event, circleOptions),
        marker: drawMarker(+animal.type, markerOptions),
      });
    });
  }

  private setOptions(options) {
    if (this.marker) {
      this.marker.setIcon();
    }
    if (this.area) {

    }
  }
}
