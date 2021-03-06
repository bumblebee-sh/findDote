// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {IEnvironment} from './environment.interfece';

export const environment: IEnvironment = {
  production: false,
  googleMapKey: 'AIzaSyAvf1ArrgFGQxeDk2D10c7KM9c3RRm8ZsQ',
  apiUrl: 'http://localhost:3000',
  localStorage: 'find-app.token',
  jwtSecret: 'i_love_bread',
  mapIcon: '/assets/map_icons'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
