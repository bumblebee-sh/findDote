import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';

import {IPetAge, IPetTypes, PetAge, PetTypes, IEventType, LocationModel} from '@app/shared/models';
import {AnimalService} from '../../services';
import {ActionStatusService} from '@app/shared/services';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})

export class AnimalsComponent implements OnInit {
  mapLocation: LocationModel = {} as LocationModel;

  petType: IPetTypes[] = [
    { title: 'Other', value: PetTypes.Other },
    { title: 'Dog', value: PetTypes.Dog },
    { title: 'Cat', value: PetTypes.Cat },
  ];

  petAge: IPetAge[] = [
    {title: '~ <1 year', value: PetAge.Kitten},
    {title: '~ 1-2 year', value: PetAge.Teenager},
    {title: '~ > 2 year', value: PetAge.Adult},
  ];

  events: IEventType[] = [
    {title: 'All', value: 0},
    {title: 'Found', value: 1},
    {title: 'Lost', value: 2}
  ];

  animalForm: any = this.fb.group({
    description: [
      '',
      [Validators.required, Validators.minLength(5)]
    ],
    name: [
      ''
    ],
    type: [
      this.petType[0].value
    ],
    event: [
      this.events[0].value
    ],
    age: [
      ''
    ],
    file: [
      ''
    ],
  });

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private actionStatusService: ActionStatusService,
  ) { }

  ngOnInit() {
  }

  send(f: NgForm) {
    const data: FormData = new FormData();
    const file = this.animalForm.value.file;
    delete this.animalForm.value.file;

    data.append('animal', JSON.stringify({
      ...this.animalForm.value,
      // location: {
      //   type : 'Point',
      //   coordinates: [this.mapLocation.lng, this.mapLocation.lat]
      // },
      area: {
        location: {
          type : 'Point',
          coordinates: [this.mapLocation.lng, this.mapLocation.lat]
        },
        radius: this.mapLocation.radius
      }
    }));

    if (file) {
      data.append('photo', file);
    }

    this.animalService.addPet(data).subscribe((res: any) => {
      this.actionStatusService.succes(`${res.message} added`);
      f.reset();
    }, err => console.error('addPet: ', err));
  }

  get description() {
    return this.animalForm.controls['description'];
  }
}
