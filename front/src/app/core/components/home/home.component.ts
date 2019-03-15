import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ActionStatusService } from '@app/shared/services';
import { AnimalService } from '@app/pages/user/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  animals: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionStatusService: ActionStatusService,
    private animalService: AnimalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.animals = this.animalService.getAnimals();
    if (this.activatedRoute.snapshot.queryParams.token) {
      this.authService.confirmPassword(this.activatedRoute.snapshot.queryParams.token).subscribe(res => {
        this.actionStatusService.succes('Email is confirmed. Please Sing In to continue');
      },
      err => {
        this.actionStatusService.error('Token is expire. Please');
      });
    }
  }
}
