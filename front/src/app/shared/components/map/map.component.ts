import {Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {environment} from '@env/environment';

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
  @ViewChild('map') mapElem: ElementRef;
  @Input() mapLocation: any;
  @Output() mapLocationChange = new EventEmitter();

  map: any;
  currentPosition: ICoordinates;
  area: any;

  constructor() { }

  async ngOnInit() {
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
      this.drawCircle(this.currentPosition);
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

  private getGeolocation(): Promise<ICoordinates>{
    let latLng: ICoordinates;
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(latLng);
        }, function() {
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
      this.area = new google.maps.Circle({
        strokeColor: '#7b00ff',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        fillColor: '#dea2ff',
        clickable: true,
        editable: true,
        zIndex: 1,
        map: this.map,
        center,
        radius: 500
      });
      this.area.addListener('bounds_changed', () => {
        if (this.mapLocation) {
          this.getMapLocation(this.currentPosition, this.area.getRadius());
        }
      });
    } else {
      this.area.setCenter(center);
    }
  }

  private getMapLocation(center, radius) {
    this.mapLocation = {center, radius};
    this.mapLocationChange.emit(this.mapLocation);
  }
}
