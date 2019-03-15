import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SearchService} from '@app/shared/services';
import {IPetTypes, PetTypes, IPetAge, PetAge, IEventType} from '@app/shared/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  regions: any;
  petType: IPetTypes[] = [
    { title: 'Dog', type: PetTypes.Dog },
    { title: 'Cat', type: PetTypes.Cat },
    { title: 'Other', type: PetTypes.Other },
  ];

  petAge: IPetAge[] = [
    {title: '~ <1 year', value: PetAge.Kitten},
    {title: '~ 1-2 year', value: PetAge.Teenager},
    {title: '~ > 2 year', value: PetAge.Adult},
  ];

  typeSearch: IEventType[] = [
    {title: 'Found', value: 1},
    {title: 'Lost', value: 0},
    {title: 'All', value: null},
  ];

  filterForm = this.fb.group({

  });

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.getRegions().subscribe(res => {
      this.regions = res;
    });
  }

  search() {
    console.log('search', this.filterForm.value);
  }
}
