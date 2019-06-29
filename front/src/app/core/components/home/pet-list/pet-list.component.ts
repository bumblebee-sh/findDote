import { Component, OnInit, Input } from '@angular/core';
import {IPet } from '@app/shared/models';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})

export class PetListComponent implements OnInit {
  @Input('animals') animalsList: IPet[];
  constructor() { }

  ngOnInit() {
  }

}
