import {Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {environment} from '@env/environment';

declare const google: any;

enum Colors {
  Purple = '#7b00ff',
  Orange = '#ff7200',
}

interface ICoordinates {
  lat: number;
  lng: number;
}

interface CircleOptions {
  strokeColor?: Colors;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillOpacity?: number;
  fillColor?: Colors;
  clickable?: boolean;
  editable?: boolean;
  zIndex?: number;
  map?: any;
  center?: ICoordinates;
  radius?: number;
}

class SearchCircle implements CircleOptions {
  strokeColor = Colors.Purple;
  strokeOpacity = 0.8;
  strokeWeight = 2;
  fillOpacity = 0.15;
  fillColor = Colors.Purple;
  clickable = true;
  editable = true;
  zIndex = 1;
  map: any;
  center: ICoordinates;
  radius = 500;

  constructor(options: CircleOptions) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  }
}

type CircleType = 'search' | 'add';

function circleFabric(type: CircleType, options: CircleOptions) {
  switch (type) {
    case 'add':
      return new SearchCircle({
        ...options,
        strokeColor: Colors.Purple,
        fillColor: Colors.Purple
      });
    case 'search':
      return new SearchCircle({
        ...options,
        strokeColor: Colors.Orange,
        fillColor: Colors.Orange
      });
    default: return new SearchCircle({
      ...options,
      strokeColor: Colors.Purple,
      fillColor: Colors.Purple
    });
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  @ViewChild('map', {static : false}) mapElem: ElementRef;
  @Input() searchMode: any;
  @Input() mapLocation: any;
  @Output() mapLocationChange = new EventEmitter();

  map: any;
  currentPosition: ICoordinates;
  area: any;
  isSearch = false;

  constructor() { }

  async ngOnInit() {
    this.isSearch = this.searchMode !== undefined;

    try {
      await this.initScript();
    } catch (e) {
      return console.warn('MAP ERROR', e);
    }

    await this.initMap(this.mapElem.nativeElement);
    SearchCircle.prototype.map = this.map;
    this.map.addListener('click', (e)  => {
      this.currentPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      this.drawCircle(this.currentPosition);
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

  private async drawCircle(center) {
    if (!this.area) {
      this.area = new google.maps.Circle( circleFabric( this.isSearch ? 'search' : 'add', {center}));
      this.area.addListener('bounds_changed', () => {
        if (this.mapLocation) {
          this.getMapLocation(this.currentPosition, this.area.getRadius());
        }
      });
    } else {
      this.area.setCenter(center);
    }
  }

  private getMapLocation(coordinatesObj, radius) {
    this.mapLocation = {
      coordinates: [coordinatesObj.lng, coordinatesObj.lat], radius};
    this.mapLocationChange.emit(this.mapLocation);
  }
}
