import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/shared/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  sess() {
    this.authService.session().subscribe(res => {
      console.warn('sess: ', res);
    });
  }
}
