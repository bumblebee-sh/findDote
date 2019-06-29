import { Injectable } from '@angular/core';
import {environment} from '@env/environment';

declare const google;

@Injectable({
  providedIn: 'root'
})

export class MapApiService {

  constructor() { }

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

  getCurrentRegions(cb: Function) {
    /*
    await this.initScript();
    navigator.geolocation.getCurrentPosition(function(position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': pos}, function(results, status) {
        console.warn(results, status);
      });
    }, function(err) {
      console.error('getCurrentRegions', err);
    });
    */
    return [];
  }
}
