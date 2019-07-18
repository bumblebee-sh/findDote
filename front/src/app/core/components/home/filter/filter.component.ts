import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {Router, UrlSerializer} from '@angular/router';

import {SearchService} from '@app/shared/services';
import {IPetTypes, PetTypes, IPetAge, PetAge, IEventType, LocationModel, IPet} from '@app/shared/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  @Output() searchResult: EventEmitter<any> = new EventEmitter<any>();
  mapLocation: LocationModel = {} as LocationModel;
  showMap = false;
  animals: IPet[];

  petType: IPetTypes[] = [
    { title: 'Dog', value: PetTypes.Dog },
    { title: 'Cat', value: PetTypes.Cat },
    { title: 'Other', value: PetTypes.Other },
  ];

  petAge: IPetAge[] = [
    {title: 'All', value: PetAge.Unknown},
    {title: '~ <1 year', value: PetAge.Kitten},
    {title: '~ 1-2 year', value: PetAge.Teenager},
    {title: '~ > 2 year', value: PetAge.Adult},
  ];

  typeSearch: IEventType[] = [
    {title: 'Found', value: 1},
    {title: 'Lost', value: 2},
    {title: 'All', value: 0},
  ];

  filterForm = this.fb.group({
    pet: [''],
    age: [''],
    searchType: ['']
  });

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private router: Router,
    private location: Location,
    private urlSerializer: UrlSerializer,
  ) { }

  ngOnInit() {

  }

  search() {
    const searchParams = {
      ...this.filterForm.value,
      ...this.mapLocation
    };
    const urlTree = this.router.createUrlTree([], {queryParams: searchParams });
    const queryStr = this.urlSerializer.serialize(urlTree);
    this.location.replaceState(queryStr);
    this.searchService.search(searchParams).subscribe((res: IPet[]) => {
      this.animals = res;
      this.searchResult.emit(res);
    }, error => console.log(error));
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

  resetMap() {
    this.mapLocation = null;
  }
}
